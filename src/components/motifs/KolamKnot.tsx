import { cn } from "@/utils/cn";

interface KolamKnotProps {
  className?: string;
  size?: number;
}

export function KolamKnot({ className, size = 220 }: KolamKnotProps) {
  return (
    <svg
      className={cn("text-current", className)}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 60C24 40 40 24 60 24C80 24 96 40 96 60C96 80 80 96 60 96C40 96 24 80 24 60Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M60 12V108M12 60H108"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 28C36 40 40 48 60 48C80 48 84 40 92 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 92C36 80 40 72 60 72C80 72 84 80 92 92"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M48 60C48 53.4 53.4 48 60 48C66.6 48 72 53.4 72 60C72 66.6 66.6 72 60 72C53.4 72 48 66.6 48 60Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

