import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileSignature, Download, Briefcase, Shield, Store, Users } from "lucide-react";

export const Route = createFileRoute("/_app/kontrak")({
  component: KontrakPage,
});

const templates = [
  { name: "Freelance Agreement", category: "Freelancer", icon: Users },
  { name: "NDA Agreement", category: "Legal", icon: Shield },
  { name: "Vendor Contract", category: "Business", icon: Store },
  { name: "Project Agreement", category: "Agency", icon: Briefcase },
];

const milestones = [
  { label: "DP", pct: "50%", desc: "Sebelum project dimulai" },
  { label: "Progress", pct: "30%", desc: "Setelah fase development selesai" },
  { label: "Final", pct: "20%", desc: "Saat handover & go-live" },
];

function KontrakPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kontrak Generator</h1>
          <p className="text-sm text-muted-foreground mt-1">Pilih template dan generate kontrak siap tanda tangan.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-xs font-semibold hover:brightness-95">
          <Download className="h-3.5 w-3.5" /> Export PDF
        </button>
      </div>

      {/* Template selector */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {templates.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActive(i)}
            className={`doq-card p-4 text-left transition-colors ${
              active === i ? "border-accent ring-1 ring-accent" : "hover:border-foreground/30"
            }`}
          >
            <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center">
              <t.icon className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-sm font-semibold">{t.name}</h3>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">{t.category}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Preview */}
        <article className="doq-card p-8 space-y-5">
          <header className="border-b border-border pb-5">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Kontrak</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight">{templates[active].name}</h2>
          </header>

          <section className="space-y-3 text-sm leading-relaxed">
            <p>
              PIHAK PERTAMA memberikan pekerjaan kepada PIHAK KEDUA untuk
              mengerjakan project Website Development.
            </p>
            <p>
              Nilai project sebesar <span className="font-semibold">Rp15.000.000</span> dengan
              timeline <span className="font-semibold">30 hari kerja</span>.
            </p>
            <p>Pembayaran dilakukan dalam 3 tahap:</p>
            <ul className="space-y-1.5 pl-4">
              <li>• DP 50%</li>
              <li>• Progress 30%</li>
              <li>• Final 20%</li>
            </ul>
          </section>

          <footer className="border-t border-border pt-6 grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-muted-foreground">PIHAK PERTAMA</p>
              <div className="mt-8 border-t border-border pt-2 text-xs">CEPAT PRO Studio</div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">PIHAK KEDUA</p>
              <div className="mt-8 border-t border-border pt-2 text-xs">Klien</div>
            </div>
          </footer>
        </article>

        {/* Sidebar: milestones */}
        <aside className="lg:sticky lg:top-14 space-y-3">
          <div className="doq-card p-5">
            <div className="flex items-center gap-2">
              <FileSignature className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold">Payment Milestones</h3>
            </div>
            <div className="mt-4 space-y-3">
              {milestones.map((m) => (
                <div key={m.label} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{m.label}</span>
                    <span className="text-sm font-bold text-accent">{m.pct}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
