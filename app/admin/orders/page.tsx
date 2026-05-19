import type { Metadata } from "next";
import { Topbar } from "@/admin/components/topbar";
import { OrdersTable } from "@/admin/components/orders-table";
import { ADMIN_ORDERS } from "@/admin/data/orders";

export const metadata: Metadata = { title: "Orders" };

export default function AdminOrdersPage() {
  return (
    <>
      <Topbar
        title="Orders"
        description={`${ADMIN_ORDERS.length} total · filter, search, and drill in`}
      />
      <div className="p-5 md:p-8">
        <OrdersTable orders={ADMIN_ORDERS} />
      </div>
    </>
  );
}
