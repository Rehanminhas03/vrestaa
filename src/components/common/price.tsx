import { cn } from "@/lib/cn";
import { discountPercent, formatCurrency } from "@/lib/format";

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  className?: string;
  align?: "left" | "right";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
};

export function Price({
  price,
  compareAtPrice,
  currency = "USD",
  className,
  align = "left",
  size = "md",
}: PriceProps) {
  const discount = discountPercent(price, compareAtPrice);
  return (
    <div
      className={cn(
        "flex items-baseline gap-2 text-white",
        align === "right" && "justify-end",
        className,
      )}
    >
      <span className={cn("font-semibold tracking-tight", sizeClasses[size])}>
        {formatCurrency(price, currency)}
      </span>
      {compareAtPrice && compareAtPrice > price && (
        <span className="text-sm text-[color:var(--color-fg-muted)] line-through">
          {formatCurrency(compareAtPrice, currency)}
        </span>
      )}
      {discount && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
          −{discount}%
        </span>
      )}
    </div>
  );
}
