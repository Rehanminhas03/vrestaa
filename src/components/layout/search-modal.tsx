"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search as SearchIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUIStore } from "@/store/ui";
import { useHotkey } from "@/hooks/use-hotkey";
import { useDebounce } from "@/hooks/use-debounce";
import { searchProducts, PRODUCTS } from "@/data/products";
import { formatCurrency } from "@/lib/format";
import { ROUTES } from "@/constants/routes";

export function SearchModal() {
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);
  const [query, setQuery] = React.useState("");
  const debounced = useDebounce(query, 120);

  useHotkey("k", (e) => {
    e.preventDefault();
    setOpen(!open);
  }, { meta: true });

  const results = React.useMemo(() => {
    if (!debounced.trim()) return [];
    return searchProducts(debounced);
  }, [debounced]);

  const suggestions = PRODUCTS.slice(0, 4);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery("");
      }}
    >
      <DialogContent
        className="top-[10%] max-w-2xl translate-y-0 p-0"
        hideClose
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="flex items-center gap-3 border-b border-[color:var(--color-border)] px-5 py-4">
          <SearchIcon className="h-5 w-5 text-[color:var(--color-fg-muted)]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, drops, categories…"
            className="flex-1 bg-transparent text-base text-white placeholder:text-[color:var(--color-fg-muted)] focus:outline-none"
          />
          <kbd className="hidden rounded border border-[color:var(--color-border)] px-2 py-0.5 text-[10px] font-medium text-[color:var(--color-fg-muted)] md:inline">
            ESC
          </kbd>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/5 hover:text-white md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {debounced.trim().length === 0 ? (
            <>
              <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
                Popular right now
              </p>
              <ul className="grid grid-cols-1 gap-1">
                {suggestions.map((p) => (
                  <SearchResult
                    key={p.slug}
                    href={ROUTES.product(p.slug)}
                    image={p.images[0]}
                    title={p.name}
                    meta={formatCurrency(p.price)}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </ul>
            </>
          ) : results.length === 0 ? (
            <p className="p-8 text-center text-sm text-[color:var(--color-fg-muted)]">
              No matches for &quot;{debounced}&quot;
            </p>
          ) : (
            <>
              <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
                {results.length} result{results.length !== 1 && "s"}
              </p>
              <ul className="grid grid-cols-1 gap-1">
                {results.map((p) => (
                  <SearchResult
                    key={p.slug}
                    href={ROUTES.product(p.slug)}
                    image={p.images[0]}
                    title={p.name}
                    meta={formatCurrency(p.price)}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchResult({
  href,
  image,
  title,
  meta,
  onClick,
}: {
  href: string;
  image: string;
  title: string;
  meta: string;
  onClick: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-white/5"
      >
        <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white/5">
          <Image src={image} alt="" fill sizes="48px" className="object-cover" />
        </span>
        <span className="flex-1 text-sm text-white">{title}</span>
        <span className="text-xs tabular-nums text-[color:var(--color-fg-muted)]">{meta}</span>
        <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
      </Link>
    </li>
  );
}
