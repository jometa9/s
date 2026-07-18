import Header from "@/components/Header";
import { getPostMetadata } from "@/components/posts";
import { isScheduled } from "@/components/postDates";

export default function Home() {
  const publishedPosts = getPostMetadata().filter((post) => !isScheduled(post));

  return (
    <main className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center gap-6 p-8">
      <Header totalPosts={publishedPosts.length} />
    </main>
  );
}
