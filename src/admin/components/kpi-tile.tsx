import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/website/lib/cn";

interface KpiTileProps {
  label: string;
  value: string;
  delta?: number; // percentage
  hint?: string;
}

export function KpiTile({ label, value, delta, hint }: KpiTileProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-charcoal)] p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl font-bold tracking-tight text-white tabular-nums">
        {value}
      </p>
      <div className="mt-2 flex items-center justify-between text-xs">
        {delta !== undefined ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 font-medium tabular-nums",
              positive ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-danger)]",
            )}
          >
            {positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {positive ? "+" : ""}
            {delta.toFixed(1)}%
          </span>
        ) : (
          <span />
        )}
        {hint && <span className="text-[color:var(--color-fg-muted)]">{hint}</span>}
      </div>
    </div>
  );
}
