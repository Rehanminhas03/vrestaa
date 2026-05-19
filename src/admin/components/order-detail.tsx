"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Circle, XCircle } from "lucide-react";
import { Button } from "@/website/components/ui/button";
import { StatusPill, ORDER_STATUS_LABEL } from "./status-pill";
import { formatCurrency, formatDate } from "@/website/lib/format";
import { cn } from "@/website/lib/cn";
import type { AdminOrder, AdminOrderStatus } from "@/admin/types";
import { ORDER_STATUS_FLOW } from "@/admin/types";

interface OrderDetailProps {
  order: AdminOrder;
}

export function OrderDetail({ order }: OrderDetailProps) {
  const [status, setStatus] = React.useState<AdminOrderStatus>(order.status);
  const [note, setNote] = React.useState(order.note ?? "");

  const currentIdx = ORDER_STATUS_FLOW.indexOf(status);
  const isCancelled = status === "CANCELLED";
  const isDelivered = status === "DELIVERED";

  const advance = () => {
    if (isCancelled || isDelivered) return;
    setStatus(ORDER_STATUS_FLOW[currentIdx + 1]);
  };

  const cancel = () => setStatus("CANCELLED");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
              Items · {order.items.reduce((s, i) => s + i.quantity, 0)}
            </h2>
          </div>
          <ul className="divide-y divide-[color:var(--color-border)]">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-md bg-white/5">
                  <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs text-[color:var(--color-fg-muted)]">
                    {item.color.name} · {item.size} · qty {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-white">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-[color:var(--color-border)] pt-4 text-sm">
            <Row label="Subtotal" value={formatCurrency(order.subtotal)} />
            <Row label="Shipping" value={order.shipping === 0 ? "Free" : formatCurrency(order.shipping)} />
            <Row label="Tax" value={formatCurrency(order.tax)} />
            <div className="border-t border-[color:var(--color-border)] pt-2">
              <Row label="Total" value={formatCurrency(order.total)} bold />
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
          <h2 className="mb-4 font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
            Internal note
          </h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Add a note for fulfilment or future-you…"
            className="w-full rounded-md border border-[color:var(--color-border-strong)] bg-transparent px-3 py-2 text-sm text-white placeholder:text-[color:var(--color-fg-muted)] focus:border-white focus-visible:outline-none"
          />
          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            Saved in session only · persists when Firebase is wired
          </p>
        </section>
      </div>

      <aside className="flex flex-col gap-6">
        <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
              Status
            </h2>
            <StatusPill status={status} />
          </div>
          <Timeline status={status} order={order} />
          <div className="mt-4 flex flex-col gap-2">
            {!isCancelled && !isDelivered && (
              <Button onClick={advance} variant="accent" size="md" className="w-full">
                Advance to {ORDER_STATUS_LABEL[ORDER_STATUS_FLOW[currentIdx + 1]]}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {!isCancelled && (
              <Button onClick={cancel} variant="outline" size="md" className="w-full">
                Cancel order
              </Button>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
          <h2 className="mb-4 font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
            Customer
          </h2>
          <p className="text-sm text-white">{order.customer.name}</p>
          <p className="text-xs text-[color:var(--color-fg-muted)]">{order.customer.email}</p>
        </section>

        <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
          <h2 className="mb-4 font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
            Shipping
          </h2>
          <address className="not-italic text-sm text-white/85">
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
            <p>
              {order.shippingAddress.city}
              {order.shippingAddress.region && `, ${order.shippingAddress.region}`} {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </address>
        </section>

        <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
          <h2 className="mb-4 font-display text-base font-semibold uppercase tracking-[0.18em] text-white">
            Payment
          </h2>
          <p className="text-sm text-white">{order.paymentMethod}</p>
          <p className="text-xs text-[color:var(--color-fg-muted)]">
            Placed {formatDate(order.createdAt)}
          </p>
        </section>
      </aside>
    </div>
  );
}

function Timeline({ status, order }: { status: AdminOrderStatus; order: AdminOrder }) {
  const isCancelled = status === "CANCELLED";
  const currentIdx = ORDER_STATUS_FLOW.indexOf(status);

  return (
    <ol className="relative">
      {ORDER_STATUS_FLOW.map((s, i) => {
        const done = !isCancelled && i <= currentIdx;
        const entry = order.timeline.find((t) => t.status === s);
        return (
          <li key={s} className="flex gap-3 pb-5 last:pb-0">
            <div className="relative flex flex-col items-center">
              <span
                className={cn(
                  "z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border",
                  done
                    ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-[color:var(--color-ink)]"
                    : "border-[color:var(--color-border-strong)] text-[color:var(--color-fg-muted)]",
                )}
              >
                {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3 w-3" />}
              </span>
              {i < ORDER_STATUS_FLOW.length - 1 && (
                <span
                  className={cn(
                    "absolute left-1/2 top-6 h-full w-px -translate-x-1/2",
                    done && i + 1 <= currentIdx
                      ? "bg-[color:var(--color-accent)]"
                      : "bg-[color:var(--color-border)]",
                  )}
                />
              )}
            </div>
            <div className="flex-1 pt-0.5">
              <p
                className={cn(
                  "text-sm font-medium",
                  done ? "text-white" : "text-[color:var(--color-fg-muted)]",
                )}
              >
                {ORDER_STATUS_LABEL[s]}
              </p>
              {entry && (
                <p className="text-xs text-[color:var(--color-fg-muted)]">
                  {formatDate(entry.at)}
                </p>
              )}
            </div>
          </li>
        );
      })}
      {isCancelled && (
        <li className="flex gap-3 pt-2">
          <span className="z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--color-danger)] bg-[color:var(--color-danger)]/10 text-[color:var(--color-danger)]">
            <XCircle className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-sm font-medium text-[color:var(--color-danger)]">Cancelled</p>
            <p className="text-xs text-[color:var(--color-fg-muted)]">
              {order.timeline.find((t) => t.status === "CANCELLED")?.note ?? ""}
            </p>
          </div>
        </li>
      )}
    </ol>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className={bold ? "text-white" : "text-[color:var(--color-fg-muted)]"}>{label}</dt>
      <dd className={bold ? "text-base font-semibold tabular-nums text-white" : "text-sm tabular-nums text-white"}>
        {value}
      </dd>
    </div>
  );
}
