import { SkeletonHeading } from "@/components/skeleton/SkeletonHeading";
import { SkeletonText } from "@/components/skeleton/SkeletonText";

export function SkeletonCard() {
  return (
    <div className="rounded-md border border-zinc-200 bg-warm-paper p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="skeleton size-10 rounded-full" />
        <SkeletonHeading className="h-5" />
      </div>
      <SkeletonText />
    </div>
  );
}

