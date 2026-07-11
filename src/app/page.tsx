import Link from "next/link";
import getPostMetadata from "../../components/getPostMetadata";
import Header from "./components/Header";

export default function Home() {
  const { posts } = getPostMetadata();
  const totalPosts = posts.length;
  const startYear = totalPosts
    ? Number(posts[totalPosts - 1].date.split("-")[2])
    : undefined;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <Header totalPosts={totalPosts} startYear={startYear} />
    </main>
  );
}
