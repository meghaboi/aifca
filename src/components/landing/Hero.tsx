"use client";

import { motion } from "framer-motion";
import { ChakraRing } from "@/components/motifs/ChakraRing";
import { Button } from "@/components/ui/Button";

const heroVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const stats = [
  { label: "1.4M+ CAs in India", value: "1.4M+" },
  { label: "21hrs saved/month", value: "21hrs" },
  { label: "8 Modules", value: "8" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-36 md:px-8 lg:pt-44">
      <div className="container relative">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.06 }}
          className="max-w-3xl"
        >
          <motion.p
            variants={heroVariants}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
            className="mb-4 text-[8px] font-bold uppercase tracking-[0.2em] text-saffron"
          >
            AI FOR INDIAN CHARTERED ACCOUNTANTS
          </motion.p>
          <motion.h1
            variants={heroVariants}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="text-display-xl font-display text-indigo-night"
          >
            One Platform. Every Compliance. Zero Manual Work.
          </motion.h1>
          <motion.p variants={heroVariants} transition={{ duration: 0.25 }} className="mt-5 max-w-2xl text-[12px] text-muted-ash">
            AIFCA is built for Indian CA firms handling GST, ITR, TDS, ROC, and advisory workflows every day.
            Bring WhatsApp intake, compliance timelines, and AI execution into one command centre.
          </motion.p>
          <motion.div variants={heroVariants} transition={{ duration: 0.25 }} className="mt-7 flex flex-wrap gap-3">
            <Button className="min-w-[170px]">Get Started Free</Button>
            <Button variant="ghost" className="min-w-[150px]">
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            variants={heroVariants}
            transition={{ duration: 0.25 }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-md border border-zinc-200 bg-warm-paper p-4">
                <p className="font-display text-heading-1 text-indigo-night">{stat.value}</p>
                <p className="text-body-sm text-muted-ash">{stat.label}</p>
              </article>
            ))}
          </motion.div>
        </motion.div>

        <ChakraRing className="pointer-events-none absolute -right-6 top-2 hidden text-indigo-night/10 lg:block" size={380} />
      </div>
    </section>
  );
}

