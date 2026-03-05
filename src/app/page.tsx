import { DotGrid } from "@/components/motifs/DotGrid";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { ModuleShowcase } from "@/components/landing/ModuleShowcase";
import { WhatsAppFeature } from "@/components/landing/WhatsAppFeature";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <main id="main-content" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <DotGrid className="h-full w-full text-indigo-night" />
        </div>
        <Hero />
        <ModuleShowcase />
        <WhatsAppFeature />
        <ComparisonTable />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}

