import { notFound } from "next/navigation";
import PostBody from "@/components/PostBody";
import PostNav from "@/components/PostNav";
import { getPostContent, getPostMetadata } from "@/components/posts";
import { muted } from "@/components/styles";

export const generateStaticParams = async () =>
  getPostMetadata().map((post) => ({ slug: post.slug }));

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostContent(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PostNav />
      <h2 className="text-2xl mb-8">{post.data.title}</h2>
      <PostBody content={post.content} />
      <p className={`${muted} pt-8`}>{post.data.date}</p>
    </>
  );
}
