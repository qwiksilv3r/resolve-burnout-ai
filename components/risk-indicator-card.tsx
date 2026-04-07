"use client"

type RiskLevel = "LOW" | "MEDIUM" | "HIGH"

interface RiskIndicatorCardProps {
  level?: RiskLevel
  score?: number
}

export function RiskIndicatorCard({
  level = "LOW",
  score = 0,
}: RiskIndicatorCardProps) {

  const getStatusStyles = () => {
    switch (level) {
      case "LOW":
        return {
          textColor: "text-emerald-500",
          dotColor: "bg-emerald-500",
        }
      case "MEDIUM":
        return {
          textColor: "text-amber-500",
          dotColor: "bg-amber-500",
        }
      case "HIGH":
        return {
          textColor: "text-red-500",
          dotColor: "bg-red-500",
        }
    }
  }

  const styles = getStatusStyles()

  const percentage = (score / 10) * 100

  return (
    <div
      className="
        relative overflow-hidden
        rounded-3xl
        bg-card backdrop-blur-2xl
        border border-white/20 dark:border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]
        p-8
      "
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative flex flex-col gap-4">

        {/* Title */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-muted-foreground uppercase">
            Burnout Risk
          </h3>
          <span className={`w-2.5 h-2.5 rounded-full ${styles.dotColor}`} />
        </div>

        {/* Level */}
        <p className={`text-5xl font-bold ${styles.textColor}`}>
          {level}
        </p>

        {/* 🔥 Progress bar */}
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`${styles.dotColor} h-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* 🔥 Score */}
        <p className="text-sm text-muted-foreground">
          Score: {score}/10
        </p>

        <p className="text-sm text-muted-foreground">
          Based on recent patterns
        </p>
      </div>
    </div>
  )
}