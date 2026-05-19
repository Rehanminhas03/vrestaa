"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PALETTE = [
  "#c7ff3e", // accent
  "#60a5fa", // blue
  "#fbbf24", // amber
  "#c084fc", // violet
  "#34d399", // emerald
  "#ff7373", // danger
];

interface DonutChartProps {
  data: { name: string; value: number }[];
  height?: number;
}

export function DonutChart({ data, height = 220 }: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius="65%"
            outerRadius="95%"
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#111113",
              border: "1px solid #232327",
              borderRadius: 8,
              fontSize: 12,
              color: "#fff",
            }}
            formatter={(value, name) => {
              const v = Number(value ?? 0);
              return [`${v} (${Math.round((v / (total || 1)) * 100)}%)`, String(name)];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export { PALETTE as DONUT_PALETTE };
