import { createFileRoute, Link } from "@tanstack/react-router";
import { DoqLogo } from "@/components/DoqLogo";
import { CheckCircle2, FileText, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <AuthForm mode="login" />
      <AuthAside />
    </div>
  );
}

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const navigate = Route.useNavigate();
  return (
    <div className="flex flex-col px-6 sm:px-12 py-8">
      <DoqLogo />
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === "login" ? "Masuk ke DoqAI" : "Buat akun DoqAI"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login"
              ? "Lanjutkan kerja cepat. Generate dokumen dalam hitungan menit."
              : "Mulai gratis. Tanpa kartu kredit."}
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            {mode === "register" && (
              <Field label="Nama lengkap" placeholder="Rizky Aditya" />
            )}
            <Field
              label="Email bisnis"
              placeholder="kamu@bisnis.id"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <Field
              label="Password"
              placeholder="Minimal 8 karakter"
              type="password"
            />
            {mode === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-muted-foreground hover:text-foreground">
                  Lupa password?
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full h-10 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition"
            >
              {mode === "login" ? "Masuk" : "Daftar Gratis"}
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">atau</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate({ to: "/dashboard" })}
              className="w-full h-10 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted flex items-center justify-center gap-2"
            >
              <GoogleIcon /> Lanjut dengan Google
            </button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            {mode === "login" ? (
              <>Belum punya akun? <Link to="/register" className="text-foreground font-medium hover:underline">Daftar gratis</Link></>
            ) : (
              <>Sudah punya akun? <Link to="/login" className="text-foreground font-medium hover:underline">Masuk</Link></>
            )}
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        © 2026 DoqAI. Bisnis kecil juga layak terlihat profesional.
      </p>
    </div>
  );
}

function Field({
  label, placeholder, type = "text", value, onChange,
}: {
  label: string; placeholder?: string; type?: string;
  value?: string; onChange?: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-card text-sm outline-none focus:border-foreground transition-colors"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function AuthAside() {
  return (
    <div className="hidden lg:flex relative bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 doq-grid-bg opacity-[0.06]" />
      <div className="relative flex flex-col justify-between p-12 w-full">
        <div className="flex items-center gap-2 text-xs text-background/60">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Live workflow
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Dari dokumen<br />ke <span className="text-accent">closing</span> lebih cepat.
          </h2>
          <p className="text-background/60 max-w-md">
            Proposal, kontrak, SOP, dan konten WhatsApp otomatis untuk
            freelancer, agency, dan UMKM Indonesia.
          </p>

          <div className="grid gap-3 max-w-md">
            <Mock
              icon={<FileText className="h-3.5 w-3.5" />}
              title="Proposal Redesign Website"
              meta="PT Maju Bersama · 14 hal"
              status="Selesai"
            />
            <Mock
              icon={<MessageCircle className="h-3.5 w-3.5" />}
              title="Konten WhatsApp Promo Lebaran"
              meta="30 hari · 60 caption"
              status="Generating"
              live
            />
            <Mock
              icon={<Sparkles className="h-3.5 w-3.5" />}
              title="Kontrak Freelance Designer"
              meta="PKS · Bilingual"
              status="Draft"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-md">
          {["Bahasa Indonesia", "QRIS Ready", "AI Assisted"].map((t) => (
            <div key={t} className="flex items-center gap-1.5 text-[11px] text-background/70">
              <CheckCircle2 className="h-3 w-3 text-accent" /> {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Mock({
  icon, title, meta, status, live,
}: { icon: React.ReactNode; title: string; meta: string; status: string; live?: boolean }) {
  return (
    <div className="rounded-xl border border-background/10 bg-background/5 backdrop-blur p-3 flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-background/10 grid place-items-center text-background">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-[11px] text-background/50 truncate">{meta}</div>
      </div>
      <div className={`text-[10px] px-2 py-0.5 rounded-full ${
        live ? "bg-accent/20 text-accent" : "bg-background/10 text-background/70"
      }`}>
        {live && <span className="inline-block h-1 w-1 rounded-full bg-accent mr-1 animate-pulse" />}
        {status}
      </div>
    </div>
  );
}
