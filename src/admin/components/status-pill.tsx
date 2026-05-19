import { cn } from "@/website/lib/cn";
import type { AdminOrderStatus } from "@/admin/types";

const STYLES: Record<AdminOrderStatus, string> = {
  PLACED: "bg-white/8 text-white ring-1 ring-inset ring-white/15",
  CONFIRMED: "bg-blue-400/10 text-blue-300 ring-1 ring-inset ring-blue-400/30",
  PACKED: "bg-amber-400/10 text-amber-300 ring-1 ring-inset ring-amber-400/30",
  SHIPPED: "bg-violet-400/10 text-violet-300 ring-1 ring-inset ring-violet-400/30",
  DELIVERED: "bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] ring-1 ring-inset ring-[color:var(--color-accent)]/30",
  CANCELLED: "bg-[color:var(--color-danger)]/10 text-[color:var(--color-danger)] ring-1 ring-inset ring-[color:var(--color-danger)]/30",
};

const LABELS: Record<AdminOrderStatus, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export function StatusPill({ status }: { status: AdminOrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em]",
        STYLES[status],
      )}
    >
      {LABELS[status]}
    </span>
  );
}

export { LABELS as ORDER_STATUS_LABEL };
