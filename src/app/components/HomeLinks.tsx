import Link from "next/link";

interface HomeLinksProps {
  totalPosts?: number;
}

export default function HomeLinks({ totalPosts = 0 }: HomeLinksProps) {
  return (
      <div className="homeLinksContent">
        <h2 className="homeLinksTitle">jometa</h2>
        <p className="homeQuote">
          building <a href="https://www.iptradecopier.com" >@IPTRADE</a>
        </p>
        <div className="homeLinksContainer">
          <a href="https://www.linkedin.com/in/joaquinmetayer/" className="homeLinksLink">
            LinkedIn
          </a>

        </div>
      </div>
  );
}
