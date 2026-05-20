import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Copy,
  Download,
  MoreHorizontal,
  Headphones,
  Wallet,
  TrendingUp,
  Share2,
  Boxes,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Check,
  Clock,
  Layers,
  RotateCcw,
  CheckCheck,
  BookmarkPlus,
  Printer,
  Archive,
  FileText,
  AlertTriangle,
  Paperclip,
  History,
  User,
  Building2,
  Calendar,
  GitBranch,
  Link2,
} from "lucide-react";

export const Route = createFileRoute("/_app/sop")({
  component: SopPage,
});

type Step = {
  title: string;
  instruction: string;
  note?: string;
  warning?: string;
  examples?: string[];
  attachments?: string[];
};

type Sop = {
  name: string;
  purpose: string;
  updated: string;
  duration: string;
  steps: Step[];
  meta: { owner: string; department: string; created: string; revision: string; version: string };
  related: string[];
};

const categories: { name: string; icon: typeof Headphones; sops: Sop[] }[] = [
  {
    name: "Customer Service",
    icon: Headphones,
    sops: [
      {
        name: "Respon Customer Chat",
        purpose: "Standar respon awal customer di channel chat.",
        updated: "2 hari lalu",
        duration: "~10 menit",
        steps: [
          {
            title: "Balas chat maksimal 5 menit",
            instruction: "Pastikan semua chat masuk mendapat respon awal dalam 5 menit kerja.",
            note: "Berlaku jam 08.00–17.00 WIB.",
            warning: "Lewat batas → eskalasi ke supervisor.",
          },
          {
            title: "Gunakan template greeting resmi",
            instruction: "Sapa customer dengan template approved dari brand guideline.",
            examples: ["Halo, Kak {nama}! Selamat datang di CEPAT PRO 👋"],
            attachments: ["Greeting Template.docx"],
          },
          {
            title: "Identifikasi kebutuhan customer",
            instruction: "Ajukan 2–3 pertanyaan klarifikasi untuk memahami kebutuhan.",
          },
          {
            title: "Input lead ke CRM",
            instruction: "Catat semua lead potensial ke CRM dengan tag sumber chat.",
            attachments: ["CRM Lead Form.xlsx"],
          },
          {
            title: "Follow up maksimal H+1",
            instruction: "Lakukan follow up paling lambat 1 hari setelah chat pertama.",
          },
        ],
        meta: { owner: "Tim CS", department: "Customer Service", created: "12 Jan 2025", revision: "18 Mei 2026", version: "v1.4" },
        related: ["Complaint Handling", "Refund Flow", "Lead Follow Up"],
      },
    ],
  },
  { name: "Admin Finance", icon: Wallet, sops: [] },
  { name: "Sales", icon: TrendingUp, sops: [] },
  { name: "Social Media", icon: Share2, sops: [] },
  { name: "Warehouse", icon: Boxes, sops: [] },
  { name: "HR Recruitment", icon: UserPlus, sops: [] },
];

// Fill empty categories with a default SOP for demo
categories.forEach((c) => {
  if (c.sops.length === 0) {
    c.sops.push({
      name: `SOP Umum ${c.name}`,
      purpose: `Prosedur standar operasional tim ${c.name}.`,
      updated: "minggu lalu",
      duration: "~15 menit",
      steps: [
        { title: "Persiapan", instruction: "Siapkan dokumen, tools, dan akses yang dibutuhkan." },
        { title: "Eksekusi", instruction: "Jalankan langkah inti sesuai checklist." },
        { title: "Validasi", instruction: "Cek hasil terhadap standar mutu." },
        { title: "Dokumentasi", instruction: "Simpan log & laporan ke folder yang ditentukan." },
      ],
      meta: { owner: c.name, department: c.name, created: "01 Feb 2025", revision: "10 Mei 2026", version: "v1.0" },
      related: ["Onboarding", "Quality Check"],
    });
  }
});

const sopCounts = [3, 5, 4, 6, 2, 4];

function SopPage() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeSop] = useState(0);
  const [search, setSearch] = useState("");
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true });

  const sop = categories[activeCat].sops[activeSop];
  const total = sop.steps.length;
  const completed = Object.values(done).filter(Boolean).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  const status = completed === 0 ? "Not started" : completed === total ? "Completed" : "In progress";

  const visibleCats = useMemo(
    () => categories.filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const toggle = (i: number) => setDone((d) => ({ ...d, [i]: !d[i] }));
  const toggleExpand = (i: number) => setExpanded((e) => ({ ...e, [i]: !e[i] }));
  const markAll = () => setDone(Object.fromEntries(sop.steps.map((_, i) => [i, true])));
  const reset = () => setDone({});

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-4 lg:px-6 py-3 flex items-center gap-3 flex-wrap">
          <div className="min-w-0">
            <h1 className="text-base font-semibold tracking-tight leading-none">SOP Workspace</h1>
            <p className="text-xs text-muted-foreground mt-1">Kelola dan jalankan SOP secara cepat dan terstruktur.</p>
          </div>

          <div className="flex-1 max-w-md mx-auto relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search SOP, kategori, langkah, atau keyword…"
              className="w-full h-9 rounded-full border border-input bg-card pl-9 pr-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <HeaderBtn icon={Copy} label="Duplicate" />
            <HeaderBtn icon={Download} label="Export" />
            <button className="h-9 w-9 grid place-items-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground" title="More">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 h-9 text-xs font-semibold hover:brightness-95">
              <Plus className="h-3.5 w-3.5" /> New SOP
            </button>
          </div>
        </div>
      </header>

      {/* 3-zone workspace */}
      <div className="flex-1 min-h-0 grid lg:grid-cols-[240px_minmax(0,1fr)_280px]">
        {/* LEFT — Navigation */}
        <aside className="border-r border-border bg-card overflow-y-auto doq-scroll p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-bold tracking-widest text-muted-foreground">SOP CATEGORIES</h2>
            <span className="text-[10px] text-muted-foreground">{categories.length}</span>
          </div>
          <nav className="mt-3 space-y-0.5">
            {visibleCats.map((c) => {
              const i = categories.indexOf(c);
              const active = activeCat === i;
              const Icon = c.icon;
              return (
                <button
                  key={c.name}
                  onClick={() => setActiveCat(i)}
                  className={`group w-full flex items-center gap-2.5 px-2.5 h-9 rounded-md text-xs transition-colors ${
                    active
                      ? "bg-accent-soft text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${active ? "text-primary" : ""}`} />
                  <span className="truncate flex-1 text-left">{c.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {sopCounts[i]}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6">
            <h3 className="text-[10px] font-bold tracking-widest text-muted-foreground">RECENT</h3>
            <ul className="mt-2 space-y-0.5">
              {["Refund Flow", "Onboarding Klien", "Posting Schedule"].map((r) => (
                <li key={r}>
                  <button className="w-full flex items-center gap-2 px-2.5 h-8 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <FileText className="h-3 w-3" />
                    <span className="truncate">{r}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* CENTER — Workspace */}
        <main className="overflow-y-auto doq-scroll bg-surface">
          <div className="max-w-3xl mx-auto p-4 lg:p-8">
            {/* Title block */}
            <div className="doq-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{categories[activeCat].name}</p>
                  <h2 className="mt-1 text-xl font-bold tracking-tight">{sop.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{sop.purpose}</p>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full border ${
                    status === "Completed"
                      ? "bg-primary text-primary-foreground border-primary"
                      : status === "In progress"
                        ? "bg-accent-soft text-foreground border-primary/40"
                        : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4 flex-wrap text-[11px] text-muted-foreground">
                <Meta icon={Clock} label="Last updated" value={sop.updated} />
                <Meta icon={Layers} label="Steps" value={String(total)} />
                <Meta icon={Clock} label="Estimasi" value={sop.duration} />
                <div className="ml-auto flex items-center gap-2">
                  <span>{completed}/{total} selesai</span>
                  <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <ol className="mt-5 space-y-2.5">
              {sop.steps.map((s, i) => {
                const isDone = !!done[i];
                const isOpen = !!expanded[i];
                return (
                  <li key={i} className="doq-card overflow-hidden">
                    <div className="flex items-start gap-3 p-3.5">
                      <button
                        onClick={() => toggle(i)}
                        className={`mt-0.5 h-5 w-5 shrink-0 rounded-md border grid place-items-center transition-colors ${
                          isDone
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-card border-border hover:border-foreground/40"
                        }`}
                        aria-label="Toggle complete"
                      >
                        {isDone && <Check className="h-3 w-3" />}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-muted-foreground tracking-widest">STEP {i + 1}</span>
                          <h3 className={`text-sm font-semibold ${isDone ? "line-through text-muted-foreground" : ""}`}>
                            {s.title}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{s.instruction}</p>
                        {s.note && !isOpen && (
                          <p className="text-[11px] text-muted-foreground/80 mt-1.5 italic">Catatan: {s.note}</p>
                        )}
                      </div>

                      <button
                        onClick={() => toggleExpand(i)}
                        className="shrink-0 h-7 w-7 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        aria-label="Expand"
                      >
                        {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="border-t border-border bg-muted/40 px-3.5 py-3 space-y-3">
                        {s.note && (
                          <Detail icon={FileText} title="Note">{s.note}</Detail>
                        )}
                        {s.warning && (
                          <Detail icon={AlertTriangle} title="Warning" warn>{s.warning}</Detail>
                        )}
                        {s.examples && s.examples.length > 0 && (
                          <Detail icon={FileText} title="Contoh">
                            <ul className="space-y-1">
                              {s.examples.map((ex) => (
                                <li key={ex} className="rounded border border-border bg-card px-2 py-1.5 text-xs">{ex}</li>
                              ))}
                            </ul>
                          </Detail>
                        )}
                        {s.attachments && s.attachments.length > 0 && (
                          <Detail icon={Paperclip} title="Attached">
                            <div className="flex flex-wrap gap-1.5">
                              {s.attachments.map((a) => (
                                <button key={a} className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-border bg-card text-[11px] hover:border-foreground/30">
                                  <Paperclip className="h-3 w-3" /> {a}
                                </button>
                              ))}
                            </div>
                          </Detail>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>

            {/* Related SOP */}
            <section className="mt-6 doq-card p-4">
              <div className="flex items-center gap-2">
                <Link2 className="h-3.5 w-3.5 text-primary" />
                <h3 className="text-xs font-semibold">Related SOP</h3>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {sop.related.map((r) => (
                  <button key={r} className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-border bg-card text-[11px] hover:border-foreground/30">
                    <FileText className="h-3 w-3" /> {r}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* RIGHT — Utility / Progress */}
        <aside className="border-l border-border bg-card overflow-y-auto doq-scroll p-4 space-y-4">
          {/* Progress */}
          <section>
            <h3 className="text-[10px] font-bold tracking-widest text-muted-foreground">PROGRESS</h3>
            <div className="mt-2 rounded-lg border border-border p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight">{completed}<span className="text-muted-foreground text-sm font-normal">/{total}</span></span>
                <span className="text-[11px] text-muted-foreground">{pct}%</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">{status}</p>
            </div>
          </section>

          {/* Quick actions */}
          <section>
            <h3 className="text-[10px] font-bold tracking-widest text-muted-foreground">QUICK ACTIONS</h3>
            <div className="mt-2 space-y-1">
              <QuickAction icon={CheckCheck} label="Mark all complete" onClick={markAll} primary />
              <QuickAction icon={RotateCcw} label="Reset progress" onClick={reset} />
              <QuickAction icon={BookmarkPlus} label="Save as template" />
              <QuickAction icon={Share2} label="Share SOP" />
              <QuickAction icon={Printer} label="Print SOP" />
              <QuickAction icon={Archive} label="Archive SOP" />
            </div>
          </section>

          {/* Metadata */}
          <section>
            <h3 className="text-[10px] font-bold tracking-widest text-muted-foreground">METADATA</h3>
            <dl className="mt-2 space-y-2 text-[11px]">
              <MetaRow icon={User} label="Owner" value={sop.meta.owner} />
              <MetaRow icon={Building2} label="Department" value={sop.meta.department} />
              <MetaRow icon={Calendar} label="Created" value={sop.meta.created} />
              <MetaRow icon={History} label="Last revision" value={sop.meta.revision} />
              <MetaRow icon={GitBranch} label="Version" value={sop.meta.version} />
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}

function HeaderBtn({ icon: Icon, label }: { icon: typeof Copy; label: string }) {
  return (
    <button className="hidden md:inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-border bg-card text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

function Meta({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-3 w-3" />
      <span className="text-muted-foreground">{label}:</span>
      <span className="text-foreground font-medium">{value}</span>
    </span>
  );
}

function Detail({ icon: Icon, title, children, warn }: { icon: typeof FileText; title: string; children: React.ReactNode; warn?: boolean }) {
  return (
    <div>
      <div className={`flex items-center gap-1.5 text-[10px] font-bold tracking-widest ${warn ? "text-destructive" : "text-muted-foreground"}`}>
        <Icon className="h-3 w-3" /> {title.toUpperCase()}
      </div>
      <div className={`mt-1 text-xs ${warn ? "text-destructive" : "text-foreground/80"}`}>{children}</div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, onClick, primary }: { icon: typeof CheckCheck; label: string; onClick?: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-2.5 h-8 rounded-md text-xs transition-colors ${
        primary
          ? "bg-accent-soft text-foreground font-semibold hover:bg-accent-soft/80"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function MetaRow({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3 w-3 text-muted-foreground" />
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="ml-auto font-medium text-foreground">{value}</dd>
    </div>
  );
}
