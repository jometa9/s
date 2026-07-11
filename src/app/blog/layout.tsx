import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[700px] px-8 pb-12">
      <nav className="py-10">
        <Link href="/" className="no-underline text-2xl font-bold">
          jometa
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
