import Link from "next/link";

export default function Hero() {
  return (
    <div className="homeLinksContent">
    <Link href="/" className="blogHeaderTitle">
        <h2 className="homeLinksTitle">jometa</h2>
      </Link>
    <p className="homeQuote">
      building <a href="https://www.iptradecopier.com" >@IPTRADE</a>
    </p>
    <div className="homeLinksContainer">
      <a href="https://www.linkedin.com/in/joaquinmetayer/" className="homeLinksLink">
        Linkedin
      </a>
      <a href="https://www.instagram.com/jometa_/" className="homeLinksLink">
        Instagram
      </a>

    </div>
  </div>
  );
}
