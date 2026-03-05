import { cn } from "@/utils/cn";
import { formatIndianCurrency } from "@/utils/format";

interface AmountCellProps {
  amount: number;
  status?: "positive" | "negative" | "pending";
  className?: string;
}

export function AmountCell({ amount, status, className }: AmountCellProps) {
  const tone =
    status ?? (amount > 0 ? "positive" : amount < 0 ? "negative" : "pending");

  return (
    <span
      className={cn(
        "font-mono text-[10px]",
        tone === "positive" && "text-peacock-teal",
        tone === "negative" && "text-red-600",
        tone === "pending" && "text-muted-ash",
        className,
      )}
    >
      {formatIndianCurrency(amount)}
    </span>
  );
}

