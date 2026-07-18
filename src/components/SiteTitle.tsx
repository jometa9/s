import Link from "next/link";

/** The "jometa" wordmark, linking wherever the current page needs it. */
export default function SiteTitle({
  href = "/",
  className = "text-2xl",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`no-underline font-bold ${className}`}>
      jometa
    </Link>
  );
}
