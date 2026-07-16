"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogNavTitle() {
  const pathname = usePathname();
  const isPost = pathname !== "/blog" && pathname?.startsWith("/blog/");
  const href = isPost ? "/blog" : "/";

  return (
    <Link href={href} className="no-underline text-2xl font-bold ">
      jometa
    </Link>
  );
}
