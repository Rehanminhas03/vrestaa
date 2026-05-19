"use client";

import type { Product } from "@/website/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/website/components/ui/tabs";

interface ProductTabsProps {
  product: Product;
}

const SIZE_GUIDE = [
  { size: "XS", chest: "32-34", waist: "26-28", length: "26" },
  { size: "S", chest: "34-36", waist: "28-30", length: "27" },
  { size: "M", chest: "36-38", waist: "30-32", length: "28" },
  { size: "L", chest: "38-40", waist: "32-34", length: "29" },
  { size: "XL", chest: "40-42", waist: "34-36", length: "30" },
  { size: "XXL", chest: "42-44", waist: "36-38", length: "31" },
];

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="sizing">Size guide</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Description
          </h4>
          <p className="text-sm leading-relaxed text-[color:var(--color-fg-muted)]">
            {product.description}
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Features
          </h4>
          <ul className="space-y-2 text-sm text-[color:var(--color-fg-muted)]">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
            SKU · {product.sku}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="sizing">
        <div className="overflow-hidden rounded-lg border border-[color:var(--color-border)]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04]">
              <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Chest (in)</th>
                <th className="px-4 py-3">Waist (in)</th>
                <th className="px-4 py-3">Length (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-border)]">
              {SIZE_GUIDE.map((row) => (
                <tr key={row.size} className="text-white/85">
                  <td className="px-4 py-3 font-medium text-white">{row.size}</td>
                  <td className="px-4 py-3 tabular-nums">{row.chest}</td>
                  <td className="px-4 py-3 tabular-nums">{row.waist}</td>
                  <td className="px-4 py-3 tabular-nums">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-[color:var(--color-fg-muted)]">
          Compression pieces fit one size tighter by design — size up for a relaxed feel.
        </p>
      </TabsContent>

      <TabsContent value="shipping" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Shipping
          </h4>
          <ul className="space-y-2 text-sm text-[color:var(--color-fg-muted)]">
            <li>• Free standard shipping on US orders over $120</li>
            <li>• Express: 1â€“2 business days</li>
            <li>• International express: 3â€“6 business days, DDP</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Returns
          </h4>
          <ul className="space-y-2 text-sm text-[color:var(--color-fg-muted)]">
            <li>• 30-day returns on unworn items</li>
            <li>• Free US returns via the account portal</li>
            <li>• Size exchanges are prioritised</li>
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  );
}
