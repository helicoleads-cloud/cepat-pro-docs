import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Download } from "lucide-react";

export const Route = createFileRoute("/_app/sop")({
  component: SopPage,
});

const categories = [
  "Customer Service",
  "Admin Finance",
  "Sales",
  "Social Media",
  "Warehouse",
  "HR Recruitment",
];

const csSteps = [
  "Balas chat maksimal 5 menit.",
  "Gunakan template greeting resmi.",
  "Tanyakan kebutuhan customer.",
  "Input lead ke CRM.",
  "Follow up maksimal H+1.",
];

function SopPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid lg:grid-cols-[280px_1fr] items-start">
      <aside className="border-r border-border bg-card p-6 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto self-start">
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold">Kategori SOP</h2>
        </div>
        <nav className="mt-5 space-y-1">
          {categories.map((c, i) => (
            <button
              key={c}
              onClick={() => setActive(i)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                active === i
                  ? "bg-accent-soft text-accent font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </nav>
      </aside>

      <main className="p-6 lg:p-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">SOP {categories[active]}</h1>
              <p className="text-sm text-muted-foreground mt-1">5 langkah standar operasional.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-xs font-semibold hover:brightness-95">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>

          <article className="doq-card p-8">
            <ol className="space-y-4">
              {csSteps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <div className="h-7 w-7 rounded-lg bg-accent text-accent-foreground grid place-items-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed pt-1">{s}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </main>
    </div>
  );
}
