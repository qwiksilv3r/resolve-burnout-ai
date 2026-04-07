interface SimpleInsightCardProps {
  text: string
}

export function SimpleInsightCard({ text }: SimpleInsightCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-card backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.2)] p-6 h-full">
      {/* Soft highlight on top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <p className="relative text-lg leading-relaxed text-foreground text-balance">
        {text}
      </p>
    </div>
  )
}
