import { cn } from "@/utils/cn";

type BadgeState = "filed" | "pending" | "late" | "notice" | "done" | "in_progress";

const badgeMap: Record<BadgeState, string> = {
  filed: "bg-peacock-teal/15 text-peacock-teal",
  pending: "bg-turmeric-gold/20 text-[#8a5e00]",
  late: "bg-saffron/20 text-saffron",
  notice: "bg-red-100 text-red-700",
  done: "bg-peacock-teal/15 text-peacock-teal",
  in_progress: "bg-indigo-night/15 text-indigo-night",
};

export function StatusBadge({ state, label, className }: { state: BadgeState; label?: string; className?: string }) {
  return (
    <span className={cn("inline-flex rounded-pill px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em]", badgeMap[state], className)}>
      {label ?? state.replace("_", " ")}
    </span>
  );
}

