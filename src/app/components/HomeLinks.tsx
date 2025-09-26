import Link from "next/link";

interface HomeLinksProps {
  totalPosts?: number;
}

export default function HomeLinks({ totalPosts = 0 }: HomeLinksProps) {
  return (
    <div style={{marginBottom: '15px'}}>
    <Link href="/">
        <h2 className="homeLinksTitle">jometa</h2>
      </Link>
    <p >
      building <a href="https://www.iptradecopier.com" >@IPTRADE</a>
    </p>
      <a href="https://www.linkedin.com/in/joaquinmetayer/" >
        LinkedIn
      </a>
  </div>
  );
}
