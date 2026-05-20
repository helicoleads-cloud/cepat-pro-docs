import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Wand2, Download, Save, FileText, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/proposal")({
  component: ProposalGenerator,
});

const proposalList = [
  { client: "Klinik Sehat Dental", service: "Website Development", price: "Rp12.000.000", status: "Approved" },
  { client: "Laundry Express", service: "Social Media Management", price: "Rp4.500.000", status: "Pending" },
  { client: "Padel Arena Bandung", service: "Brand Identity", price: "Rp8.000.000", status: "Draft" },
];

const statusTone: Record<string, string> = {
  Approved: "bg-accent-soft text-accent",
  Pending: "bg-warning/15 text-warning",
  Draft: "bg-muted text-muted-foreground",
};

function ProposalGenerator() {
  const [data, setData] = useState({
    klien: "Klinik Sehat Dental",
    project: "Website Klinik Sehat Dental",
    service: "Website Development",
    budget: "12.000.000",
    timeline: "21 Hari",
    cta: "Booking konsultasi gratis sekarang",
  });
  const [tone, setTone] = useState("Profesional");
  const [generating, setGenerating] = useState(false);

  const f = (k: keyof typeof data) => (v: string) => setData({ ...data, [k]: v });

  return (
    <div>
      {/* Proposal list */}
      <div className="border-b border-border bg-card/40 p-4 lg:px-8 lg:py-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-lg font-bold tracking-tight">Proposal</h1>
            <p className="text-xs text-muted-foreground">3 proposal terbaru</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-xs font-semibold hover:brightness-95">
            <Plus className="h-3.5 w-3.5" /> Proposal Baru
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {proposalList.map((p) => (
            <div key={p.client} className="doq-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold truncate">{p.client}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusTone[p.status]}`}>{p.status}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{p.service}</p>
              <p className="mt-2 text-sm font-bold">{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[420px_1fr] items-start">
        {/* Form */}
        <div className="border-r border-border bg-card p-6 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto self-start">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold">Proposal Generator</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Isi data di bawah, AI akan generate proposal lengkap.
          </p>

          <div className="mt-6 space-y-4">
            <Input label="Nama Klien" value={data.klien} onChange={f("klien")} />
            <Input label="Nama Project" value={data.project} onChange={f("project")} />
            <Input label="Jenis Layanan" value={data.service} onChange={f("service")} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Budget (Rp)" value={data.budget} onChange={f("budget")} />
              <Input label="Timeline" value={data.timeline} onChange={f("timeline")} />
            </div>
            <Textarea label="CTA Penawaran" value={data.cta} onChange={f("cta")} />

            <div>
              <label className="text-xs font-medium">Tone Proposal</label>
              <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                {["Profesional", "Friendly", "Corporate"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`text-xs py-1.5 rounded-md border transition-colors ${
                      tone === t
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <button
              onClick={() => { setGenerating(true); setTimeout(() => setGenerating(false), 1800); }}
              className="w-full h-10 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:brightness-95 inline-flex items-center justify-center gap-2"
            >
              <Wand2 className="h-4 w-4" />
              {generating ? "AI sedang menulis…" : "Generate Proposal"}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="h-9 rounded-lg border border-border text-xs font-medium hover:bg-muted inline-flex items-center justify-center gap-1.5">
                <Save className="h-3.5 w-3.5" /> Simpan template
              </button>
              <button className="h-9 rounded-lg border border-border text-xs font-medium hover:bg-muted inline-flex items-center justify-center gap-1.5">
                <Download className="h-3.5 w-3.5" /> Export PDF
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-accent-soft p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-accent">
              <Sparkles className="h-3 w-3" /> AI Suggestion
            </div>
            <p className="mt-1 text-xs text-foreground/80">
              Tambahkan studi kasus klien sebelumnya di scope agar credibility naik 30%.
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-background p-6 lg:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">Preview · A4</span>
              {generating && (
                <span className="inline-flex items-center gap-2 text-xs text-accent">
                  <span className="doq-typing"><span /><span /><span /></span>
                  AI sedang menyusun
                </span>
              )}
            </div>

            <article className="doq-card p-10 space-y-6">
              <header className="border-b border-border pb-6">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Proposal</p>
                <h1 className="mt-2 text-3xl font-bold leading-tight">{data.project}</h1>
                <p className="text-sm text-muted-foreground mt-1">Disiapkan untuk {data.klien}</p>
              </header>

              <p className="text-sm leading-relaxed">
                Halo {data.klien},
              </p>
              <p className="text-sm leading-relaxed">
                Terima kasih telah mempercayakan kebutuhan digital Anda kepada CEPAT PRO Studio.
              </p>
              <p className="text-sm leading-relaxed">
                Kami menawarkan layanan {data.service} modern dengan fitur:
              </p>
              <ul className="space-y-2 text-sm">
                {["Responsive Design", "WhatsApp Integration", "SEO Friendly", "Admin Dashboard"].map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/60 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Estimasi pengerjaan</p>
                  <p className="mt-1 text-xl font-bold">{data.timeline}</p>
                </div>
                <div className="rounded-xl bg-muted/60 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Total investasi</p>
                  <p className="mt-1 text-xl font-bold">Rp{data.budget}</p>
                </div>
              </div>

              <div className="rounded-xl bg-accent-soft p-4 text-sm">
                <span className="font-semibold text-accent">CTA: </span>{data.cta}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-medium">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full h-9 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-medium">{label}</span>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-accent resize-none"
      />
    </label>
  );
}
