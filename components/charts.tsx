"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function PerformanceChart({ data }: { data: { week: string; attendance: number; score: number }[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.52} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--grid-line)" vertical={false} />
          <XAxis dataKey="week" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} domain={[3.5, 5]} />
          <Tooltip
            contentStyle={{
              background: "var(--panel-strong)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              color: "var(--foreground-strong)",
            }}
          />
          <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fill="url(#scoreGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RatingChart({ data }: { data: { name: string; averageScore: number }[] }) {
  const colors = ["var(--primary)", "var(--secondary)", "var(--success)", "#94a3b8", "#94a3b8"];

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="var(--grid-line)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} tickLine={false} domain={[3.5, 5]} />
          <Tooltip
            contentStyle={{
              background: "var(--panel-strong)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              color: "var(--foreground-strong)",
            }}
          />
          <Bar dataKey="averageScore" radius={[14, 14, 0, 0]} maxBarSize={48}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index] ?? "#6d82a8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
