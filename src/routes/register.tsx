import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "./login";
import { DoqLogo } from "@/components/DoqLogo";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <AuthForm mode="register" />
      <div className="hidden lg:flex relative bg-accent-soft overflow-hidden">
        <div className="absolute inset-0 doq-grid-bg opacity-30" />
        <div className="relative p-12 flex flex-col justify-between w-full">
          <DoqLogo />
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Bisnis kecil juga layak<br />terlihat <span className="text-accent">profesional</span>.
            </h2>
            <ul className="mt-6 space-y-2 text-sm text-foreground/70">
              <li>• 3 dokumen gratis untuk mulai</li>
              <li>• Template bisnis lokal</li>
              <li>• Export PDF & DOCX</li>
              <li>• Tanpa kartu kredit</li>
            </ul>
          </div>
          <div className="flex -space-x-2">
            {["RA","SD","AN","FA","MK"].map((i, idx) => (
              <div key={i} className={`h-8 w-8 rounded-full grid place-items-center text-[10px] font-semibold ring-2 ring-accent-soft ${["bg-foreground text-background","bg-accent text-background","bg-card text-foreground","bg-foreground text-background","bg-accent text-background"][idx]}`}>
                {i}
              </div>
            ))}
            <div className="ml-3 text-xs text-foreground/60 self-center">
              +1.200 bisnis sudah pakai DoqAI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
