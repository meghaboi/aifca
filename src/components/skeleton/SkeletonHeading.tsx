import { cn } from "@/utils/cn";

export function SkeletonHeading({ className }: { className?: string }) {
  return <div className={cn("skeleton h-6 w-3/5 rounded-sm", className)} />;
}

