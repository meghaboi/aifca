import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

interface ComplianceCardProps {
  title: string;
  description: string;
  urgencyLabel?: string;
  className?: string;
}

export function ComplianceCard({ title, description, urgencyLabel, className }: ComplianceCardProps) {
  return (
    <article className={cn("rounded-md border border-zinc-200 bg-warm-paper p-4 transition-colors hover:border-saffron", className)}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-heading-3 uppercase tracking-[0.08em] text-indigo-night">{title}</h3>
        {urgencyLabel ? <span className="text-caption uppercase text-saffron">{urgencyLabel}</span> : null}
      </div>
      <p className="text-body-lg text-muted-ash">{description}</p>
      <button className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold text-peacock-teal">
        Open
        <ChevronRight className="size-3" />
      </button>
    </article>
  );
}

