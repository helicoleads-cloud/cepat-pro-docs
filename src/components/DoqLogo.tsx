export function DoqLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
        <div className="absolute inset-1 rounded-md border border-background/30" />
        <span className="relative text-background text-[11px] font-bold tracking-tight">D</span>
        <div className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
      </div>
      <span className="text-base font-bold tracking-tight">
        Doq<span className="text-accent">AI</span>
      </span>
    </div>
  );
}
