import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/sop")({
  component: () => (
    <PagePlaceholder
      icon={ListChecks}
      title="SOP Generator"
      subtitle="Bangun SOP operasional, onboarding karyawan, customer service, dan kasir dengan process builder visual + AI refinement."
      features={[
        "Process builder drag & drop",
        "AI menyusun langkah berdasarkan industri Anda",
        "Preview flowchart otomatis",
        "Layout printable A4 siap dicetak",
        "Versi singkat untuk training tim baru",
      ]}
      ctaTo="/proposal"
    />
  ),
});
