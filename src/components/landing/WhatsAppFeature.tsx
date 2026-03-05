"use client";

import { motion } from "framer-motion";

export function WhatsAppFeature() {
  return (
    <section className="container py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.25 }}
        className="grid gap-8 rounded-lg border border-zinc-200 bg-warm-paper p-5 md:grid-cols-2 md:p-8"
      >
        <div className="overflow-hidden rounded-md border border-zinc-200 bg-[#ece5dd]">
          <div className="bg-[#25d366] px-4 py-3 text-[12px] font-semibold text-ink-black">WhatsApp Client Workflow</div>
          <div className="space-y-2 p-4">
            <div className="max-w-[85%] rounded-md rounded-tl-none bg-white p-3 text-[11px] shadow-sm">
              Sir, uploading bank statement + sales register now.
            </div>
            <div className="ml-auto max-w-[85%] rounded-md rounded-tr-none bg-[#dcf8c6] p-3 text-[11px] shadow-sm">
              Received. AI is extracting GST-ready data.
              <span className="mt-2 inline-flex rounded-pill bg-peacock-teal/15 px-2 py-1 text-[8px] font-semibold text-peacock-teal">
                AI Extracted ?
              </span>
            </div>
            <div className="max-w-[85%] rounded-md rounded-tl-none bg-white p-3 text-[11px] shadow-sm">
              Please confirm before filing.
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-saffron">WhatsApp-first</p>
          <h2 className="mt-2 text-display-lg text-indigo-night">Client communication where India already works</h2>
          <p className="mt-4 text-[12px] text-muted-ash">
            Clients send documents through WhatsApp. AIFCA ingests, classifies, and routes data to the right compliance workflow automatically.
            Confirmations, reminders, and filing acknowledgements all flow in the same thread.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

