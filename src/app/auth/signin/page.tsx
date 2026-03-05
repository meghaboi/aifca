"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";
import Link from "next/link";
import { KolamKnot } from "@/components/motifs/KolamKnot";
import { Button } from "@/components/ui/Button";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-indigo-night px-4">
      <KolamKnot className="pointer-events-none absolute -right-14 top-10 size-64 text-off-white/10" />
      <KolamKnot className="pointer-events-none absolute -left-14 bottom-10 size-64 text-off-white/10" />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md rounded-lg border border-off-white/10 bg-off-white p-6 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <p className="font-display text-display-lg text-indigo-night">
            AIFCA<span className="text-saffron">.</span>
          </p>
          <h1 className="mt-3 text-heading-1 text-indigo-night">Welcome back</h1>
        </div>

        <Button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full"
          iconLeft={<Github className="size-4" />}
        >
          Continue with GitHub
        </Button>

        <p className="mt-4 text-center text-[10px] text-muted-ash">
          By signing in, you agree to our <Link href="#" className="underline">Terms</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
        </p>
      </motion.section>
    </main>
  );
}

