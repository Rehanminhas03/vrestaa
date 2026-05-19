import type { Metadata } from "next";
import { Topbar } from "@/admin/components/topbar";
import { CustomersTable } from "@/admin/components/customers-table";
import { ADMIN_CUSTOMERS } from "@/admin/data/customers";

export const metadata: Metadata = { title: "Customers" };

export default function AdminCustomersPage() {
  return (
    <>
      <Topbar
        title="Customers"
        description={`${ADMIN_CUSTOMERS.length} unique buyers · click for order history`}
      />
      <div className="p-5 md:p-8">
        <CustomersTable customers={ADMIN_CUSTOMERS} />
      </div>
    </>
  );
}
