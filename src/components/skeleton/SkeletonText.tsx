import { cn } from "@/utils/cn";

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

const widths = ["w-[90%]", "w-[70%]", "w-[55%]"];

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className={cn("skeleton h-3 rounded-[3px]", widths[index] ?? "w-[60%]")} />
      ))}
    </div>
  );
}

