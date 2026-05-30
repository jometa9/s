import Link from "next/link";

interface HeaderProps {
  totalPosts?: number;
  startYear?: number;
}

export default function Header({ totalPosts, startYear }: HeaderProps) {
  return (
    <header className="bookHeader">
      <Link href="/" className="bookHeaderTitleLink">
        <h2 className="bookHeaderTitle">jometa</h2>
      </Link>
      {totalPosts !== undefined && (
        <p className="bookHeaderMeta">
          {totalPosts} posts 
          {startYear ? ` since ${startYear}` : ""}
        </p>
      )}
    </header>
  );
}
