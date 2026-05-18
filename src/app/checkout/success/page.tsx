"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Package, Sparkles } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { ROUTES } from "@/constants/routes";

// A fake but plausible order number generated client-side. The component is
// keyed at mount so refreshes don't shuffle it.
function generateOrderNumber() {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `VRESTA-0${n}`;
}

function estimatedDelivery() {
  const start = new Date();
  start.setDate(start.getDate() + 2);
  const end = new Date();
  end.setDate(end.getDate() + 4);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(start)} — ${fmt(end)}`;
}

export default function CheckoutSuccessPage() {
  const [orderNumber] = React.useState(generateOrderNumber);
  const [eta] = React.useState(estimatedDelivery);

  return (
    <Container size="default" className="flex min-h-[80vh] flex-col py-12 md:py-20">
      <Logo />

      <div className="mx-auto mt-12 flex w-full max-w-2xl flex-1 flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="relative mb-8"
        >
          <span className="pointer-events-none absolute inset-0 -m-8 rounded-full bg-[color:var(--color-accent)]/15 blur-2xl" />
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-ink)]">
            <CheckCircle2 className="h-9 w-9" strokeWidth={2.5} />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]"
        >
          Order confirmed
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl"
        >
          You&apos;re in. Welcome to the rise.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="mt-4 max-w-xl text-sm text-[color:var(--color-fg-muted)] md:text-base"
        >
          We&apos;ve emailed your receipt and a tracking link will follow as soon
          as your order ships. Below is the gist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT_EXPO }}
          className="mt-10 grid w-full grid-cols-1 gap-4 rounded-2xl border border-[color:var(--color-border)] bg-white/[0.02] p-6 text-left sm:grid-cols-3 md:p-8"
        >
          <DetailItem
            icon={<Package className="h-4 w-4" />}
            label="Order"
            value={orderNumber}
          />
          <DetailItem
            icon={<Sparkles className="h-4 w-4" />}
            label="Estimated delivery"
            value={eta}
          />
          <DetailItem
            icon={<CheckCircle2 className="h-4 w-4" />}
            label="Status"
            value="Confirmed"
            accent
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT_EXPO }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" variant="primary">
            <Link href={ROUTES.track}>
              Track this order
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={ROUTES.shop}>Keep shopping</Link>
          </Button>
        </motion.div>
      </div>
    </Container>
  );
}

function DetailItem({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
        <span className="text-white/70">{icon}</span>
        {label}
      </span>
      <span
        className={`text-sm tabular-nums ${
          accent ? "text-[color:var(--color-accent)]" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
