import { Bell, Search, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AppTopbar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 backdrop-blur px-4 lg:px-6">
      {title && (
        <h1 className="hidden md:block text-sm font-semibold">{title}</h1>
      )}
      <div className="flex-1 max-w-md ml-0 md:ml-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Cari template, dokumen, klien…"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted/60 border border-transparent focus:border-border focus:bg-card text-sm outline-none transition-colors"
          />
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5">
        <Zap className="h-3.5 w-3.5 text-accent" />
        <span className="text-xs font-medium">12 / 30</span>
        <span className="text-xs text-muted-foreground">AI</span>
      </div>
      <button className="relative h-9 w-9 grid place-items-center rounded-lg hover:bg-muted">
        <Bell className="h-4 w-4" />
        <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-accent" />
      </button>
      <Link
        to="/settings"
        className="flex items-center gap-2 rounded-lg pl-1 pr-2.5 py-1 hover:bg-muted"
      >
        <div className="h-7 w-7 rounded-full bg-foreground text-background grid place-items-center text-[11px] font-semibold">
          RA
        </div>
        <div className="hidden md:block text-left leading-tight">
          <div className="text-xs font-semibold">Rizky A.</div>
          <div className="text-[10px] text-muted-foreground">Pro Plan</div>
        </div>
      </Link>
    </header>
  );
}
