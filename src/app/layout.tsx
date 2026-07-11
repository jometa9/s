import type { Metadata } from "next";
import './globals.css';
import 'highlight.js/styles/github.css';

export const metadata: Metadata = {
  title: "jometa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
