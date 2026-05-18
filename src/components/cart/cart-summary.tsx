import { formatCurrency } from "@/lib/format";

interface CartSummaryProps {
  subtotal: number;
  shipping?: number | "calculated";
}

export function CartSummary({ subtotal, shipping = "calculated" }: CartSummaryProps) {
  return (
    <dl className="flex flex-col gap-2 text-sm">
      <Row label="Subtotal" value={formatCurrency(subtotal)} />
      <Row
        label="Shipping"
        value={shipping === "calculated" ? "Calculated at checkout" : formatCurrency(shipping)}
        muted
      />
      <div className="mt-3 border-t border-[color:var(--color-border)] pt-3">
        <Row label="Total" value={formatCurrency(subtotal)} bold />
      </div>
    </dl>
  );
}

function Row({
  label,
  value,
  muted,
  bold,
}: {
  label: string;
  value: string;
  muted?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className={muted ? "text-[color:var(--color-fg-muted)]" : "text-white/80"}>
        {label}
      </dt>
      <dd
        className={
          bold
            ? "text-base font-semibold tabular-nums text-white"
            : muted
              ? "text-sm tabular-nums text-[color:var(--color-fg-muted)]"
              : "text-sm tabular-nums text-white"
        }
      >
        {value}
      </dd>
    </div>
  );
}
