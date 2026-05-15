import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/billing")({
  component: BillingPage,
});

const plans = [
  {
    name: "Free",
    price: "Gratis",
    desc: "Coba dulu, upgrade kalau cocok.",
    features: ["3 dokumen / bulan", "Export PDF", "Watermark DoqAI", "Template dasar"],
    cta: "Plan saat ini",
    current: true,
  },
  {
    name: "Pro",
    price: "Rp149.000",
    suffix: "/bulan",
    desc: "Untuk freelancer & agency.",
    features: [
      "Proposal & Kontrak Generator",
      "DOCX export",
      "Custom branding",
      "WhatsApp Content AI",
      "30 AI generations / bulan",
    ],
    cta: "Upgrade ke Pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "Rp399.000",
    suffix: "/bulan",
    desc: "Untuk tim & UMKM serius.",
    features: [
      "Semua fitur Pro",
      "Multi-user (5 seat)",
      "SOP Generator",
      "Shared assets",
      "Unlimited generation",
      "Priority WhatsApp support",
    ],
    cta: "Hubungi Sales",
  },
];

function BillingPage() {
  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight">Billing & Plan</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Pilih workflow yang cocok untuk bisnis Anda. Ganti kapan saja.
      </p>

      <div className="mt-8 grid lg:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`doq-card p-6 relative flex flex-col ${
              p.highlight ? "border-foreground shadow-lg ring-1 ring-foreground/10" : ""
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-6 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-foreground text-background">
                <Sparkles className="h-2.5 w-2.5" /> Most Popular
              </span>
            )}
            <h3 className="text-sm font-semibold">{p.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">{p.price}</span>
              {p.suffix && <span className="text-xs text-muted-foreground">{p.suffix}</span>}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
            <ul className="mt-5 space-y-2 text-sm flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              disabled={p.current}
              className={`mt-6 h-10 rounded-lg text-sm font-medium transition-colors ${
                p.current
                  ? "bg-muted text-muted-foreground cursor-default"
                  : p.highlight
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "border border-border hover:bg-muted"
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 doq-card p-6">
        <h2 className="text-sm font-semibold">Riwayat Tagihan</h2>
        <div className="mt-4 divide-y divide-border">
          {[
            ["Apr 2026", "Free Plan", "Rp 0"],
            ["Mar 2026", "Free Plan", "Rp 0"],
          ].map(([m, p, a]) => (
            <div key={m} className="py-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{m}</span>
              <span>{p}</span>
              <span className="font-medium">{a}</span>
              <button className="text-xs text-muted-foreground hover:text-foreground">Invoice</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
