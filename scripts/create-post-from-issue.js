const fs = require("fs");
const path = require("path");

// Parses a GitHub Issue Form body and creates a post file in posts/.
// The issue body (env ISSUE_BODY) looks like:
//
//   ### Title
//
//   My title
//
//   ### Date (optional)
//
//   _No response_
//
//   ### Content
//
//   # Hello
//   ...
//
// It writes the new post and exposes `file` and `slug` via GITHUB_OUTPUT.

function parseIssueForm(body) {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const sections = {};
  let current = null;

  for (const line of lines) {
    const heading = line.match(/^###\s+(.+?)\s*$/);
    if (heading) {
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

function getUniqueFileName(postsDir, baseFileName) {
  let counter = 1;
  let fileName = baseFileName;
  while (fs.existsSync(path.join(postsDir, fileName))) {
    const nameWithoutExt = baseFileName.replace(".md", "");
    fileName = `${nameWithoutExt}${counter}.md`;
    counter++;
  }
  return fileName;
}

function escapeYamlString(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function main() {
  const body = process.env.ISSUE_BODY || "";
  const sections = parseIssueForm(body);

  const title = findField(sections, "title").trim();
  let date = findField(sections, "date").trim();
  const content = findField(sections, "content");

  if (!title) {
    console.error("Missing post title.");
    process.exit(1);
  }
  if (!content) {
    console.error("Missing post content.");
    process.exit(1);
  }

  if (!date) {
    date = todayDDMMYYYY();
  }
  if (!/^\d{2}-\d{2}-\d{4}$/.test(date)) {
    console.error(`Invalid date format: "${date}". Use DD-MM-YYYY.`);
    process.exit(1);
  }

  const slug = date.split("-").reverse().join("");

  const postContent = `---
date: "${escapeYamlString(date)}"
title: "${escapeYamlString(title)}"
visible: true

slug: "${slug}"
---

${content}
`;

  const postsDir = path.join(__dirname, "..", "posts");
  const baseFileName = `${slug}.md`;
  const fileName = getUniqueFileName(postsDir, baseFileName);
  const filePath = path.join(postsDir, fileName);

  fs.writeFileSync(filePath, postContent);
  console.log(`Post created: posts/${fileName}`);

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `file=posts/${fileName}\nslug=${slug}\n`
    );
  }
}

main();
