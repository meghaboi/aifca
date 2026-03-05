"use client";

import { motion } from "framer-motion";
import {
  BadgeIndianRupee,
  Building2,
  FileCheck2,
  FileSpreadsheet,
  Landmark,
  MessageCircle,
  ReceiptText,
  Sparkles,
} from "lucide-react";

const modules = [
  { name: "GST Intelligence", description: "AI-driven GST filing, 2B reconciliation, and notices.", icon: ReceiptText },
  { name: "Income Tax & ITR", description: "End-to-end ITR preparation with AIS/26AS reconciliation.", icon: BadgeIndianRupee },
  { name: "TDS Management", description: "Quarterly TDS lifecycle with challans and certificate dispatch.", icon: FileSpreadsheet },
  { name: "ROC & MCA", description: "MCA deadlines, filings, and secretarial workflow in one view.", icon: Building2 },
  { name: "AI Document Engine", description: "Extracts data from scanned PDFs, photos, and WhatsApp docs.", icon: FileCheck2 },
  { name: "Practice Management", description: "Firm-level task orchestration, workload tracking, and SLAs.", icon: Landmark },
  { name: "WhatsApp Portal", description: "Client communication and document collection on WhatsApp.", icon: MessageCircle },
  { name: "AI Advisory Engine", description: "Contextual advisory prompts for tax and compliance decisions.", icon: Sparkles },
];

export function ModuleShowcase() {
  return (
    <section id="features" className="container py-16 md:py-20">
      <h2 className="text-display-lg text-indigo-night">Everything a CA firm needs, unified</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((module, index) => {
          const Icon = module.icon;
          return (
            <motion.article
              key={module.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.25, delay: Math.min(index * 0.06, 0.3) }}
              className="group rounded-md border border-zinc-200 bg-warm-paper p-4 transition-colors hover:border-saffron"
            >
              <div className="mb-3 inline-flex size-9 items-center justify-center rounded-md bg-indigo-night/10 text-indigo-night">
                <Icon className="size-4" />
              </div>
              <h3 className="text-heading-2 text-indigo-night">{module.name}</h3>
              <p className="mt-2 text-body-lg text-muted-ash">{module.description}</p>
              <div className="mt-4 h-0.5 w-0 bg-saffron transition-all duration-150 group-hover:w-10" />
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

