import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Topbar } from "@/admin/components/topbar";
import { KpiTile } from "@/admin/components/kpi-tile";
import { RevenueChart } from "@/admin/components/revenue-chart";
import { DonutChart, DONUT_PALETTE } from "@/admin/components/donut-chart";
import { StatusPill, ORDER_STATUS_LABEL } from "@/admin/components/status-pill";
import {
  dashboardKpis,
  ordersByStatus,
  revenueSeries,
  topProducts,
  lowStockProducts,
  ADMIN_ORDERS,
} from "@/admin/lib/metrics";
import { formatCurrency, formatDate } from "@/website/lib/format";

const ONE_DAY = 24 * 60 * 60 * 1000;

export default function AdminDashboard() {
  const now = new Date();
  const from30 = new Date(+now - 30 * ONE_DAY);
  const kpis = dashboardKpis(now);
  const series = revenueSeries(from30, now);
  const byStatus = ordersByStatus();
  const donutData = Object.entries(byStatus)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => ({
      name: ORDER_STATUS_LABEL[k as keyof typeof ORDER_STATUS_LABEL],
      value: v,
    }));

  const top = topProducts(5);
  const recent = ADMIN_ORDERS.slice(0, 6);
  const lowStock = lowStockProducts(3);

  return (
    <>
      <Topbar title="Dashboard" description={`Welcome back. Here's the last 30 days.`} />

      <div className="flex flex-col gap-6 p-5 md:p-8">
        {lowStock.length > 0 && (
          <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm">
            <div className="flex items-center gap-3 text-amber-200">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>
                <strong className="text-amber-100">{lowStock.length}</strong> product
                {lowStock.length !== 1 && "s"} have at least one size with ≤ 3 in stock.
              </span>
            </div>
            <Link
              href="/admin/products?stock=low"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100 transition-colors hover:text-white"
            >
              Review
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiTile
            label="Revenue (30d)"
            value={formatCurrency(kpis.revenue.current)}
            delta={kpis.revenue.delta}
            hint="vs prior 30d"
          />
          <KpiTile
            label="Orders (30d)"
            value={String(kpis.orders.current)}
            delta={kpis.orders.delta}
            hint="vs prior 30d"
          />
          <KpiTile
            label="Average order"
            value={formatCurrency(kpis.aov.current)}
            delta={kpis.aov.delta}
            hint="vs prior 30d"
          />
          <KpiTile
            label="Active customers"
            value={String(kpis.customers.current)}
            delta={kpis.customers.delta}
            hint="placed an order"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
                  Revenue · last 30 days
                </h2>
                <p className="mt-1 text-xs text-[color:var(--color-fg-muted)]">
                  {formatCurrency(kpis.revenue.current)} total
                </p>
              </div>
            </div>
            <RevenueChart data={series} />
          </section>

          <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
            <h2 className="font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
              Orders by status
            </h2>
            <p className="mt-1 text-xs text-[color:var(--color-fg-muted)]">
              All time · {ADMIN_ORDERS.length} orders
            </p>
            <DonutChart data={donutData} />
            <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              {donutData.map((d, i) => (
                <li key={d.name} className="flex items-center gap-2 text-white/80">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: DONUT_PALETTE[i % DONUT_PALETTE.length] }}
                  />
                  <span className="flex-1 truncate">{d.name}</span>
                  <span className="tabular-nums text-[color:var(--color-fg-muted)]">{d.value}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
            <header className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
                Top products
              </h2>
              <Link
                href="/admin/products"
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)] hover:text-white"
              >
                View all
              </Link>
            </header>
            <ul className="divide-y divide-[color:var(--color-border)]">
              {top.map((p) => (
                <li key={p.slug} className="flex items-center gap-3 py-3">
                  <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white/5">
                    <Image src={p.image} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-white">{p.name}</p>
                    <p className="text-xs text-[color:var(--color-fg-muted)]">{p.units} sold</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-white">
                    {formatCurrency(p.revenue)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
            <header className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
                Recent orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)] hover:text-white"
              >
                View all
              </Link>
            </header>
            <ul className="divide-y divide-[color:var(--color-border)]">
              {recent.map((o) => (
                <li key={o.id}>
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="flex items-center gap-3 py-3 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white">{o.number}</p>
                      <p className="truncate text-xs text-[color:var(--color-fg-muted)]">
                        {o.customer.name} · {formatDate(o.createdAt)}
                      </p>
                    </div>
                    <StatusPill status={o.status} />
                    <span className="w-20 text-right text-sm font-semibold tabular-nums text-white">
                      {formatCurrency(o.total)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
