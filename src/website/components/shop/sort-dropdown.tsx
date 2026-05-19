"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/website/components/ui/dropdown-menu";
import { useFiltersStore, type SortKey } from "@/website/store/filters";

const SORTS: { label: string; value: SortKey }[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low â†’ High", value: "price-asc" },
  { label: "Price: High â†’ Low", value: "price-desc" },
  { label: "Top rated", value: "rating" },
];

export function SortDropdown() {
  const sort = useFiltersStore((s) => s.sort);
  const setSort = useFiltersStore((s) => s.setSort);
  const label = SORTS.find((s) => s.value === sort)?.label ?? "Sort";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-10 items-center gap-2 rounded-md border border-[color:var(--color-border-strong)] px-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:border-white/60">
        Sort · <span className="text-[color:var(--color-fg-muted)]">{label}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          {SORTS.map((s) => (
            <DropdownMenuRadioItem key={s.value} value={s.value}>
              {s.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
