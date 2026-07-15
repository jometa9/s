import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <p className="flex justify-between items-center gap-2.5">
      <Link
        href={`/blog/${props.slug}`}
        className="whitespace-nowrap overflow-hidden text-ellipsis no-underline"
      >
        {props.title}
      </Link>
      <span className="whitespace-nowrap flex-shrink-0 text-black/30">{props.date}</span>
    </p>
  );
};

export default PostPreview;
