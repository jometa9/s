import SiteTitle from "./SiteTitle";

/** Compact nav shown on individual posts, linking back to the index. */
export default function PostNav() {
  return (
    <nav className="pt-10 pb-4">
      <SiteTitle href="/b" />
    </nav>
  );
}
