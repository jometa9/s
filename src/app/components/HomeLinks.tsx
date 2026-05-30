import Link from "next/link";

interface HomeLinksProps {
  totalPosts?: number;
  startYear?: number;
}

export default function HomeLinks({ totalPosts = 0, startYear }: HomeLinksProps) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Link href="/">
        <h2 className="homeLinksTitle">joaquin metayer</h2>
      </Link>
      <p>
        {" "}
        total posts {totalPosts}
        {startYear ? ` since ${startYear}` : ""}
      </p>
      <p>
        <a href="https://github.com/jometa9">GitHub</a>{" "}
      <a href="https://www.linkedin.com/in/joaquinmetayer/">LinkedIn</a>
      </p>
    </div>
  );
}
