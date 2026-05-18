"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Truck } from "lucide-react";
import { formatCurrency } from "@/lib/format";

const FREE_SHIPPING_THRESHOLD = 120;

interface FreeShippingBarProps {
  subtotal: number;
}

export function FreeShippingBar({ subtotal }: FreeShippingBarProps) {
  const unlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="px-6 pt-5">
      <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em]">
        <span className="inline-flex items-center gap-1.5 text-white/85">
          {unlocked ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--color-accent)]" />
              Free express shipping unlocked
            </>
          ) : (
            <>
              <Truck className="h-3.5 w-3.5 text-[color:var(--color-fg-muted)]" />
              Add{" "}
              <span className="text-white tabular-nums">
                {formatCurrency(remaining)}
              </span>{" "}
              for free shipping
            </>
          )}
        </span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${
            unlocked ? "bg-[color:var(--color-accent)]" : "bg-white/80"
          }`}
        />
      </div>
    </div>
  );
}
