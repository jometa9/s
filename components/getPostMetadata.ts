import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "./PostMetadata";

interface PostMetadataWithDate extends PostMetadata {
  date: string;
}

const getPostMetadata = (): {
  posts: PostMetadataWithDate[];
  lastPostDate: string | null;
} => {
  const folder = `posts/`;
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);

  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    
    // Prefer the YouTube URL declared in frontmatter (new, non-embedded posts).
    let youtubeUrl: string | undefined = matterResult.data.youtube || undefined;

    if (!youtubeUrl) {
      // Backward compatibility: detect old posts whose body is only a YouTube iframe.
      const content = matterResult.content.trim();
      const youtubeIframeRegex = /<iframe\s+src="https:\/\/www\.youtube\.com\/embed\/([^"]+)"\s+allowfullscreen><\/iframe>/;
      const match = content.match(youtubeIframeRegex);
      if (match && content === match[0]) {
        const videoId = match[1];
        youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
      }
    }
    
    return {
      date: matterResult.data.date,
      title: matterResult.data.title,
      slug: fileName.replace(".md", ""),
      youtubeUrl,
    } as PostMetadataWithDate;
  });

  posts.sort((a, b) => {
    const [aDay, aMonth, aYear] = a.date.split("-");
    const [bDay, bMonth, bYear] = b.date.split("-");

    const aDate = new Date(`${aYear}-${aMonth}-${aDay}`);
    const bDate = new Date(`${bYear}-${bMonth}-${bDay}`);

    return bDate.getTime() - aDate.getTime();
  });

  const lastPostDate = posts.length > 0 ? posts[0].date : null;

  return { posts, lastPostDate };
};

export default getPostMetadata;
