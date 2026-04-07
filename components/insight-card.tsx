"use client"

import { Sparkles } from "lucide-react"

interface InsightCardProps {
  title: string
  insight: string
  trend?: "positive" | "negative" | "neutral"
}

export function InsightCard({ title, insight, trend = "neutral" }: InsightCardProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: trend === "positive" 
            ? "linear-gradient(135deg, rgba(52, 199, 89, 0.15), transparent 60%)"
            : trend === "negative"
            ? "linear-gradient(135deg, rgba(255, 59, 48, 0.15), transparent 60%)"
            : "linear-gradient(135deg, rgba(0, 113, 227, 0.15), transparent 60%)"
        }}
      />
      
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
        </div>
        
        <p className="text-lg text-foreground leading-relaxed text-balance">
          {insight}
        </p>
        
        {trend !== "neutral" && (
          <div className="mt-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              trend === "positive" ? "bg-accent" : "bg-destructive"
            }`} />
            <span className={`text-sm font-medium ${
              trend === "positive" ? "text-accent" : "text-destructive"
            }`}>
              {trend === "positive" ? "Improving" : "Needs attention"}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
