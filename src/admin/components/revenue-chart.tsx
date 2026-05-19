"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RevenuePoint } from "@/admin/lib/metrics";
import { formatCurrency } from "@/website/lib/format";

const ACCENT = "#c7ff3e";
const MUTED = "#b8b8be";
const BORDER = "#232327";

interface RevenueChartProps {
  data: RevenuePoint[];
  height?: number;
}

export function RevenueChart({ data, height = 280 }: RevenueChartProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: -8 }}>
          <defs>
            <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={BORDER} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            stroke={MUTED}
            tick={{ fill: MUTED, fontSize: 11 }}
            tickFormatter={(v) => {
              const d = new Date(String(v));
              return `${d.toLocaleString("en-US", { month: "short" })} ${d.getDate()}`;
            }}
            minTickGap={28}
            tickLine={false}
            axisLine={{ stroke: BORDER }}
          />
          <YAxis
            stroke={MUTED}
            tick={{ fill: MUTED, fontSize: 11 }}
            tickFormatter={(v) => `$${(Number(v) / 1000).toFixed(1)}k`}
            tickLine={false}
            axisLine={false}
            width={56}
          />
          <Tooltip
            cursor={{ stroke: "#fff", strokeOpacity: 0.1 }}
            contentStyle={{
              background: "#111113",
              border: `1px solid ${BORDER}`,
              borderRadius: 8,
              fontSize: 12,
              color: "#fff",
            }}
            labelFormatter={(label) =>
              new Date(String(label)).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
            }
            formatter={(value, key) => {
              const v = Number(value ?? 0);
              return key === "revenue"
                ? [formatCurrency(v), "Revenue"]
                : [String(v), "Orders"];
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={ACCENT}
            strokeWidth={2}
            fill="url(#revenue-fill)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
