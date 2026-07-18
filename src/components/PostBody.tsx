import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { highlightCode } from "@/app/utils/highlight";

/** Renders post markdown, syntax-highlighting fenced code blocks. */
export default function PostBody({ content }: { content: string }) {
  return (
    <article>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          code: ({ className, children }) => {
            const language = className?.replace("language-", "") ?? "";
            const text = String(children).replace(/\n$/, "");

            // Inline code keeps its plain rendering.
            if (!className && !text.includes("\n")) {
              return <code>{text}</code>;
            }

            return (
              <code
                className={`hljs ${language}`}
                dangerouslySetInnerHTML={{
                  __html: highlightCode(text, language),
                }}
              />
            );
          },
        }}
      >
        {content}
      </Markdown>
    </article>
  );
}
