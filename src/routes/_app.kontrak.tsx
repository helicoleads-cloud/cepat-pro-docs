import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  FileSignature,
  Download,
  Briefcase,
  Shield,
  Store,
  Users,
  Search,
  Plus,
  Eye,
  Save,
  Sparkles,
  Check,
  Copy,
  Share2,
  Archive,
  BookmarkPlus,
  ChevronRight,
  Settings2,
  FileText,
  CircleDollarSign,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/_app/kontrak")({
  component: KontrakPage,
});

const filters = ["Semua", "Freelancer", "Legal", "Agency", "Vendor", "Custom"] as const;

const templates = [
  { name: "Freelance Agreement", category: "Freelancer", purpose: "Kontrak kerja freelance, scope & pembayaran.", icon: Users },
  { name: "NDA Agreement", category: "Legal", purpose: "Perjanjian kerahasiaan data & informasi.", icon: Shield },
  { name: "Vendor Contract", category: "Vendor", purpose: "Pengadaan barang/jasa dari vendor.", icon: Store },
  { name: "Project Agreement", category: "Agency", purpose: "Kontrak project agency dengan milestone.", icon: Briefcase },
];

const clauseOptions = [
  { key: "nda", label: "Tambahkan NDA Clause" },
  { key: "revision", label: "Add Revision Limit" },
  { key: "latefee", label: "Add Late Payment Fee" },
  { key: "ownership", label: "Include Ownership Transfer" },
  { key: "confidential", label: "Include Confidentiality" },
  { key: "renewal", label: "Add Auto Renewal" },
  { key: "custom", label: "Custom Clause" },
];

type Form = {
  client: string;
  project: string;
  value: string;
  timeline: string;
  scope: string;
  payment: string;
  notes: string;
};

function KontrakPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Semua");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>({
    client: "PT Sinar Abadi",
    project: "Website Development",
    value: "15000000",
    timeline: "30 hari kerja",
    scope: "Desain UI, frontend, integrasi CMS, dan deploy ke produksi.",
    payment: "DP 50% / Progress 30% / Final 20%",
    notes: "",
  });
  const [clauses, setClauses] = useState<Record<string, boolean>>({
    nda: true,
    confidential: true,
    revision: false,
    latefee: false,
    ownership: false,
    renewal: false,
    custom: false,
  });
  const [milestones, setMilestones] = useState([
    { label: "DP", pct: 50 },
    { label: "Progress", pct: 30 },
    { label: "Final", pct: 20 },
  ]);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const okFilter = filter === "Semua" || t.category === filter;
      const okSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
      return okFilter && okSearch;
    });
  }, [filter, search]);

  const stepDone = {
    1: true,
    2: form.client.length > 0 && form.project.length > 0,
    3: Object.values(clauses).some(Boolean),
    4: false,
  } as const;

  const update = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggleClause = (k: string) => setClauses((c) => ({ ...c, [k]: !c[k] }));
  const updateMilestone = (i: number, pct: number) =>
    setMilestones((m) => m.map((x, idx) => (idx === i ? { ...x, pct } : x)));

  const currency = (v: string) => {
    const n = Number(v || 0);
    return new Intl.NumberFormat("id-ID").format(n);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] min-h-0">
      {/* Sticky Top Generator Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border shrink-0">
        <div className="px-4 lg:px-6 py-3 flex items-center gap-3 flex-wrap">
          <div className="min-w-0">
            <h1 className="text-base font-semibold tracking-tight leading-none">Kontrak</h1>
            <p className="text-xs text-muted-foreground mt-1.5">Buat kontrak profesional dalam beberapa langkah.</p>
          </div>

          <div className="ml-auto flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari template…"
                className="h-9 w-56 rounded-full border border-input bg-card pl-9 pr-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 h-9 text-xs font-semibold hover:brightness-95">
              <Plus className="h-3.5 w-3.5" /> Generate Kontrak
            </button>
          </div>
        </div>
        <div className="px-4 lg:px-6 pb-3 flex items-center gap-2 overflow-x-auto doq-scroll">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 h-7 px-3 rounded-full text-[11px] font-medium border transition-colors ${
                filter === f
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Horizontal stepper — scrolls on small screens */}
        <div className="border-t border-border px-4 lg:px-6 py-2.5 overflow-x-auto doq-scroll">
          <ol className="flex items-center gap-2 text-[11px] min-w-max">
            {[
              { n: 1, label: "Pilih Template" },
              { n: 2, label: "Isi Informasi" },
              { n: 3, label: "Opsi Kontrak" },
              { n: 4, label: "Generate" },
            ].map((s, i, arr) => {
              const done = stepDone[s.n as 1 | 2 | 3 | 4];
              const current = step === s.n;
              return (
                <li key={s.n} className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setStep(s.n)}
                    className={`flex items-center gap-2 h-8 px-3 rounded-full border whitespace-nowrap transition-colors ${
                      current
                        ? "border-primary text-foreground bg-accent-soft"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 shrink-0 grid place-items-center rounded-full text-[10px] font-bold ${
                        done ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      {done ? <Check className="h-2.5 w-2.5" /> : s.n}
                    </span>
                    <span className="text-[11px] font-medium leading-none">{s.label}</span>
                  </button>
                  {i < arr.length - 1 && <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />}
                </li>
              );
            })}
          </ol>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex-1 min-h-0 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] [grid-template-rows:minmax(0,1fr)]">
        {/* LEFT — Setup Wizard */}
        <div className="border-r border-border overflow-y-auto doq-scroll p-4 lg:p-6 space-y-5 min-h-0">
          {/* Step 1 — Template */}
          <section className="doq-card p-4">
            <SectionTitle n={1} title="Pilih Template" />
            <div className="mt-3 grid sm:grid-cols-2 gap-2">
              {filtered.map((t) => {
                const i = templates.indexOf(t);
                const selected = active === i;
                return (
                  <button
                    key={t.name}
                    onClick={() => setActive(i)}
                    className={`text-left rounded-lg border p-3 transition-colors ${
                      selected
                        ? "border-primary bg-accent-soft"
                        : "border-border bg-card hover:border-foreground/30"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`h-9 w-9 aspect-square shrink-0 rounded-md grid place-items-center ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                        <t.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-xs font-semibold truncate">{t.name}</h3>
                          {selected && <Check className="h-3 w-3 shrink-0 text-primary" />}
                        </div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{t.category}</p>
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{t.purpose}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-xs text-muted-foreground col-span-full py-6 text-center">Tidak ada template yang cocok.</p>
              )}
            </div>
          </section>

          {/* Step 2 — Info */}
          <section className="doq-card p-4">
            <SectionTitle n={2} title="Isi Informasi" />
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <Field label="Nama Klien" value={form.client} onChange={(v) => update("client", v)} />
              <Field label="Nama Project" value={form.project} onChange={(v) => update("project", v)} />
              <Field label="Nilai Kontrak (Rp)" value={form.value} onChange={(v) => update("value", v.replace(/\D/g, ""))} prefix="Rp" />
              <Field label="Timeline" value={form.timeline} onChange={(v) => update("timeline", v)} />
              <Field label="Payment Terms" value={form.payment} onChange={(v) => update("payment", v)} className="sm:col-span-2" />
              <Field label="Scope Pekerjaan" value={form.scope} onChange={(v) => update("scope", v)} textarea className="sm:col-span-2" />
              <Field label="Notes Tambahan" value={form.notes} onChange={(v) => update("notes", v)} textarea placeholder="Opsional…" className="sm:col-span-2" />
            </div>

            {/* Payment Milestones inline */}
            <div className="mt-4 rounded-lg border border-border p-3">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-3.5 w-3.5 text-primary" />
                <h4 className="text-xs font-semibold">Payment Structure</h4>
                <span className="ml-auto text-[10px] text-muted-foreground">
                  Total {milestones.reduce((a, b) => a + b.pct, 0)}%
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {milestones.map((m, i) => (
                  <div key={m.label} className="rounded-md border border-border p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium">{m.label}</span>
                      <input
                        type="number"
                        value={m.pct}
                        onChange={(e) => updateMilestone(i, Number(e.target.value || 0))}
                        className="w-12 h-6 rounded border border-input bg-card text-[11px] text-right px-1 focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                    <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${Math.min(m.pct, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Step 3 — Opsi */}
          <section className="doq-card p-4">
            <SectionTitle n={3} title="Opsi Kontrak" hint="Aktifkan klausa tambahan untuk memperkuat kontrak." />
            <div className="mt-3 grid sm:grid-cols-2 gap-2">
              {clauseOptions.map((c) => {
                const on = clauses[c.key];
                return (
                  <label
                    key={c.key}
                    className={`flex items-center justify-between gap-2 rounded-lg border p-2.5 cursor-pointer transition-colors ${
                      on ? "border-primary bg-accent-soft" : "border-border bg-card hover:border-foreground/30"
                    }`}
                  >
                    <span className="text-xs font-medium">{c.label}</span>
                    <span
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        on ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-background transition-transform ${
                          on ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </span>
                    <input type="checkbox" checked={on} onChange={() => toggleClause(c.key)} className="sr-only" />
                  </label>
                );
              })}
            </div>
          </section>

          {/* Step 4 — Generate */}
          <section className="doq-card p-4">
            <SectionTitle n={4} title="Generate Kontrak" hint="Pilih aksi akhir untuk kontrak Anda." />
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <ActionBtn icon={Eye} label="Preview" />
              <ActionBtn icon={Save} label="Simpan Draft" />
              <ActionBtn icon={Sparkles} label="Generate Final" primary />
              <ActionBtn icon={Download} label="Export PDF" />
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Auto-saved beberapa detik lalu
            </p>
          </section>
        </div>

        {/* RIGHT — Live Preview */}
        <div className="bg-surface overflow-y-auto doq-scroll p-4 lg:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Live Preview</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconBtn icon={Copy} title="Duplicate" />
              <IconBtn icon={BookmarkPlus} title="Save as Template" />
              <IconBtn icon={Share2} title="Share" />
              <IconBtn icon={Download} title="Download" />
              <IconBtn icon={Archive} title="Archive" />
            </div>
          </div>

          <article className="doq-card p-6 lg:p-10 max-w-[760px] mx-auto space-y-5">
            <header className="border-b border-border pb-5">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Kontrak</p>
              <h2 className="mt-2 text-xl lg:text-2xl font-bold leading-tight">{templates[active].name}</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Antara <Placeholder>CEPAT PRO Studio</Placeholder> dan <Placeholder>{form.client || "—"}</Placeholder>
              </p>
            </header>

            <section className="space-y-3 text-sm leading-relaxed">
              <Clause n="1" title="Lingkup Pekerjaan">
                PIHAK PERTAMA memberikan pekerjaan kepada PIHAK KEDUA untuk mengerjakan
                project <Placeholder>{form.project || "—"}</Placeholder>.
                {form.scope && <> Scope: <span className="text-foreground">{form.scope}</span></>}
              </Clause>

              <Clause n="2" title="Nilai & Timeline">
                Nilai project sebesar <Placeholder>Rp{currency(form.value)}</Placeholder> dengan
                timeline <Placeholder>{form.timeline || "—"}</Placeholder>.
              </Clause>

              <Clause n="3" title="Pembayaran">
                Pembayaran dilakukan bertahap sesuai struktur berikut:
                <ul className="mt-1.5 space-y-1 pl-4 text-foreground/80">
                  {milestones.map((m) => (
                    <li key={m.label}>• {m.label} {m.pct}%</li>
                  ))}
                </ul>
              </Clause>

              {clauses.nda && (
                <Clause n="4" title="NDA Clause">
                  Kedua belah pihak setuju menjaga kerahasiaan seluruh informasi yang dipertukarkan selama dan setelah kontrak berlangsung.
                </Clause>
              )}
              {clauses.confidential && (
                <Clause n="5" title="Confidentiality">
                  Informasi rahasia tidak boleh dibagikan kepada pihak ketiga tanpa persetujuan tertulis.
                </Clause>
              )}
              {clauses.revision && (
                <Clause n="6" title="Revision Limit">
                  Jumlah revisi yang disepakati adalah maksimal 3 (tiga) kali per deliverable.
                </Clause>
              )}
              {clauses.latefee && (
                <Clause n="7" title="Late Payment Fee">
                  Keterlambatan pembayaran dikenakan denda 1% per hari dari nilai outstanding.
                </Clause>
              )}
              {clauses.ownership && (
                <Clause n="8" title="Ownership Transfer">
                  Hak kekayaan intelektual atas deliverable berpindah ke PIHAK PERTAMA setelah pelunasan.
                </Clause>
              )}
              {clauses.renewal && (
                <Clause n="9" title="Auto Renewal">
                  Kontrak diperpanjang otomatis setiap 12 bulan kecuali ada pemberitahuan tertulis 30 hari sebelumnya.
                </Clause>
              )}
              {clauses.custom && (
                <Clause n="10" title="Custom Clause">
                  <span className="italic text-muted-foreground">Tambahkan klausa kustom Anda di sini…</span>
                </Clause>
              )}

              {form.notes && (
                <Clause n="*" title="Catatan Tambahan">
                  {form.notes}
                </Clause>
              )}
            </section>

            <footer className="border-t border-border pt-6 grid grid-cols-2 gap-8">
              <div>
                <p className="text-[11px] text-muted-foreground">PIHAK PERTAMA</p>
                <div className="mt-10 border-t border-border pt-2 text-xs font-medium">CEPAT PRO Studio</div>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">PIHAK KEDUA</p>
                <div className="mt-10 border-t border-border pt-2 text-xs font-medium">{form.client || "Klien"}</div>
              </div>
            </footer>
          </article>
        </div>
      </div>

      {/* Bottom Utility Bar */}
      <div className="border-t border-border bg-card/95 backdrop-blur px-4 lg:px-6 h-12 flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">{templates[active].name}</span>
          <span>•</span>
          <span>{Object.values(clauses).filter(Boolean).length} klausa aktif</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <UtilBtn icon={Copy} label="Duplicate" />
          <UtilBtn icon={BookmarkPlus} label="Save as Template" />
          <UtilBtn icon={Share2} label="Share" />
          <UtilBtn icon={Download} label="Download" />
          <UtilBtn icon={Archive} label="Archive" />
          <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold hover:brightness-95">
            <Sparkles className="h-3.5 w-3.5" /> Generate Final
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ n, title, hint }: { n: number; title: string; hint?: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-muted-foreground tracking-widest">STEP {n}</span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {hint && <p className="text-[11px] text-muted-foreground max-w-[60%] text-right">{hint}</p>}
    </div>
  );
}

function Field({
  label, value, onChange, textarea, prefix, placeholder, className = "",
}: {
  label: string; value: string; onChange: (v: string) => void;
  textarea?: boolean; prefix?: string; placeholder?: string; className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      <div className="mt-1 relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{prefix}</span>
        )}
        {textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full h-9 rounded-md border border-input bg-card text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring ${
              prefix ? "pl-8 pr-3" : "px-3"
            }`}
          />
        )}
      </div>
    </label>
  );
}

function ActionBtn({ icon: Icon, label, primary }: { icon: typeof Eye; label: string; primary?: boolean }) {
  return (
    <button
      className={`inline-flex flex-col items-center justify-center gap-1.5 h-16 rounded-lg border transition-colors text-[11px] font-medium ${
        primary
          ? "bg-primary text-primary-foreground border-primary hover:brightness-95"
          : "bg-card text-foreground border-border hover:border-foreground/30"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function IconBtn({ icon: Icon, title }: { icon: typeof Eye; title: string }) {
  return (
    <button
      title={title}
      className="h-7 w-7 grid place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

function UtilBtn({ icon: Icon, label }: { icon: typeof Eye; label: string }) {
  return (
    <button className="hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-semibold text-foreground bg-accent-soft px-1 rounded">{children}</span>
  );
}

function Clause({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-bold tracking-wide text-foreground">PASAL {n} — {title.toUpperCase()}</h4>
      <p className="mt-1 text-sm text-foreground/80 leading-relaxed">{children}</p>
    </div>
  );
}

// Suppress unused warning for Settings2 import (kept for future use)
void Settings2;
void FileSignature;
