"use client"

import { Moon, Wind, Timer, Footprints, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Action {
  icon: LucideIcon
  title: string
  description: string
  duration: string
  gradient: string
}

const actions: Action[] = [
  {
    icon: Wind,
    title: "Breathing Exercise",
    description: "4-7-8 calming technique",
    duration: "5 min",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Footprints,
    title: "Mindful Walk",
    description: "Get outside and reset",
    duration: "15 min",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Timer,
    title: "Focus Break",
    description: "Step away from screens",
    duration: "10 min",
    gradient: "from-chart-4/20 to-chart-4/5",
  },
  {
    icon: Moon,
    title: "Power Nap",
    description: "Quick restorative rest",
    duration: "20 min",
    gradient: "from-chart-5/20 to-chart-5/5",
  },
]

export function ActionSuggestions() {
  return (
    <div className="space-y-3">
      {actions.map((action) => (
        <button
          key={action.title}
          className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:border-white/60 dark:hover:border-white/20 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
        >
          <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient}`}>
            <action.icon className="w-5 h-5 text-foreground" />
          </div>
          
          <div className="flex-1 text-left">
            <h4 className="font-medium text-foreground">{action.title}</h4>
            <p className="text-sm text-muted-foreground">{action.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              {action.duration}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </div>
        </button>
      ))}
    </div>
  )
}
