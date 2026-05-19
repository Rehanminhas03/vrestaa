import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/website/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "View all",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        {eyebrow && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-xl text-sm text-[color:var(--color-fg-muted)] sm:text-base">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:text-[color:var(--color-accent)]"
        >
          {hrefLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
