import type { Metadata } from "next";
import { Topbar } from "@/admin/components/topbar";
import { ProductsTable } from "@/admin/components/products-table";
import { PRODUCTS } from "@/website/data/products";

export const metadata: Metadata = { title: "Products" };

export default function AdminProductsPage() {
  return (
    <>
      <Topbar
        title="Products"
        description={`${PRODUCTS.length} active SKUs · edit price and inventory`}
      />
      <div className="p-5 md:p-8">
        <ProductsTable products={PRODUCTS} />
      </div>
    </>
  );
}
