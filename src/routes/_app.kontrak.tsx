import { createFileRoute } from "@tanstack/react-router";
import { FileSignature } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/kontrak")({
  component: () => (
    <PagePlaceholder
      icon={FileSignature}
      title="Kontrak Generator"
      subtitle="PKS, NDA, SPK, dan kontrak freelance dalam Bahasa Indonesia & English. Toggle klausul sesuai kebutuhan, bilingual mode, dan e-sign placeholder."
      features={[
        "5+ jenis kontrak: PKS, NDA, SPK, Freelance, Vendor",
        "Toggle klausul: pembayaran, IP, terminasi, force majeure",
        "Bilingual mode: Indonesia & English side-by-side",
        "Risk warning otomatis untuk klausul yang tidak biasa",
        "Payment milestone generator",
      ]}
      ctaTo="/proposal"
    />
  ),
});
