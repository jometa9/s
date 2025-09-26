import Link from "next/link";

export default function Hero() {
  return (
    <div >
    <Link href="/">
        <h2 className="homeLinksTitle">jometa</h2>
      </Link>
    <p >
      building <a href="https://www.iptradecopier.com" >@IPTRADE</a>
    </p>
    <div >
      <a href="https://www.linkedin.com/in/joaquinmetayer/" >
        LinkedIn
      </a>
    </div>
  </div>
  );
}
