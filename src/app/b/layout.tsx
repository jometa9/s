export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[800px] mx-auto px-8 pb-12">{children}</div>
  );
}
