"use client"

import { Line, LineChart, ResponsiveContainer } from "recharts"

const moodData = [
  { day: "Mon", mood: 65 },
  { day: "Tue", mood: 72 },
  { day: "Wed", mood: 68 },
  { day: "Thu", mood: 58 },
  { day: "Fri", mood: 74 },
  { day: "Sat", mood: 82 },
  { day: "Sun", mood: 78 },
]

export function MoodTrendCard() {
  const currentMood = moodData[moodData.length - 1].mood
  const previousMood = moodData[moodData.length - 2].mood
  const trend = currentMood >= previousMood ? "up" : "down"
  const trendValue = Math.abs(currentMood - previousMood)

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.2)] p-6">
      {/* Soft highlight on top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Mood Trend</p>
            <h3 className="text-2xl font-semibold text-foreground">This Week</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span 
              className={`text-sm font-medium ${
                trend === "up" ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {trend === "up" ? "+" : "-"}{trendValue}%
            </span>
            <svg 
              className={`w-4 h-4 ${
                trend === "up" ? "text-emerald-500" : "text-rose-500 rotate-180"
              }`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </div>

        {/* Chart */}
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={moodData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="moodLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="mood"
                stroke="url(#moodLineGradient)"
                strokeWidth={3}
                dot={false}
                activeDot={{ 
                  r: 6, 
                  fill: "#a78bfa",
                  stroke: "#fff",
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom labels */}
        <div className="flex justify-between mt-4 px-1">
          {moodData.map((item, index) => (
            <span 
              key={item.day} 
              className={`text-xs ${
                index === moodData.length - 1 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground"
              }`}
            >
              {item.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
