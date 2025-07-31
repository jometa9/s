import Link from "next/link";

interface HomeLinksProps {
  totalPosts?: number;
}

export default function HomeLinks({ totalPosts = 0 }: HomeLinksProps) {
  return (
      <div className="homeLinksContent">
        <h2 className="homeLinksTitle">jometa</h2>
        <p className="homeQuote">
          fixing internet problems
        </p>
        <div className="homeLinksContainer">
          <a href="https://www.linkedin.com/in/joaquinmetayer/" className="homeLinksLink">
            Linkedin
          </a>
          <a href="https://github.com/jometa9" className="homeLinksLink">
            Github
          </a>
          <a href="https://www.instagram.com/jometa_/" className="homeLinksLink">
            Instagram
          </a>
          <a href="https://www.youtube.com/@jometa9" className="homeLinksLink">
            Youtube
          </a>
        </div>
      </div>
  );
}
