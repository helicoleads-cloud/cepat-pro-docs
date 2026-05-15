import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/whatsapp")({
  component: () => (
    <PagePlaceholder
      icon={MessageCircle}
      title="WhatsApp Content AI"
      subtitle="30 hari ide konten, caption otomatis, dan promo planning. Preview WhatsApp-style + status broadcast siap kirim."
      features={[
        "Content calendar 30 hari",
        "Caption + CTA generator per kategori",
        "Promo campaign planner (PayDay, Lebaran, dll)",
        "Preview chat & status WhatsApp",
        "Export ke spreadsheet & broadcast",
      ]}
      ctaTo="/proposal"
    />
  ),
});
