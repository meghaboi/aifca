import { cn } from "@/utils/cn";

interface ChakraRingProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function ChakraRing({ className, size = 240, strokeWidth = 1.5 }: ChakraRingProps) {
  const spokes = Array.from({ length: 24 }, (_, index) => index * 15);

  return (
    <svg
      className={cn("text-current", className)}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="50" cy="50" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
      {spokes.map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="14"
          x2="50"
          y2="46"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}

