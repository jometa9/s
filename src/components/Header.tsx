import Link from "next/link";
import { Fragment } from "react";
import SiteTitle from "./SiteTitle";
import { muted } from "./styles";

const AVATAR = "w-[160px] h-[160px] object-cover";

const AVATARS = [
  "/images/blue.webp",
];

const PROJECTS = [
  { href: "https://iptradecopier.com", label: "iptrade" },
  { href: "https://5mtrader.com", label: "5mtrader" },
  { href: "https://api2labs.com", label: "api2labs" },
];

const SOCIALS = [
  { href: "https://github.com/jometa9", label: "github" },
  { href: "https://www.linkedin.com/in/joaquinmetayer/", label: "linkedin" },
  { href: "mailto:joaquinmetayer@gmail.com", label: "email" },
];

/** A row of external links joined by dashes. */
function LinkRow({ links }: { links: { href: string; label: string }[] }) {
  return (
    <p className="flex flex-wrap justify-start items-start gap-x-3 gap-y-1 m-0">
      {links.map((link, index) => (
        <Fragment key={link.href}>
          {index > 0 && <span className={muted}>-</span>}
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </Fragment>
      ))}
    </p>
  );
}

export default function Header({ totalPosts }: { totalPosts?: number }) {
  return (
    <header className="px-5 flex flex-col md:flex-row items-start gap-6 text-left">
      <div className="grid grid-cols-2 gap-2 md:pb-0 shrink-0">
        {AVATARS.map((src) => (
          <img key={src} className={AVATAR} src={src} alt="jometa" />
        ))}
      </div>

      <div className="flex flex-col ">
        <SiteTitle className="text-2xl px-0 text-left " />

        <div className="mt-6 gap-2">
          <LinkRow links={PROJECTS} />
          <LinkRow links={SOCIALS} />
          <p className="flex flex-wrap justify-start items-center gap-x-3 gap-y-1 m-0">
            <Link href="/b" className={`no-underline ${muted}`}>
              blog w {totalPosts !== undefined && <span>{totalPosts} posts</span>}
            </Link>
          </p>
        </div>
      </div>
    </header>
  );
}
