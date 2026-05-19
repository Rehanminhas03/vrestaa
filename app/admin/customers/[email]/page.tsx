import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Mail, MapPin } from "lucide-react";
import { Topbar } from "@/admin/components/topbar";
import { StatusPill } from "@/admin/components/status-pill";
import { ADMIN_CUSTOMER_BY_EMAIL } from "@/admin/data/customers";
import { ADMIN_ORDER_BY_ID } from "@/admin/data/orders";
import { formatCurrency, formatDate } from "@/website/lib/format";

type Params = Promise<{ email: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { email } = await params;
  const c = ADMIN_CUSTOMER_BY_EMAIL[decodeURIComponent(email)];
  return { title: c?.name ?? "Customer" };
}

export default async function AdminCustomerDetailPage({ params }: { params: Params }) {
  const { email } = await params;
  const customer = ADMIN_CUSTOMER_BY_EMAIL[decodeURIComponent(email)];
  if (!customer) notFound();

  const orders = customer.orderIds
    .map((id) => ADMIN_ORDER_BY_ID[id])
    .filter(Boolean)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return (
    <>
      <Topbar
        title={customer.name}
        description={`${customer.totalOrders} orders · ${formatCurrency(customer.lifetimeValue)} lifetime`}
        actions={
          <Link
            href="/admin/customers"
            className="inline-flex items-center gap-1 rounded-md border border-[color:var(--color-border-strong)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-white hover:text-white"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            All customers
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 p-5 md:p-8 lg:grid-cols-3">
        <aside className="flex flex-col gap-4 lg:col-span-1">
          <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
              Profile
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
              {customer.name}
            </h2>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/80">
              <Mail className="h-3.5 w-3.5 text-white/50" />
              {customer.email}
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/80">
              <MapPin className="h-3.5 w-3.5 text-white/50" />
              {customer.country}
            </p>
            <p className="mt-3 inline-flex rounded-full bg-white/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
              {customer.tag}
            </p>
          </section>

          <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
              Lifetime
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Total orders" value={String(customer.totalOrders)} />
              <Row label="Lifetime value" value={formatCurrency(customer.lifetimeValue)} bold />
              <Row label="First order" value={formatDate(customer.firstOrderAt)} />
              <Row label="Last order" value={formatDate(customer.lastOrderAt)} />
            </dl>
          </section>
        </aside>

        <div className="lg:col-span-2">
          <section className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)]">
            <div className="border-b border-[color:var(--color-border)] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
              Order history · {orders.length}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                    <th className="px-5 py-3">Order</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--color-border)]">
                  {orders.map((o) => (
                    <tr key={o.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/orders/${o.id}`}
                          className="text-white hover:text-[color:var(--color-accent)]"
                        >
                          {o.number}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-white/85">{formatDate(o.createdAt)}</td>
                      <td className="px-5 py-4">
                        <StatusPill status={o.status} />
                      </td>
                      <td className="px-5 py-4 text-right font-semibold tabular-nums text-white">
                        {formatCurrency(o.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-[color:var(--color-fg-muted)]">{label}</dt>
      <dd className={bold ? "text-base font-semibold tabular-nums text-white" : "text-sm tabular-nums text-white"}>
        {value}
      </dd>
    </div>
  );
}
