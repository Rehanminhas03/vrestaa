"use client";

import * as React from "react";
import { CheckCircle2, Circle, Package } from "lucide-react";
import { Container } from "@/components/common/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const STEPS = [
  { key: "PLACED", label: "Order placed", desc: "Your order is confirmed." },
  { key: "CONFIRMED", label: "Payment confirmed", desc: "Payment processed." },
  { key: "PACKED", label: "Packed", desc: "Pulled from the warehouse." },
  { key: "SHIPPED", label: "Shipped", desc: "Out the door, into the world." },
  { key: "OUT_FOR_DELIVERY", label: "Out for delivery", desc: "On the way to you." },
  { key: "DELIVERED", label: "Delivered", desc: "Enjoy your fit." },
] as const;

export default function TrackPage() {
  const [order, setOrder] = React.useState("");
  const [current, setCurrent] = React.useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order.trim()) return;
    // Demo: mock a SHIPPED status
    setCurrent(3);
  };

  return (
    <Container size="default" className="py-12 md:py-20">
      <header className="mb-10 flex flex-col gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
          Order tracking
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
          Where&apos;s my order?
        </h1>
        <p className="max-w-xl text-sm text-[color:var(--color-fg-muted)]">
          Enter your order number to see live status. Or sign in to see all your orders in one place.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mb-12 flex flex-col gap-3 rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-6 md:flex-row md:items-center"
      >
        <Input
          placeholder="Order # (e.g. VRESTA-018342)"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
        <Button type="submit" size="lg" variant="primary" className="md:w-auto">
          Track order
        </Button>
      </form>

      {current !== null && (
        <section className="rounded-xl border border-[color:var(--color-border)] bg-white/[0.02] p-6 md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <Package className="h-5 w-5 text-[color:var(--color-accent)]" />
            <p className="font-display text-lg font-semibold text-white">
              Order {order || "VRESTA-018342"}
            </p>
          </div>

          <ol className="relative">
            {STEPS.map((step, i) => {
              const done = i <= current;
              const isCurrent = i === current;
              return (
                <li key={step.key} className="flex gap-4 pb-8 last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <span
                      className={cn(
                        "z-10 inline-flex h-7 w-7 items-center justify-center rounded-full border",
                        done
                          ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-[color:var(--color-ink)]"
                          : "border-[color:var(--color-border-strong)] text-[color:var(--color-fg-muted)]",
                      )}
                    >
                      {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span
                        className={cn(
                          "absolute left-1/2 top-7 h-full w-px -translate-x-1/2",
                          done && i + 1 <= current
                            ? "bg-[color:var(--color-accent)]"
                            : "bg-[color:var(--color-border)]",
                        )}
                      />
                    )}
                  </div>
                  <div className="pt-1">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        done ? "text-white" : "text-[color:var(--color-fg-muted)]",
                        isCurrent && "text-[color:var(--color-accent)]",
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--color-fg-muted)]">{step.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}
    </Container>
  );
}
