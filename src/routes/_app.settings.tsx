import { createFileRoute, Link } from "@tanstack/react-router";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola profil bisnis dan preferensi akun.</p>
      </div>

      <Section title="Akun Pengguna" desc="Informasi profil dan paket Anda.">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-accent text-accent-foreground grid place-items-center text-lg font-bold">FS</div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Fahmi Studio</p>
            <p className="text-xs text-muted-foreground">hello@cepatpro.id</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-accent-soft text-accent">
              Pro Plan
            </span>
            <p className="mt-1 text-xs text-muted-foreground">840 credits</p>
          </div>
        </div>
      </Section>

      <Section title="Profil Bisnis" desc="Data ini otomatis dipakai di semua dokumen yang Anda generate.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nama bisnis" defaultValue="Studio Kanvas Digital" />
          <Field label="Industri" defaultValue="Digital Agency" />
          <Field label="Alamat" defaultValue="Jl. Kemang Raya No. 12, Jakarta Selatan" />
          <Field label="NPWP" defaultValue="01.234.567.8-901.000" />
          <Field label="Email" defaultValue="halo@kanvas.id" />
          <Field label="No. WhatsApp" defaultValue="+62 812 3456 7890" />
        </div>
      </Section>

      <Section title="Tanda Tangan & Branding" desc="Logo dan tanda tangan akan muncul di dokumen.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Upload label="Logo bisnis" />
          <Upload label="Tanda tangan digital" />
        </div>
      </Section>

      <Section title="Preferensi Bahasa" desc="Default bahasa untuk semua dokumen.">
        <div className="flex gap-2">
          {["Bahasa Indonesia", "English", "Bilingual"].map((l, i) => (
            <button
              key={l}
              className={`text-sm px-4 py-2 rounded-lg border transition-colors ${
                i === 0 ? "bg-foreground text-background border-foreground" : "border-border hover:bg-muted"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Tema Tampilan" desc="Pilih mode terang atau gelap untuk seluruh aplikasi.">
        <div className="grid grid-cols-2 gap-3 max-w-md">
          {([
            { id: "dark", label: "Dark", icon: Moon, desc: "Default CEPAT PRO" },
            { id: "light", label: "Light", icon: Sun, desc: "Mode terang" },
          ] as const).map((opt) => {
            const active = theme === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                className={`text-left p-4 rounded-lg border transition-colors ${
                  active ? "border-accent bg-accent-soft" : "border-border hover:bg-muted"
                }`}
              >
                <opt.icon className={`h-4 w-4 ${active ? "text-accent" : "text-muted-foreground"}`} />
                <div className="mt-2 text-sm font-semibold">{opt.label}</div>
                <div className="text-xs text-muted-foreground">{opt.desc}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Akun" desc="Kelola akses akun.">
        <div className="flex flex-wrap gap-2">
          <Link to="/login" className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-muted">Keluar</Link>
          <button className="text-sm px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10">Hapus akun</button>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, desc, children }: any) {
  return (
    <div className="doq-card p-6">
      <h2 className="text-sm font-semibold">{title}</h2>
      {desc && <p className="text-xs text-muted-foreground mt-1">{desc}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}
function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium">{label}</span>
      <input defaultValue={defaultValue} className="mt-1 w-full h-9 px-3 rounded-lg border border-border bg-background text-sm outline-none focus:border-foreground" />
    </label>
  );
}
function Upload({ label }: { label: string }) {
  return (
    <div>
      <span className="text-xs font-medium">{label}</span>
      <div className="mt-1 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-xs text-muted-foreground hover:bg-muted/40 cursor-pointer">
        Klik atau tarik file ke sini
      </div>
    </div>
  );
}
