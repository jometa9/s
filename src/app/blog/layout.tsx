import Header from "../components/Header";
import '../jometa.css'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}