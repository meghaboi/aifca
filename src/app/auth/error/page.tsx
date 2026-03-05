"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { KolamKnot } from "@/components/motifs/KolamKnot";

export default function AuthErrorPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-off-white px-4">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md rounded-lg border border-zinc-200 bg-warm-paper p-6 text-center"
      >
        <KolamKnot className="mx-auto mb-4 size-20 text-indigo-night/25" />
        <h1 className="text-heading-1 text-indigo-night">Something went wrong</h1>
        <p className="mt-2 text-[12px] text-muted-ash">Authentication did not complete. Please retry sign-in.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link
            href="/auth/signin"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-saffron px-4 text-[12px] font-semibold text-ink-black transition-colors hover:bg-[#ff7a34]"
          >
            Retry
          </Link>
        </div>
      </motion.section>
    </main>
  );
}

