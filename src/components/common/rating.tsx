import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}

export function Rating({ value, count, size = 14, className }: RatingProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 text-white/80", className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={cn(
              "fill-current",
              i < Math.round(value) ? "text-[color:var(--color-accent)]" : "text-white/15",
            )}
          />
        ))}
      </div>
      <span className="text-xs tabular-nums text-[color:var(--color-fg-muted)]">
        {value.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}
