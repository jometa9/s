import BlogNavTitle from "./BlogNavTitle";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[700px] px-8 pb-12">
      <nav className="py-10">
        <BlogNavTitle />
      </nav>
      <main>{children}</main>
    </div>
  );
}
