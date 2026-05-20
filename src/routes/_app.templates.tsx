import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, FileSignature, ListChecks, Users, Sparkles, Search } from "lucide-react";

export const Route = createFileRoute("/_app/templates")({
  component: TemplatesPage,
});

const cats = ["Semua", "Proposal", "Kontrak", "Legal", "SOP", "Operations", "HR", "Retail", "Agency", "F&B", "Startup"];

const templates = [
  { title: "Proposal Website UMKM", cat: "Proposal", icon: FileText, used: 1540, premium: false },
  { title: "Kontrak Freelancer", cat: "Legal", icon: FileSignature, used: 1320, premium: false },
  { title: "SOP Customer Service", cat: "Operations", icon: ListChecks, used: 1185, premium: false },
  { title: "Proposal Agency Digital", cat: "Agency", icon: FileText, used: 1240, premium: false },
  { title: "PKS Freelance Designer", cat: "Kontrak", icon: FileSignature, used: 982, premium: false },
  { title: "SOP Onboarding F&B", cat: "F&B", icon: ListChecks, used: 642, premium: true },
  { title: "Proposal Event Organizer", cat: "Proposal", icon: FileText, used: 588, premium: false },
  { title: "Kontrak Vendor Retail", cat: "Retail", icon: FileSignature, used: 401, premium: true },
  { title: "Proposal Startup Pitch Deck", cat: "Startup", icon: FileText, used: 1102, premium: true },
  { title: "Kontrak HR Karyawan Tetap", cat: "HR", icon: FileSignature, used: 754, premium: false },
];

function TemplatesPage() {
  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Template Marketplace</h1>
          <p className="text-sm text-muted-foreground mt-1">
            120+ template bisnis Indonesia siap pakai. Edit, generate, kirim.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Cari template…"
            className="h-9 pl-9 pr-3 w-64 rounded-lg border border-border bg-card text-sm outline-none focus:border-foreground"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {cats.map((c, i) => (
          <button
            key={c}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
              i === 0
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((t) => (
          <Link key={t.title} to="/proposal" className="group doq-card overflow-hidden hover:border-foreground/30 transition-all">
            <div className="aspect-[4/3] bg-muted/50 doq-grid-bg relative">
              <div className="absolute inset-4 rounded-lg bg-card border border-border p-3 flex flex-col">
                <div className="h-2 w-12 bg-foreground rounded-full" />
                <div className="mt-2 h-2 w-20 bg-muted rounded-full" />
                <div className="mt-auto space-y-1.5">
                  <div className="h-1.5 w-full bg-muted rounded-full" />
                  <div className="h-1.5 w-4/5 bg-muted rounded-full" />
                  <div className="h-1.5 w-3/5 bg-muted rounded-full" />
                </div>
              </div>
              {t.premium && (
                <span className="absolute top-2 right-2 inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-foreground text-background">
                  <Sparkles className="h-2.5 w-2.5" /> Pro
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <t.icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{t.cat}</span>
              </div>
              <h3 className="mt-1 text-sm font-semibold leading-snug">{t.title}</h3>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
                <Users className="h-3 w-3" />
                {t.used.toLocaleString("id-ID")} kali dipakai
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
