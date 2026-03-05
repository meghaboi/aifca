import { cn } from "@/utils/cn";

interface SkeletonChartProps {
  height?: number;
  className?: string;
}

export function SkeletonChart({ height = 240, className }: SkeletonChartProps) {
  return (
    <div className={cn("rounded-md border border-zinc-200 bg-warm-paper p-4", className)}>
      <div className="skeleton mb-4 h-5 w-40" />
      <div className="grid grid-cols-8 items-end gap-2" style={{ height }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="skeleton rounded-sm"
            style={{
              height: `${30 + ((index * 17) % 70)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

