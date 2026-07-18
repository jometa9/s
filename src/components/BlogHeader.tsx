import SiteTitle from "./SiteTitle";
import { muted } from "./styles";

/** Title + subtitle filling half the viewport, vertically centered. */
export default function BlogHeader() {
  return (
    <header className="h-[50vh] flex flex-col justify-center">
      <SiteTitle href="/" />
      <p className={`${muted} mt-2`}>
        life log — my process and learnings, documented
      </p>
    </header>
  );
}
