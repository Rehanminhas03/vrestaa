import Link from "next/link";
import { Button } from "@/website/components/ui/button";
import { cn } from "@/website/lib/cn";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  className?: string;
}

export function EmptyState({ icon, title, description, cta, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-[color:var(--color-border)] p-10 text-center",
        className,
      )}
    >
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/70">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      {description && (
        <p className="max-w-md text-sm text-[color:var(--color-fg-muted)]">{description}</p>
      )}
      {cta && (
        <Button asChild variant="outline" size="md">
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      )}
    </div>
  );
}
