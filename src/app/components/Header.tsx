import Link from "next/link";

interface HeaderProps {
  totalPosts?: number;
  startYear?: number;
}

const avatar = "w-[140px] h-[140px] object-cover";

export default function Header({ totalPosts, startYear }: HeaderProps) {
  return (
    <header className="px-5 flex flex-col md:flex-row items-center gap-6 md:gap-24 text-center md:text-left">
      <div className="flex flex-col items-center pb-4 md:pb-0 shrink-0">
        <div className="flex justify-center">
          <img className={avatar} src="/images/founder4.png" alt="jometa" />
        </div>
        <div className="flex justify-center items-start -mt-4">
          <img
            className={avatar}
            src="/images/final_enhanced_image.jpg"
            alt="jometa"
          />
          <img
            className={`${avatar} -ml-6 mt-12`}
            src="/images/blue.png"
            alt="jometa"
          />
        </div>
      </div>

      <div className="flex flex-col items-center md:items-start">
        <Link href="/" className="no-underline">
          <h2 className="text-4xl font-bold m-0 p-6 md:px-0">jometa</h2>
        </Link>

        <div className="mt-6 flex flex-col items-center md:items-start gap-2">
        <p className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 m-0">
          <a
            href="https://iptradecopier.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            iptrade
          </a>
          <span className="text-black/20">-</span>
          <a
            href="https://5mtrader.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            5mtrader
          </a>
          <span className="text-black/20">-</span>
          <a
            href="https://api2labs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            api2labs
          </a>
        </p>
        <p className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 m-0">
          <a
            href="https://github.com/jometa9"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <span className="text-black/20">-</span>
          <a
            href="https://www.linkedin.com/in/joaquinmetayer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          <span className="text-black/20">-</span>
          <a href="mailto:joaquinmetayer@gmail.com">email</a>
        </p>
        <p className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 m-0">
          <Link href="/blog" className="no-underline">
            blog w {totalPosts !== undefined && <span>{totalPosts} posts</span>}
          </Link>
        </p>
        </div>
      </div>
    </header>
  );
}
