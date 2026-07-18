import { PostMetadata } from "./PostMetadata";

export const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const isScheduled = (post: PostMetadata, today = new Date()) =>
  parseDate(post.date) > today;
