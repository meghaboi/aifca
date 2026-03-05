const comparisonRows = [
  {
    feature: "GST Filing",
    aifca: "Full AI",
    competitors: "Invaro: None | ClearTax: Partial | TaxCloud: Partial | BUSY/Saral: Manual",
  },
  {
    feature: "2B Reconciliation",
    aifca: "AI Auto",
    competitors: "Invaro: None | ClearTax: Semi-Auto | TaxCloud: Basic | BUSY/Saral: None",
  },
  {
    feature: "ITR Suite",
    aifca: "Full AI",
    competitors: "Invaro: None | ClearTax: Yes | TaxCloud: Partial | BUSY/Saral: Basic",
  },
  {
    feature: "TDS Suite",
    aifca: "Full AI",
    competitors: "Invaro: None | ClearTax: Yes | TaxCloud: Yes | BUSY/Saral: Basic",
  },
  {
    feature: "ROC / MCA",
    aifca: "Full AI",
    competitors: "Invaro: None | ClearTax: None | TaxCloud: None | BUSY/Saral: None",
  },
  {
    feature: "WhatsApp Portal",
    aifca: "Native",
    competitors: "Invaro: None | ClearTax: None | TaxCloud: None | BUSY/Saral: None",
  },
  {
    feature: "Tally Sync",
    aifca: "Deep",
    competitors: "Invaro: None | ClearTax: None | TaxCloud: None | BUSY/Saral: Limited",
  },
  {
    feature: "Notice Response",
    aifca: "AI Draft",
    competitors: "Invaro: None | ClearTax: None | TaxCloud: None | BUSY/Saral: None",
  },
  {
    feature: "Advisory AI",
    aifca: "Full",
    competitors: "Invaro: Partial | ClearTax: None | TaxCloud: None | BUSY/Saral: None",
  },
  {
    feature: "Language",
    aifca: "Hi + En",
    competitors: "Invaro: English | ClearTax: English | TaxCloud: English | BUSY/Saral: English",
  },
  {
    feature: "Pricing",
    aifca: "INR-based",
    competitors: "Invaro: USD-based | ClearTax: INR-based | TaxCloud: INR-based | BUSY/Saral: INR-based",
  },
];

const toneForCompetitor = (value: string) => {
  if (value.includes("None")) return "text-muted-ash";
  if (value.includes("Partial") || value.includes("Basic") || value.includes("Limited") || value.includes("Semi")) {
    return "text-turmeric-gold";
  }
  return "text-peacock-teal";
};

export function ComparisonTable() {
  return (
    <section className="container py-16 md:py-20">
      <h2 className="text-display-lg text-indigo-night">Competitive Comparison</h2>
      <div className="mt-6 overflow-x-auto rounded-md border border-zinc-200 bg-warm-paper">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-zinc-200 text-[10px] uppercase tracking-[0.08em]">
              <th className="px-4 py-3 text-muted-ash">Feature</th>
              <th className="bg-saffron px-4 py-3 text-ink-black">AIFCA</th>
              <th className="px-4 py-3 text-muted-ash">Competitors</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.feature} className="border-b border-zinc-200 text-[12px] last:border-b-0">
                <td className="px-4 py-3 font-semibold text-indigo-night">{row.feature}</td>
                <td className="px-4 py-3 text-peacock-teal">? {row.aifca}</td>
                <td className={`px-4 py-3 ${toneForCompetitor(row.competitors)}`}>{row.competitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

