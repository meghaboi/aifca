import { cn } from "@/utils/cn";

export function SkeletonStat({ className }: { className?: string }) {
  return <div className={cn("skeleton h-8 w-20 rounded-sm", className)} />;
}

