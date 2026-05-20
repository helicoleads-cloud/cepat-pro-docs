import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText, FileSignature, ListChecks, MessageCircle,
  ArrowUpRight, Sparkles, CheckCircle2,
  ArrowRight, Plus, Briefcase, ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardHome,
});

function DashboardHome() {
  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Selamat siang,</p>
          <h1 className="text-2xl font-bold tracking-tight">Rizky Aditya 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Lanjutkan workflow kemarin atau mulai dokumen baru di bawah.
          </p>
        </div>
        <Link to="/proposal" className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90">
          <Plus className="h-4 w-4" /> Generate Baru
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Metric icon={FileText} label="Total Dokumen" value="128" delta="+12%" tone="up" />
        <Metric icon={Briefcase} label="Proposal Dibuat" value="54" delta="+8%" tone="up" />
        <Metric icon={ShieldCheck} label="Kontrak Aktif" value="21" delta="+3%" tone="up" />
        <Metric icon={Sparkles} label="AI Credits" value="840" delta="-10%" tone="down" />
      </div>

      {/* Quick generate */}
      <section>
        <SectionHeader title="Quick Generate" subtitle="Mulai dokumen dalam satu klik" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickCard to="/proposal" icon={FileText} title="Proposal Baru" desc="Cover, scope, pricing, timeline" tag="Paling sering" />
          <QuickCard to="/kontrak" icon={FileSignature} title="Kontrak" desc="PKS, NDA, SPK, Freelance" />
          <QuickCard to="/sop" icon={ListChecks} title="SOP" desc="Onboarding, kasir, CS" />
          <QuickCard to="/whatsapp" icon={MessageCircle} title="Konten WA" desc="30 hari caption + CTA" tag="Baru" />
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2 doq-card p-5">
          <SectionHeader title="Aktivitas Terbaru" subtitle="" inline />
          <div className="mt-4 divide-y divide-border">
            {recent.map((r) => (
              <div key={r.title} className="py-3 flex items-center gap-3">
                <div className={`h-9 w-9 rounded-lg grid place-items-center ${r.iconBg}`}>
                  <r.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.meta}</div>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${r.statusClass}`}>{r.status}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-6">
          <div className="doq-card p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold">Saran AI Hari Ini</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Klien <span className="text-foreground font-medium">PT Maju Bersama</span> belum menerima proposal selama 5 hari. Kirim follow-up via WhatsApp?
            </p>
            <button className="mt-4 w-full rounded-lg bg-accent-soft text-accent text-xs font-semibold py-2 hover:brightness-95">
              Kirim Follow-up Otomatis
            </button>
          </div>

          <div className="doq-card p-5">
            <h3 className="text-sm font-semibold">Profil Bisnis</h3>
            <p className="text-xs text-muted-foreground mt-1">Lengkapi untuk dokumen lebih akurat.</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Kelengkapan</span>
                <span className="font-semibold">65%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[65%] bg-foreground rounded-full" />
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-xs">
              <Check label="Nama bisnis & logo" done />
              <Check label="NPWP & alamat" done />
              <Check label="Rekening bank" />
              <Check label="Tanda tangan digital" />
            </ul>
            <Link to="/settings" className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline">
              Lengkapi sekarang <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, inline }: { title: string; subtitle?: string; inline?: boolean }) {
  return (
    <div className={inline ? "flex items-center justify-between" : "mb-3 flex items-center justify-between"}>
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, delta, tone, children }: any) {
  const toneClass =
    tone === "up" ? "text-success" :
    tone === "down" ? "text-destructive" :
    tone === "accent" ? "text-accent" : "text-muted-foreground";
  return (
    <div className="doq-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div className="mt-1 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
      </div>
      <p className={`text-[11px] mt-0.5 ${toneClass}`}>{delta}</p>
      {children}
    </div>
  );
}

function QuickCard({ to, icon: Icon, title, desc, tag }: any) {
  return (
    <Link to={to} className="group doq-card p-4 hover:border-foreground/30 transition-all relative">
      {tag && (
        <span className="absolute top-3 right-3 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-accent-soft text-accent">
          {tag}
        </span>
      )}
      <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center group-hover:bg-foreground group-hover:text-background transition-colors">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-foreground">
        Mulai <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function Check({ label, done }: { label: string; done?: boolean }) {
  return (
    <li className="flex items-center gap-2">
      {done ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
      ) : (
        <div className="h-3.5 w-3.5 rounded-full border border-border" />
      )}
      <span className={done ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </li>
  );
}

const recent = [
  { title: "Proposal Website Klinik Gigi", meta: "2 menit lalu", icon: FileText, iconBg: "bg-accent-soft text-accent", status: "Completed", statusClass: "bg-accent-soft text-accent" },
  { title: "Kontrak Freelance Design", meta: "15 menit lalu", icon: FileSignature, iconBg: "bg-muted text-foreground", status: "Draft", statusClass: "bg-muted text-muted-foreground" },
  { title: "SOP Admin CS", meta: "1 jam lalu", icon: ListChecks, iconBg: "bg-muted text-foreground", status: "Generated", statusClass: "bg-accent-soft text-accent" },
];
