import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <Link href="/" className="text-3xl font-bold">
        jometa
      </Link>
      <p className="text-6xl text-black/20">404</p>
    </main>
  );
};

export default Custom404;
