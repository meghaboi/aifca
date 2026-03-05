"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ToastTone, useUIStore } from "@/store/ui";
import { cn } from "@/utils/cn";

const toneStyles: Record<ToastTone, string> = {
  success: "border-peacock-teal/40 bg-peacock-teal/10 text-peacock-teal",
  error: "border-saffron/40 bg-saffron/10 text-saffron",
  warning: "border-turmeric-gold/40 bg-turmeric-gold/10 text-[#8a5e00]",
  info: "border-indigo-night/40 bg-indigo-night/10 text-indigo-night",
};

function ToastItemCard({ id, title, message, tone }: { id: string; title: string; message?: string; tone: ToastTone }) {
  const removeToast = useUIStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), 4000);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={cn("w-[320px] rounded-md border p-3 shadow-sm", toneStyles[tone])}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold">{title}</p>
          {message ? <p className="mt-1 text-[10px] opacity-85">{message}</p> : null}
        </div>
        <button aria-label="Dismiss notification" onClick={() => removeToast(id)} className="rounded p-1 hover:bg-black/5">
          <X className="size-3" />
        </button>
      </div>
    </motion.li>
  );
}

export function ToastViewport() {
  const toasts = useUIStore((state) => state.toasts);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[70]">
      <ul className="pointer-events-auto space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItemCard key={toast.id} id={toast.id} title={toast.title} message={toast.message} tone={toast.tone} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

