"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

const metrics = [
  { id: "mood", label: "Mood", color: "#a855f7", emoji: "😊" },
  { id: "sleep", label: "Sleep", color: "#3b82f6", emoji: "😴" },
  { id: "energy", label: "Energy", color: "#22c55e", emoji: "⚡" },
  { id: "stress", label: "Stress", color: "#ef4444", emoji: "😰" },
]

export default function DailyCheckIn() {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const [values, setValues] = useState<Record<string, number>>({
    mood: 70,
    sleep: 60,
    energy: 50,
    stress: 30,
  })

  const handleChange = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  // ✅ ADDED LOGIC (NO UI CHANGE)
  const handleSubmit = () => {
    const entry = {
      mood: Math.round(values.mood / 10),
      sleep: Math.round(values.sleep / 10),
      energy: Math.round(values.energy / 10),
      stress: Math.round(values.stress / 10),
    }

    const existing = localStorage.getItem("mentalData")
    const parsed = existing ? JSON.parse(existing) : []

    const updated = [...parsed, entry]

    localStorage.setItem("mentalData", JSON.stringify(updated))

    window.location.href = "/";
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-lg shadow-foreground/5">
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

      {/* Header - Clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-foreground/5"
      >
        <div>
          <h2 className="text-lg font-semibold text-foreground">Daily Check-In</h2>
          <p className="text-sm text-muted-foreground">How are you feeling today?</p>
        </div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </div>
      </button>

      {/* Expandable Content */}
      <div
        className={`relative grid transition-all duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 space-y-5">
            {/* Divider */}
            <div className="h-px bg-border/50" />

            {/* Sliders */}
            {metrics.map((metric) => (
              <div key={metric.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{metric.emoji}</span>
                    <span className="text-sm font-medium text-foreground">{metric.label}</span>
                  </div>
                  <span
                    className="text-sm font-semibold tabular-nums"
                    style={{ color: metric.color }}
                  >
                    {values[metric.id]}%
                  </span>
                </div>

                {/* Custom Slider */}
                <div className="relative h-2 w-full">
                  <div className="absolute inset-0 rounded-full bg-muted/60" />

                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-150"
                    style={{
                      width: `${values[metric.id]}%`,
                      backgroundColor: metric.color,
                      opacity: 0.8,
                    }}
                  />

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={values[metric.id]}
                    onChange={(e) =>
                      handleChange(metric.id, parseInt(e.target.value))
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-md border-2 transition-all duration-150 pointer-events-none"
                    style={{
                      left: `calc(${values[metric.id]}% - 10px)`,
                      borderColor: metric.color,
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Save Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-2 py-3 rounded-2xl bg-primary text-primary-foreground font-medium text-sm transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Save Check-In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}