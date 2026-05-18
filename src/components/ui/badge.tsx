import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        default: "bg-white text-[color:var(--color-ink)]",
        accent: "bg-[color:var(--color-accent)] text-[color:var(--color-ink)]",
        dark: "bg-[color:var(--color-surface-elevated)] text-white border border-[color:var(--color-border)]",
        outline: "border border-white/30 text-white",
        sale: "bg-[color:var(--color-danger)] text-white",
        muted: "bg-white/5 text-[color:var(--color-fg-muted)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
