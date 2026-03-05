import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer id="about" className="border-t border-zinc-200 bg-indigo-night text-off-white">
      <div className="container py-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="font-display text-heading-2 font-bold">
              AIFCA<span className="text-saffron">.</span>
            </p>
            <p className="mt-2 max-w-xs text-[11px] text-off-white/80">
              AI for Indian Chartered Accountants. Faster filings, stronger client relationships, higher quality advisory.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-[11px]">
            <div className="space-y-2">
              <Link href="#" className="block text-off-white/80 hover:text-off-white">Privacy</Link>
              <Link href="#" className="block text-off-white/80 hover:text-off-white">Terms</Link>
              <Link href="#" className="block text-off-white/80 hover:text-off-white">Security</Link>
              <Link href="#" className="block text-off-white/80 hover:text-off-white">Contact</Link>
            </div>
            <div>
              <p className="text-off-white/80">Made in India ????</p>
              <p className="mt-1 text-off-white/80">Made by Meghanadh</p>
              <div className="mt-3 flex items-center gap-2">
                <a href="#" aria-label="X" className="rounded border border-off-white/30 p-1.5 hover:bg-off-white/10"><Twitter className="size-3.5" /></a>
                <a href="#" aria-label="GitHub" className="rounded border border-off-white/30 p-1.5 hover:bg-off-white/10"><Github className="size-3.5" /></a>
                <a href="#" aria-label="LinkedIn" className="rounded border border-off-white/30 p-1.5 hover:bg-off-white/10"><Linkedin className="size-3.5" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

