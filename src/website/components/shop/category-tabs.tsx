"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/website/constants/categories";
import { ROUTES } from "@/website/constants/routes";
import { cn } from "@/website/lib/cn";

interface CategoryTabsProps {
  active?: string;
}

export function CategoryTabs({ active = "all" }: CategoryTabsProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible">
      <div className="flex min-w-max items-center gap-1.5">
        <TabItem href={ROUTES.shop} label="All" active={active === "all"} />
        {CATEGORIES.map((c) => (
          <TabItem
            key={c.slug}
            href={ROUTES.category(c.slug)}
            label={c.name}
            active={active === c.slug}
          />
        ))}
      </div>
    </div>
  );
}

function TabItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link href={href} className="relative inline-flex">
      <span
        className={cn(
          "relative z-10 inline-flex h-10 items-center rounded-full px-4 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
          active
            ? "text-[color:var(--color-ink)]"
            : "text-white/85 hover:text-white",
        )}
      >
        {label}
      </span>
      {active && (
        <motion.span
          layoutId="category-tab-pill"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 rounded-full bg-white"
        />
      )}
    </Link>
  );
}
