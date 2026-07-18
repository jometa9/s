import Link from "next/link";
import getPostMetadata from "../../components/getPostMetadata";
import Header from "./components/Header";
import { isScheduled } from "../../components/postDates";

export default function Home() {
  const { posts } = getPostMetadata();
  const publishedPosts = posts.filter((post) => !isScheduled(post));
  const totalPosts = publishedPosts.length;
  const startYear = totalPosts
    ? Number(publishedPosts[totalPosts - 1].date.split("-")[2])
    : undefined;

  return (
    <main className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center gap-6 p-8">
      <Header totalPosts={totalPosts} startYear={startYear} />
    </main>
  );
}
