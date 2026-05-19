"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/website/components/ui/dialog";
import { Input } from "@/website/components/ui/input";
import { Button } from "@/website/components/ui/button";
import type { Product, Size } from "@/website/types";

interface EditProductDialogProps {
  product: Product | null;
  onClose: () => void;
  onSave: (
    slug: string,
    next: {
      price: number;
      compareAtPrice?: number | null;
      inventory: Partial<Record<Size, number>>;
    },
  ) => void;
}

export function EditProductDialog({ product, onClose, onSave }: EditProductDialogProps) {
  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogTitle>{product?.name ?? "Edit product"}</DialogTitle>
        <DialogDescription>
          Update price and per-size inventory. Changes are in-memory for this session
          (Firebase persistence wires in later).
        </DialogDescription>
        {product && <EditForm key={product.slug} product={product} onSave={onSave} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
}

function EditForm({
  product,
  onSave,
  onClose,
}: {
  product: Product;
  onSave: EditProductDialogProps["onSave"];
  onClose: () => void;
}) {
  const [price, setPrice] = React.useState<string>(String(product.price));
  const [compareAt, setCompareAt] = React.useState<string>(
    product.compareAtPrice ? String(product.compareAtPrice) : "",
  );
  const [inventory, setInventory] = React.useState<Partial<Record<Size, number>>>(
    () => ({ ...(product.inventory ?? {}) }),
  );

  const handleInventoryChange = (size: Size, value: string) => {
    const n = value === "" ? 0 : Number(value);
    if (!Number.isFinite(n) || n < 0) return;
    setInventory((prev) => ({ ...prev, [size]: n }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = Number(price);
    if (!Number.isFinite(priceNum) || priceNum < 0) return;
    const compareNum = compareAt.trim() === "" ? null : Number(compareAt);
    onSave(product.slug, {
      price: priceNum,
      compareAtPrice: compareNum === null ? null : Number.isFinite(compareNum) ? compareNum : null,
      inventory,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            Price (USD)
          </span>
          <Input
            type="number"
            min={0}
            step={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            Compare-at (optional)
          </span>
          <Input
            type="number"
            min={0}
            step={1}
            value={compareAt}
            onChange={(e) => setCompareAt(e.target.value)}
            placeholder="—"
          />
        </label>
      </div>

      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
          Inventory per size
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {product.sizes.map((s) => (
            <label key={s} className="flex flex-col gap-1 rounded-md border border-[color:var(--color-border-strong)] bg-transparent px-3 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                {s}
              </span>
              <input
                type="number"
                min={0}
                step={1}
                value={inventory[s] ?? 0}
                onChange={(e) => handleInventoryChange(s, e.target.value)}
                className="bg-transparent text-sm tabular-nums text-white focus:outline-none"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="accent">
          Save changes
        </Button>
      </div>
    </form>
  );
}
