import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "./PostMetadata";
import { byDateDesc } from "./postDates";

const POSTS_FOLDER = "posts";

/** Reads every markdown post's front matter, newest first. */
export const getPostMetadata = (): PostMetadata[] =>
  fs
    .readdirSync(POSTS_FOLDER)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const { data } = matter(
        fs.readFileSync(`${POSTS_FOLDER}/${fileName}`, "utf8")
      );

      return {
        date: data.date,
        title: data.title,
        slug: fileName.replace(".md", ""),
      };
    })
    .sort(byDateDesc);

/** Front matter plus body for a single post, or null if it doesn't exist. */
export const getPostContent = (slug: string) => {
  try {
    return matter(fs.readFileSync(`${POSTS_FOLDER}/${slug}.md`, "utf8"));
  } catch {
    return null;
  }
};
