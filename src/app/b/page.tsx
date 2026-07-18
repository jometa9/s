import BlogHeader from "@/components/BlogHeader";
import PostList from "@/components/PostList";
import { getPostMetadata } from "@/components/posts";

export const metadata = {
  title: "jometa - blog posts",
};

export default function Blog() {
  return (
    <>
      <BlogHeader />
      <PostList posts={getPostMetadata()} />
    </>
  );
}
