import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Topbar } from "@/admin/components/topbar";
import { OrderDetail } from "@/admin/components/order-detail";
import { ADMIN_ORDER_BY_ID } from "@/admin/data/orders";
import { formatDate } from "@/website/lib/format";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const order = ADMIN_ORDER_BY_ID[id];
  return { title: order ? order.number : "Order" };
}

export default async function AdminOrderDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const order = ADMIN_ORDER_BY_ID[id];
  if (!order) notFound();

  return (
    <>
      <Topbar
        title={order.number}
        description={`Placed ${formatDate(order.createdAt)} · ${order.customer.name}`}
        actions={
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1 rounded-md border border-[color:var(--color-border-strong)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-white hover:text-white"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            All orders
          </Link>
        }
      />
      <div className="p-5 md:p-8">
        <OrderDetail order={order} />
      </div>
    </>
  );
}
