import SiteTitle from "@/components/SiteTitle";
import { muted } from "@/components/styles";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <SiteTitle className="text-3xl" />
      <p className={`text-6xl ${muted}`}>404</p>
    </main>
  );
}
