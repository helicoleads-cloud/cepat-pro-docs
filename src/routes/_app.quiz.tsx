import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/quiz")({
  component: () => (
    <PagePlaceholder
      icon={ClipboardList}
      title="Quiz Lead Funnel"
      subtitle="Buat kuis interaktif untuk capture lead, scoring otomatis, dan embed di website. Cocok untuk konsultan, klinik, dan agency."
      features={[
        "Multiple question types + scoring logic",
        "Lead capture form bawaan",
        "Embed code untuk website mana pun",
        "Analytics: completion rate, conversion, source",
        "Auto follow-up via WhatsApp",
      ]}
      ctaTo="/proposal"
    />
  ),
});
