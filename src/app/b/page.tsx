import getPostMetadata from "../../../components/getPostMetadata";
import BlogHome from "./BlogHome";

export default function Blog() {
  const { posts } = getPostMetadata();

  return <BlogHome posts={posts} />;
}
