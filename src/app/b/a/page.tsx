import BlogHeader from "@/components/BlogHeader";
import PostList from "@/components/PostList";
import { getPostMetadata } from "@/components/posts";

export default function AllPosts() {
  return (
    <>
      <BlogHeader />
      <PostList posts={getPostMetadata()} showScheduled />
    </>
  );
}
