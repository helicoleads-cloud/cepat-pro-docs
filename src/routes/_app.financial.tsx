import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";


export const Route = createFileRoute("/_app/financial")({
  component: FinancialPage,
});

const revenue = [
  { month: "Jan", revenue: 12000000 },
  { month: "Feb", revenue: 18500000 },
  { month: "Mar", revenue: 22000000 },
  { month: "Apr", revenue: 17500000 },
];

const transactions = [
  { title: "Pembayaran Proposal Website", amount: "+Rp12.000.000", status: "Paid", positive: true },
  { title: "Langganan OpenAI API", amount: "-Rp450.000", status: "Completed", positive: false },
];

const fmt = (n: number) => "Rp" + n.toLocaleString("id-ID");

function FinancialPage() {
  const max = Math.max(...revenue.map((r) => r.revenue));

  return (
    <div>
      <PageHeader
        title="Financial Narrator"
        subtitle="Ringkasan revenue dan transaksi terkini."
      />

      <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">


      {/* Revenue cards */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {revenue.map((r) => (
          <div key={r.month} className="doq-card p-4">
            <p className="text-xs text-muted-foreground">{r.month} 2026</p>
            <p className="mt-1 text-xl font-bold">{fmt(r.revenue)}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-6 doq-card p-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold">Revenue 4 Bulan Terakhir</h2>
        </div>
        <div className="mt-6 flex items-end gap-4 h-48">
          {revenue.map((r) => (
            <div key={r.month} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-accent transition-all"
                style={{ height: `${(r.revenue / max) * 100}%` }}
              />
              <span className="text-[11px] text-muted-foreground">{r.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="mt-6 doq-card p-6">
        <h2 className="text-sm font-semibold">Transaksi Terbaru</h2>
        <div className="mt-4 divide-y divide-border">
          {transactions.map((t) => (
            <div key={t.title} className="py-3 flex items-center gap-3">
              <div className={`h-9 w-9 rounded-lg grid place-items-center ${
                t.positive ? "bg-accent-soft text-accent" : "bg-muted text-muted-foreground"
              }`}>
                {t.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.status}</div>
              </div>
              <span className={`text-sm font-semibold ${t.positive ? "text-accent" : "text-muted-foreground"}`}>
                {t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
