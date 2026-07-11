import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  const href = props.youtubeUrl || `/blog/posts/${props.slug}`;
  const target = props.youtubeUrl ? "_blank" : "_self";

  return (
    <p className="flex justify-between items-center gap-2.5">
      <Link
        href={href}
        target={target}
        className="whitespace-nowrap overflow-hidden text-ellipsis no-underline"
      >
        {props.title}
      </Link>
      <span className="whitespace-nowrap flex-shrink-0 text-black/30">{props.date}</span>
    </p>
  );
};

export default PostPreview;
