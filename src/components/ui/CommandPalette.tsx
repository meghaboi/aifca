"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, CalendarClock, CheckSquare, Settings, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { KolamKnot } from "@/components/motifs/KolamKnot";
import { commandItems } from "@/lib/mock-data";
import { cn } from "@/utils/cn";
import { useUIStore } from "@/store/ui";

const iconByType = {
  client: User,
  task: CheckSquare,
  deadline: CalendarClock,
  settings: Settings,
} as const;

export function CommandPalette() {
  const router = useRouter();
  const isOpen = useUIStore((state) => state.commandPaletteOpen);
  const setOpen = useUIStore((state) => state.setCommandPaletteOpen);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commandItems;
    return commandItems.filter((item) => `${item.name} ${item.context} ${item.type}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!isOpen);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const onSelect = (index: number) => {
    const item = results[index];
    if (!item) return;
    setOpen(false);
    router.push(item.href);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[65] flex items-start justify-center bg-indigo-night/55 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="w-full max-w-2xl overflow-hidden rounded-lg border border-zinc-200 bg-off-white shadow-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3">
              <Building2 className="size-4 text-muted-ash" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActiveIndex((prev) => Math.max(prev - 1, 0));
                  }
                  if (event.key === "Enter") {
                    event.preventDefault();
                    onSelect(activeIndex);
                  }
                }}
                className="w-full bg-transparent text-[12px] outline-none placeholder:text-muted-ash"
                placeholder="Search clients, tasks, deadlines, settings..."
                aria-label="Search command palette"
              />
              <button onClick={() => setOpen(false)} aria-label="Close command palette" className="rounded p-1 hover:bg-zinc-100">
                <X className="size-4" />
              </button>
            </div>

            <div className="max-h-[360px] overflow-auto p-2">
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-muted-ash">
                  <KolamKnot className="mb-3 size-20 opacity-25" />
                  <p className="text-[12px] font-semibold">No matching results</p>
                  <p className="text-[10px]">Try searching client names, due dates, or settings.</p>
                </div>
              ) : (
                results.map((item, index) => {
                  const Icon = iconByType[item.type];
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelect(index)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors",
                        isActive ? "bg-indigo-night text-off-white" : "hover:bg-zinc-100",
                      )}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon className="size-3.5" />
                        <span>
                          <span className="block text-[12px] font-semibold">{item.name}</span>
                          <span className={cn("block text-[10px]", isActive ? "text-off-white/80" : "text-muted-ash")}>{item.context}</span>
                        </span>
                      </span>
                      <span className={cn("rounded-pill px-2 py-1 text-[8px] uppercase tracking-[0.08em]", isActive ? "bg-off-white/20" : "bg-zinc-200 text-muted-ash")}>
                        {item.type}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

