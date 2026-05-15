import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Wand2, Download, Save, FileText } from "lucide-react";

export const Route = createFileRoute("/_app/proposal")({
  component: ProposalGenerator,
});

function ProposalGenerator() {
  const [data, setData] = useState({
    bisnis: "Studio Kanvas Digital",
    klien: "PT Maju Bersama",
    project: "Redesign Website Korporat",
    budget: "85.000.000",
    timeline: "8 minggu",
    deliverables: "Wireframe, UI Design, Frontend, CMS, Training",
  });
  const [tone, setTone] = useState("Profesional");
  const [generating, setGenerating] = useState(false);

  const f = (k: keyof typeof data) => (v: string) => setData({ ...data, [k]: v });

  return (
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
          <Input label="Nama bisnis" value={data.bisnis} onChange={f("bisnis")} />
          <Input label="Nama klien" value={data.klien} onChange={f("klien")} />
          <Input label="Scope project" value={data.project} onChange={f("project")} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Budget (Rp)" value={data.budget} onChange={f("budget")} />
            <Input label="Timeline" value={data.timeline} onChange={f("timeline")} />
          </div>
          <Textarea label="Deliverables" value={data.deliverables} onChange={f("deliverables")} />

          <div>
            <label className="text-xs font-medium">Tone proposal</label>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              {["Profesional", "Friendly", "Corporate"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`text-xs py-1.5 rounded-md border transition-colors ${
                    tone === t
                      ? "border-foreground bg-foreground text-background"
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
            className="w-full h-10 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 inline-flex items-center justify-center gap-2"
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

        <div className="mt-6 rounded-xl border border-border bg-accent-soft/40 p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-accent">
            <Sparkles className="h-3 w-3" /> AI Suggestion
          </div>
          <p className="mt-1 text-xs text-foreground/80">
            Tambahkan studi kasus klien sebelumnya di scope agar credibility naik 30%.
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-muted/40 p-6 lg:p-10 overflow-y-auto">
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

          <article className="doq-card p-10 space-y-8">
            <header className="flex items-start justify-between border-b border-border pb-6">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Proposal</p>
                <h1 className="mt-2 text-3xl font-bold leading-tight">{data.project}</h1>
                <p className="text-sm text-muted-foreground mt-1">Disiapkan untuk {data.klien}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <div className="font-semibold text-foreground">{data.bisnis}</div>
                <div>14 Mei 2026</div>
                <div>Doc #PRP-2026-018</div>
              </div>
            </header>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ringkasan Eksekutif</h2>
              <p className="mt-2 text-sm leading-relaxed">
                {data.bisnis} mengusulkan kerja sama untuk membangun ulang website
                korporat {data.klien} dengan fokus pada konversi, kecepatan, dan
                identitas brand modern. Proyek ini ditargetkan selesai dalam {data.timeline}
                {" "}dengan investasi total Rp {data.budget}.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Scope Pekerjaan</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {data.deliverables.split(",").map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{d.trim()}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-muted/60 p-4">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Investasi</p>
                <p className="mt-1 text-xl font-bold">Rp {data.budget}</p>
              </div>
              <div className="rounded-xl bg-muted/60 p-4">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Timeline</p>
                <p className="mt-1 text-xl font-bold">{data.timeline}</p>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Timeline Project</h2>
              <div className="mt-3 space-y-2.5">
                {[
                  ["Minggu 1–2", "Discovery & wireframe"],
                  ["Minggu 3–5", "Visual design & prototype"],
                  ["Minggu 6–7", "Frontend & CMS integration"],
                  ["Minggu 8", "QA, training, go-live"],
                ].map(([w, t]) => (
                  <div key={w} className="flex gap-4 text-sm">
                    <div className="w-28 text-muted-foreground">{w}</div>
                    <div className="flex-1">{t}</div>
                  </div>
                ))}
              </div>
            </section>

            <footer className="border-t border-border pt-6 grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-muted-foreground">Disetujui oleh</p>
                <div className="mt-8 border-t border-border pt-2 text-xs">{data.klien}</div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hormat kami</p>
                <div className="mt-8 border-t border-border pt-2 text-xs">{data.bisnis}</div>
              </div>
            </footer>
          </article>
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
        className="mt-1 w-full h-9 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:border-foreground"
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
        className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-foreground resize-none"
      />
    </label>
  );
}
