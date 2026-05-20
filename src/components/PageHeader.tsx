import { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
  sticky = false,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  sticky?: boolean;
  children?: ReactNode;
}) {
  return (
    <header
      className={`${
        sticky ? "sticky top-0 z-20" : ""
      } bg-background/95 backdrop-blur border-b border-border`}
    >
      <div className="px-4 lg:px-6 py-3 flex items-center gap-3 flex-wrap">
        <div className="min-w-0">
          <h1 className="text-base font-semibold tracking-tight leading-none">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground mt-1.5">{subtitle}</p>}
        </div>
        {actions && <div className="ml-auto flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
      {children}
    </header>
  );
}
