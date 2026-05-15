import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/financial")({
  component: () => (
    <PagePlaceholder
      icon={TrendingUp}
      title="Financial Narrator"
      subtitle="Upload Excel atau CSV, AI membuat narasi bisnis investor-friendly: insight, risk, dan growth summary siap untuk pitching."
      features={[
        "Upload CSV / XLSX (multi-sheet)",
        "AI insight summary otomatis",
        "Investor-friendly narrative",
        "Risk & growth analysis",
        "Export PDF untuk meeting & pitching",
      ]}
      ctaTo="/proposal"
    />
  ),
});
