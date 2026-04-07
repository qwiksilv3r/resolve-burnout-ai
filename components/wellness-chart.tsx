"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

export default function WellnessChart({ data }) {
  // 🔥 Take last 7 entries only
  const recent = data.slice(-7)

  // 🔥 Smooth data (moving average)
  const chartData = recent.map((entry, index) => {
    const prev = recent[index - 1]

    return {
      day: `D${index + 1}`,
      stress: prev
        ? ((entry.stress + prev.stress) / 2) * 10
        : entry.stress * 10,
      energy: prev
        ? ((entry.energy + prev.energy) / 2) * 10
        : entry.energy * 10,
    }
  })

  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* X Axis */}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            width={30}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: "12px",
              backdropFilter: "blur(12px)",
            }}
          />

          {/* Energy */}
          <Area
            type="monotone"
            dataKey="energy"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#energyGradient)"
            dot={false}
          />

          {/* Stress */}
          <Area
            type="monotone"
            dataKey="stress"
            stroke="#ef4444"
            strokeWidth={2.5}
            fill="url(#stressGradient)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Subtitle */}
      <p className="text-xs text-muted-foreground text-center mt-2">
        Last 7 check-ins
      </p>
    </div>
  )
}