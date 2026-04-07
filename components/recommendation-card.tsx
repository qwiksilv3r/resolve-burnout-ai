interface RecommendationCardProps {
  title?: string
  actions?: string[]
}

export function RecommendationCard({
  title = "Suggested for you",
  actions = [
    "Take a 10-minute walk outside",
    "Try a short breathing exercise",
    "Write down 3 things you're grateful for"
  ]
}: RecommendationCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-card backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.2)] p-6 h-full">
      {/* Soft highlight on top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      <div className="relative space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</h3>
        
        <ul className="space-y-3">
          {actions.map((action, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-base text-foreground leading-relaxed">
                {action}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
