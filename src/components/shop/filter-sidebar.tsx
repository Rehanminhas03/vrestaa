"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { useFiltersStore } from "@/store/filters";
import type { Size } from "@/types";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/products";
import { cn } from "@/lib/cn";

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

const COLOR_OPTIONS = (() => {
  const set = new Map<string, string>();
  PRODUCTS.forEach((p) => p.colors.forEach((c) => set.set(c.name, c.hex)));
  return Array.from(set, ([name, hex]) => ({ name, hex }));
})();

export function FilterSidebar() {
  const { sizes, colors, priceMin, priceMax, toggleSize, toggleColor, setPrice, reset } =
    useFiltersStore();

  return (
    <aside className="flex flex-col gap-8">
      <FilterGroup title="Size">
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((s) => {
            const active = sizes.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-md border text-xs font-medium uppercase tracking-wider transition-colors",
                  active
                    ? "border-white bg-white text-[color:var(--color-ink)]"
                    : "border-[color:var(--color-border-strong)] text-white hover:border-white/60",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((c) => {
            const active = colors.includes(c.name);
            return (
              <button
                key={c.name}
                title={c.name}
                aria-label={c.name}
                onClick={() => toggleColor(c.name)}
                className={cn(
                  "relative inline-flex h-9 w-9 items-center justify-center rounded-full border-2 transition-transform hover:scale-110",
                  active ? "border-white" : "border-transparent",
                )}
                style={{ backgroundColor: c.hex }}
              >
                {active && (
                  <Check
                    className={cn(
                      "h-4 w-4",
                      c.hex === "#ffffff" || c.hex === "#f6f5f1" || c.hex === "#efe6ce"
                        ? "text-black"
                        : "text-white",
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <NumberField
              label="Min"
              value={priceMin}
              onChange={(v) => setPrice(v, priceMax)}
            />
            <span className="text-white/40">—</span>
            <NumberField
              label="Max"
              value={priceMax}
              onChange={(v) => setPrice(priceMin, v)}
            />
          </div>
          <input
            type="range"
            min={0}
            max={250}
            step={5}
            value={priceMax}
            onChange={(e) => setPrice(priceMin, Number(e.target.value))}
            className="accent-[color:var(--color-accent)]"
            aria-label="Max price"
          />
        </div>
      </FilterGroup>

      <Button variant="outline" size="md" onClick={reset}>
        Clear all filters
      </Button>
    </aside>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
        {title}
      </h4>
      {children}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-1 items-center gap-2 rounded-md border border-[color:var(--color-border-strong)] px-3 py-2 text-xs text-[color:var(--color-fg-muted)]">
      <span>{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full bg-transparent text-right text-sm tabular-nums text-white focus:outline-none"
      />
    </label>
  );
}
