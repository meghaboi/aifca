import { KolamKnot } from "@/components/motifs/KolamKnot";
import { SkeletonCard } from "@/components/skeleton/SkeletonCard";
import { SkeletonHeading } from "@/components/skeleton/SkeletonHeading";
import { SkeletonTableRow } from "@/components/skeleton/SkeletonTableRow";

export function ComingSoonPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-zinc-200 bg-warm-paper p-4">
        <SkeletonHeading className="mb-3" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="mt-4 space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonTableRow key={index} index={index} />
          ))}
        </div>
      </div>

      <section className="flex flex-col items-center justify-center rounded-md border border-dashed border-zinc-300 bg-off-white p-10 text-center">
        <KolamKnot className="mb-4 size-20 text-indigo-night/20" />
        <h1 className="text-heading-1 text-indigo-night">{title}</h1>
        <p className="mt-2 max-w-md text-[12px] text-muted-ash">{description}</p>
        <p className="mt-3 rounded-pill bg-saffron/15 px-3 py-1 text-[10px] font-semibold text-saffron">Coming Soon</p>
      </section>
    </div>
  );
}

