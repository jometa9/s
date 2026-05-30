import getPostMetadata from "../../components/getPostMetadata";
import BlogHome from "./blog/BlogHome";
import Header from "./components/Header";
import './jometa.css'

export default function Home() {
  const { posts } = getPostMetadata();
  const totalPosts = posts.length;
  const startYear = totalPosts
    ? Number(posts[totalPosts - 1].date.split("-")[2])
    : undefined;

  return (
    <>
      <Header totalPosts={totalPosts} startYear={startYear} />
      <BlogHome posts={posts} />
    </>
  );
}
