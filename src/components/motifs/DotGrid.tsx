import { cn } from "@/utils/cn";

interface DotGridProps {
  className?: string;
  dotSize?: number;
  spacing?: number;
}

export function DotGrid({ className, dotSize = 1.4, spacing = 16 }: DotGridProps) {
  return (
    <svg className={cn("text-current", className)} width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id="dot-grid-pattern" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
          <circle cx={dotSize} cy={dotSize} r={dotSize} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid-pattern)" />
    </svg>
  );
}

