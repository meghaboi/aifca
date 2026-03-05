import { cn } from "@/utils/cn";

interface SkeletonTableRowProps {
  className?: string;
  index?: number;
}

export function SkeletonTableRow({ className, index = 0 }: SkeletonTableRowProps) {
  return (
    <div className={cn("skeleton h-11 w-full rounded-sm", index % 2 === 1 && "opacity-70", className)} />
  );
}

