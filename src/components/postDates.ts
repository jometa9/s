import { PostMetadata } from "./PostMetadata";

/** Post dates are stored as `DD-MM-YYYY`. */
export const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const getYear = (dateString: string) => dateString.split("-")[2];

export const isScheduled = (post: PostMetadata, today = new Date()) =>
  parseDate(post.date) > today;

/** Newest first. */
export const byDateDesc = (a: PostMetadata, b: PostMetadata) =>
  parseDate(b.date).getTime() - parseDate(a.date).getTime();
