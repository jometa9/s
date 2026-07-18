import fs from "fs";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import matter from "gray-matter";
import getPostMetadata from "../../../../components/getPostMetadata";
import { highlightCode } from "../../utils/highlight";

const getPostContent = (slug: any) => {
  try {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    return null;
  }
};

export const generateStaticParams = async () => {
  const { posts } = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const PostPage = async (props: any) => {
  const params = await props.params;
  const slug = params.slug;
  const post = getPostContent(slug);

  if (!post) {
    return <p>404</p>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-8">
          {post.data.title}
      </h2>
      <article>
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          components={{
            code: ({ className, children }) => {
              const language = className
                ? className.replace("language-", "")
                : "";
              const text = String(children).replace(/\n$/, "");
              if (!className && !text.includes("\n")) {
                return <code>{text}</code>;
              }
              const highlighted = highlightCode(text, language);
              return (
                <code
                  className={`hljs ${language}`}
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              );
            },
          }}
        >
          {post.content}
        </Markdown>
      </article>
      <p className="text-black/30 dark:text-white/30 pt-8">
        {post.data.date}
      </p>
    </div>
  );
};

export default PostPage;
