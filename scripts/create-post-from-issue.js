const fs = require("fs");
const path = require("path");

// Parses a GitHub Issue Form body and creates a post file in posts/.
// The issue body (env ISSUE_BODY) looks like:
//
//   ### Title
//
//   My title
//
//   ### Content
//
//   # Hello
//   ![image](https://github.com/user-attachments/assets/<uuid>)
//   [report.pdf](https://github.com/user-attachments/files/<id>/report.pdf)
//   ...
//
// The date is set automatically to today's date.
// Any file attached through the issue (image or document, hosted on GitHub's
// CDN) is downloaded into the repo and its link is rewritten to a local path,
// so the post is fully self-hosted:
//   - images    -> public/images/  ->  /s/images/<file>
//   - documents -> public/files/   ->  /s/files/<file>
//
// Exposes `file`, `slug` and `attachments` (space-separated) via GITHUB_OUTPUT.

// GitHub-hosted attachment URLs produced when uploading to an issue/textarea.
const ATTACHMENT_URL_REGEX =
  /https?:\/\/(?:github\.com\/user-attachments\/(?:assets|files)\/[^\s)"'<>\]]+|(?:private-)?user-images\.githubusercontent\.com\/[^\s)"'<>\]]+)/g;

const EXT_BY_CONTENT_TYPE = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
};

// Labels of the fields defined in .github/ISSUE_TEMPLATE (issue forms render
// each field as "### <label>"). Only these are treated as section boundaries,
// so "### ..." headings inside the post content don't truncate it.
const FORM_LABELS = new Set(["title", "content"]);

function parseIssueForm(body) {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const sections = {};
  let current = null;

  for (const line of lines) {
    const heading = line.match(/^###\s+(.+?)\s*$/);
    if (heading && FORM_LABELS.has(heading[1].toLowerCase())) {
      current = heading[1];
      sections[current] = [];
    } else if (current) {
      sections[current].push(line);
    }
  }

  const result = {};
  for (const [heading, valueLines] of Object.entries(sections)) {
    let value = valueLines.join("\n").trim();
    if (value === "_No response_") value = "";
    result[heading] = value;
  }
  return result;
}

function findField(sections, keyword) {
  const key = Object.keys(sections).find((k) =>
    k.toLowerCase().includes(keyword.toLowerCase())
  );
  return key ? sections[key] : "";
}

function todayDDMMYYYY() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

function getUniqueFileName(dir, baseFileName) {
  const ext = path.extname(baseFileName);
  const stem = baseFileName.slice(0, baseFileName.length - ext.length);
  let counter = 1;
  let fileName = baseFileName;
  while (fs.existsSync(path.join(dir, fileName))) {
    fileName = `${stem}${counter}${ext}`;
    counter++;
  }
  return fileName;
}

// Keeps a filename safe for the repo/URL: strips paths and unusual characters.
function sanitizeFileName(name) {
  const base = path.basename(name).replace(/[^A-Za-z0-9._-]/g, "-");
  return base.replace(/^-+/, "") || "file";
}

function escapeYamlString(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

// Given a download response and the original URL, decides the target directory
// and file name for the attachment.
function resolveTarget(url, res, slug, index, dirs) {
  const contentType = (res.headers.get("content-type") || "")
    .split(";")[0]
    .trim()
    .toLowerCase();
  const isImage = contentType.startsWith("image/");

  // Documents ("files/<id>/<name.ext>") carry their real name in the URL.
  const filesMatch = url.match(/\/user-attachments\/files\/[^/]+\/([^/?#]+)/);
  let name;
  if (filesMatch) {
    name = sanitizeFileName(decodeURIComponent(filesMatch[1]));
  } else {
    const ext = EXT_BY_CONTENT_TYPE[contentType] || (isImage ? ".png" : ".bin");
    name = `${slug}-${index + 1}${ext}`;
  }

  const targetImage = isImage && !filesMatch;
  return {
    dir: targetImage ? dirs.images : dirs.files,
    urlPrefix: targetImage ? "/s/images" : "/s/files",
    repoPrefix: targetImage ? "public/images" : "public/files",
    name,
  };
}

// Fetches a GitHub attachment. Issue attachment URLs (user-attachments/assets)
// are only served to an authenticated *user* session, so the default Actions
// GITHUB_TOKEN gets a 404 — a user Personal Access Token (secret) is required.
async function fetchAttachment(url, token) {
  const headers = { "User-Agent": "blog-post-bot" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, { headers });
}

// Downloads every GitHub-hosted attachment found in `content`, saves it into
// the repo and rewrites its URL to a local /s/... path. Returns the
// rewritten content and the list of repo-relative paths that were written.
async function downloadAttachments(content, slug, dirs, token) {
  const urls = [...new Set(content.match(ATTACHMENT_URL_REGEX) || [])];
  const downloaded = [];
  let rewritten = content;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const res = await fetchAttachment(url, token);
    if (!res.ok) {
      console.error(`Failed to download attachment ${url}: ${res.status}`);
      continue;
    }

    const target = resolveTarget(url, res, slug, i, dirs);
    const fileName = getUniqueFileName(target.dir, target.name);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(path.join(target.dir, fileName), buffer);

    rewritten = rewritten.split(url).join(`${target.urlPrefix}/${fileName}`);
    downloaded.push(`${target.repoPrefix}/${fileName}`);
    console.log(`Downloaded attachment: ${target.repoPrefix}/${fileName}`);
  }

  return { content: rewritten, downloaded };
}

async function main() {
  const body = process.env.ISSUE_BODY || "";
  const token = process.env.GITHUB_TOKEN || "";
  const sections = parseIssueForm(body);

  const title = findField(sections, "title").trim();
  const content = findField(sections, "content");

  if (!title) {
    console.error("Missing post title.");
    process.exit(1);
  }
  if (!content) {
    console.error("Missing post content.");
    process.exit(1);
  }

  const date = todayDDMMYYYY();
  const slug = date.split("-").reverse().join("");

  const rootDir = path.join(__dirname, "..");
  const postsDir = path.join(rootDir, "posts");
  const dirs = {
    images: path.join(rootDir, "public", "images"),
    files: path.join(rootDir, "public", "files"),
  };
  fs.mkdirSync(dirs.images, { recursive: true });
  fs.mkdirSync(dirs.files, { recursive: true });

  const { content: finalContent, downloaded } = await downloadAttachments(
    content,
    slug,
    dirs,
    token
  );

  const postContent = `---
date: "${escapeYamlString(date)}"
title: "${escapeYamlString(title)}"
---

${finalContent}
`;

  const baseFileName = `${slug}.md`;
  const fileName = getUniqueFileName(postsDir, baseFileName);
  fs.writeFileSync(path.join(postsDir, fileName), postContent);
  console.log(`Post created: posts/${fileName}`);

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `file=posts/${fileName}\nslug=${slug}\nattachments=${downloaded.join(" ")}\n`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
