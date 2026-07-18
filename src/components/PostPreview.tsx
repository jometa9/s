import Link from "next/link";
import { PostMetadata } from "./PostMetadata";
import { muted } from "./styles";

interface PostPreviewProps extends PostMetadata {
  /** Scheduled posts render dimmed. */
  dimmed?: boolean;
}

export default function PostPreview({
  slug,
  title,
  date,
  dimmed,
}: PostPreviewProps) {
  return (
    <p className="flex justify-between items-center gap-2.5">
      <Link
        href={`/b/${slug}`}
        className={`whitespace-nowrap overflow-hidden text-ellipsis no-underline ${
          dimmed ? muted : ""
        }`}
      >
        {title}
      </Link>
      <span className={`whitespace-nowrap flex-shrink-0 ${muted}`}>{date}</span>
    </p>
  );
}
