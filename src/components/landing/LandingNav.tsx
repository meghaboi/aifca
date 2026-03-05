"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-150",
        scrolled ? "bg-indigo-night/92 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container flex min-h-16 items-center justify-between">
        <Link href="/" className={cn("font-display text-heading-2 font-bold", scrolled ? "text-off-white" : "text-indigo-night")}>
          AIFCA
          <span className="ml-1 text-saffron">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className={cn("text-[12px] font-medium", scrolled ? "text-off-white/85" : "text-ink-black")}>Features</a>
          <a href="#pricing" className={cn("text-[12px] font-medium", scrolled ? "text-off-white/85" : "text-ink-black")}>Pricing</a>
          <a href="#about" className={cn("text-[12px] font-medium", scrolled ? "text-off-white/85" : "text-ink-black")}>About</a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/auth/signin" className={cn("text-[12px] font-semibold", scrolled ? "text-off-white" : "text-indigo-night")}>
            Sign in with GitHub ?
          </Link>
          <Link
            href="/auth/signin"
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-saffron px-3 text-[11px] font-semibold text-ink-black transition-colors hover:bg-[#ff7a34]"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </header>
  );
}

