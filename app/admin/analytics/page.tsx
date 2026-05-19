import type { Metadata } from "next";
import { Topbar } from "@/admin/components/topbar";
import { AnalyticsView } from "@/admin/components/analytics-view";
import { revenueSeries, topProducts, salesByCategory } from "@/admin/lib/metrics";
import type { CategoryRevenueRow, RevenuePoint, TopProductRow } from "@/admin/lib/metrics";

export const metadata: Metadata = { title: "Analytics" };

const ONE_DAY = 24 * 60 * 60 * 1000;
const RANGES = [7, 30, 90];

export default function AdminAnalyticsPage() {
  const now = new Date();
  const rangeSeries: Record<number, RevenuePoint[]> = {};
  const rangeTop: Record<number, TopProductRow[]> = {};
  const rangeCategory: Record<number, CategoryRevenueRow[]> = {};

  for (const days of RANGES) {
    const from = new Date(+now - days * ONE_DAY);
    rangeSeries[days] = revenueSeries(from, now);
    rangeTop[days] = topProducts(10, from, now);
    rangeCategory[days] = salesByCategory(from, now);
  }

  return (
    <>
      <Topbar title="Analytics" description="Deeper than the dashboard · slice by range" />
      <div className="p-5 md:p-8">
        <AnalyticsView
          rangeSeries={rangeSeries}
          rangeTop={rangeTop}
          rangeCategory={rangeCategory}
        />
      </div>
    </>
  );
}
