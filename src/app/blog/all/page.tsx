import getPostMetadata from "../../../../components/getPostMetadata";
import BlogHome from "../BlogHome";

export default function AllPosts() {
  const { posts } = getPostMetadata();

  return <BlogHome posts={posts} showScheduled />;
}
