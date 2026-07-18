"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogNavTitle() {
  const pathname = usePathname();
  const isPost = pathname !== "/b" && pathname?.startsWith("/b/");
  const href = isPost ? "/b" : "/";

  return (
    <Link href={href} className="no-underline text-2xl font-bold ">
      jometa
    </Link>
  );
}
