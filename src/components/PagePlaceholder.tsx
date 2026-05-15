import { LucideIcon, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function PagePlaceholder({
  icon: Icon, title, subtitle, features, ctaTo,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  features: string[];
  ctaTo?: string;
}) {
  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">
      <div className="doq-card p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute inset-0 doq-grid-bg opacity-40 pointer-events-none" />
        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft text-accent px-2.5 py-1 text-[11px] font-semibold">
              <Sparkles className="h-3 w-3" /> Tersedia minggu ini
            </div>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight">{title}</h1>
            <p className="mt-3 text-muted-foreground max-w-md">{subtitle}</p>
            <ul className="mt-6 space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {ctaTo && (
              <Link to={ctaTo} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90">
                Coba sekarang <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-foreground text-background grid place-items-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="h-2.5 w-32 bg-foreground/80 rounded-full" />
                  <div className="mt-2 h-2 w-44 bg-muted rounded-full" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[0,1,2].map(i => (
                  <div key={i} className="h-16 rounded-lg bg-muted" />
                ))}
              </div>
              <div className="mt-3 space-y-2">
                <div className="h-2 w-full bg-muted rounded-full" />
                <div className="h-2 w-5/6 bg-muted rounded-full" />
                <div className="h-2 w-4/6 bg-muted rounded-full" />
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-accent">
                  <span className="doq-typing"><span /><span /><span /></span> AI menyiapkan
                </span>
                <div className="h-7 w-20 rounded-md bg-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
