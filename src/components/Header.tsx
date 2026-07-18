import Link from "next/link";
import { Fragment } from "react";
import SiteTitle from "./SiteTitle";
import { muted } from "./styles";

const AVATAR = "w-[140px] h-[140px] object-cover";

const AVATARS = [
  { src: "/s/images/founder4.webp", className: AVATAR },
  { src: "/s/images/final_enhanced_image.webp", className: AVATAR },
  { src: "/s/images/blue.webp", className: `${AVATAR} -ml-6 mt-12` },
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
    <p className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 m-0">
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
    <header className="px-5 flex flex-col md:flex-row items-center gap-6 md:gap-24 text-center md:text-left">
      <div className="flex flex-col items-center pb-4 md:pb-0 shrink-0">
        <div className="flex justify-center">
          <img className={AVATARS[0].className} src={AVATARS[0].src} alt="jometa" />
        </div>
        <div className="flex justify-center items-start -mt-4">
          {AVATARS.slice(1).map((avatar) => (
            <img
              key={avatar.src}
              className={avatar.className}
              src={avatar.src}
              alt="jometa"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center md:items-start">
        <SiteTitle className="text-4xl p-6 md:px-0" />

        <div className="mt-6 flex flex-col items-center md:items-start gap-2">
          <LinkRow links={PROJECTS} />
          <LinkRow links={SOCIALS} />
          <p className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 m-0">
            <Link href="/b" className={`no-underline ${muted}`}>
              blog w {totalPosts !== undefined && <span>{totalPosts} posts</span>}
            </Link>
          </p>
        </div>
      </div>
    </header>
  );
}
