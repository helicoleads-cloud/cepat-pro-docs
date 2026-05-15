import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  FileSignature,
  ListChecks,
  MessageCircle,
  ClipboardList,
  TrendingUp,
  LayoutTemplate,
  CreditCard,
  Settings,
  Sparkles,
} from "lucide-react";
import { DoqLogo } from "./DoqLogo";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/proposal", label: "Proposal", icon: FileText },
  { to: "/kontrak", label: "Kontrak", icon: FileSignature },
  { to: "/sop", label: "SOP", icon: ListChecks },
  { to: "/whatsapp", label: "WhatsApp Content", icon: MessageCircle },
  { to: "/quiz", label: "Quiz Funnel", icon: ClipboardList },
  { to: "/financial", label: "Financial Narrator", icon: TrendingUp },
];
const nav2 = [
  { to: "/templates", label: "Templates", icon: LayoutTemplate },
  { to: "/billing", label: "Billing", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  const Item = ({ to, label, icon: Icon }: typeof nav[number]) => {
    const active = path === to || path.startsWith(to + "/");
    return (
      <Link
        to={to}
        className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
          active
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
        <span className="truncate">{label}</span>
      </Link>
    );
  };

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-border">
        <Link to="/dashboard"><DoqLogo /></Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3 mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Workflow
        </p>
        {nav.map((n) => <Item key={n.to} {...n} />)}
        <p className="px-3 mt-6 mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Akun
        </p>
        {nav2.map((n) => <Item key={n.to} {...n} />)}
      </nav>
      <div className="m-3 rounded-xl border border-border bg-gradient-to-br from-accent-soft/60 to-background p-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-semibold">Upgrade ke Pro</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Generate tanpa batas, hilangkan watermark, custom branding.
        </p>
        <Link
          to="/billing"
          className="block text-center rounded-md bg-foreground text-background text-xs font-medium py-1.5 hover:bg-foreground/90"
        >
          Lihat Plan
        </Link>
      </div>
    </aside>
  );
}
