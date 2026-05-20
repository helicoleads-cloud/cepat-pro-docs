import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Sparkles, Send, Calendar } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";


export const Route = createFileRoute("/_app/whatsapp")({
  component: WhatsAppPage,
});

const campaigns = [
  { title: "Promo Klinik Gigi", audience: "Customer Lama", status: "Scheduled" },
  { title: "Launching Padel Arena", audience: "New Leads", status: "Draft" },
];

const statusTone: Record<string, string> = {
  Scheduled: "bg-accent-soft text-accent",
  Draft: "bg-muted text-muted-foreground",
};

const aiCopy = `Halo Kak 👋

Ada promo scaling gigi + konsultasi GRATIS minggu ini ✨

Booking sekarang dan dapatkan diskon 20% khusus member.

Klik untuk reservasi:
wa.me/628xxxx`;

function WhatsAppPage() {
  return (
    <div>
      <PageHeader
        title="WhatsApp Content"
        subtitle="Kelola campaign dan generate copy WhatsApp dengan AI."
        actions={
          <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 h-9 text-xs font-semibold hover:brightness-95">
            <Send className="h-3.5 w-3.5" /> Campaign Baru
          </button>
        }
      />

      <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">
        <section>

        <h2 className="text-sm font-semibold mb-3">Campaign Aktif</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {campaigns.map((c) => (
            <div key={c.title} className="doq-card p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-accent-soft text-accent grid place-items-center">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{c.title}</h3>
                    <p className="text-xs text-muted-foreground">{c.audience}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusTone[c.status]}`}>{c.status}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> Jadwal: Minggu ini
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="doq-card p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold">AI Generated WhatsApp Copy</h2>
          </div>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed bg-muted/40 rounded-lg p-5 border border-border">
{aiCopy}
          </pre>
          <div className="mt-4 flex gap-2">
            <button className="rounded-full bg-accent text-accent-foreground px-4 py-2 text-xs font-semibold">
              Regenerate
            </button>
            <button className="rounded-lg border border-border px-4 py-2 text-xs font-medium hover:bg-muted">
              Copy
            </button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-14 doq-card p-6">
          <h3 className="text-sm font-semibold">Preview WhatsApp</h3>
          <div className="mt-4 rounded-xl bg-[#0b141a] p-4">
            <div className="bg-[#005c4b] text-white text-xs rounded-lg rounded-tl-none p-3 max-w-[85%] whitespace-pre-wrap leading-relaxed">
              {aiCopy}
            </div>
          </div>
        </aside>
      </section>
      </div>
    </div>

  );
}
