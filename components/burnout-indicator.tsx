"use client"

import { useEffect, useState } from "react"

interface BurnoutIndicatorProps {
  value: number
  maxValue?: number
}

export function BurnoutIndicator({ value, maxValue = 100 }: BurnoutIndicatorProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const percentage = (animatedValue / maxValue) * 100
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  const getStatus = () => {
    if (percentage <= 30) return { label: "Low", color: "text-accent" }
    if (percentage <= 60) return { label: "Moderate", color: "text-chart-4" }
    return { label: "Elevated", color: "text-destructive" }
  }

  const status = getStatus()
  
  // Calculate the stroke dasharray for the circular progress
  const radius = 85
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      {/* Ambient glow */}
      <div 
        className="absolute inset-0 blur-3xl opacity-30 rounded-full"
        style={{
          background: percentage <= 30 
            ? "radial-gradient(circle, rgba(52, 199, 89, 0.4), transparent 70%)"
            : percentage <= 60
            ? "radial-gradient(circle, rgba(255, 149, 0, 0.4), transparent 70%)"
            : "radial-gradient(circle, rgba(255, 59, 48, 0.4), transparent 70%)"
        }}
      />
      
      <svg className="w-52 h-52 -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-muted/50"
        />
        {/* Progress circle with gradient */}
        <defs>
          <linearGradient id="burnoutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={percentage <= 30 ? "#34c759" : percentage <= 60 ? "#ff9500" : "#ff3b30"} />
            <stop offset="100%" stopColor={percentage <= 30 ? "#0071e3" : percentage <= 60 ? "#ff6b00" : "#ff2d55"} />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#burnoutGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-semibold tracking-tight text-foreground">
          {Math.round(animatedValue)}
        </span>
        <span className="text-sm text-muted-foreground mt-1">of {maxValue}</span>
        <span className={`text-lg font-medium mt-2 ${status.color}`}>
          {status.label}
        </span>
      </div>
    </div>
  )
}
