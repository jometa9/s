import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  const href = props.youtubeUrl || `/blog/posts/${props.slug}`;
  const target = props.youtubeUrl ? "_blank" : "_self";

  return (
    <p className="postPreview">
      <Link href={href} target={target} className="postPreviewTitle">
        {props.title}
      </Link>
      <span>{props.date}</span>
    </p>
  );
};

export default PostPreview;
