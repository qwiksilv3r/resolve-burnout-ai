"use client";
import { useEffect, useState } from "react";
import { analyzeData } from "../lib/analysis";
import DailyCheckIn from "@/components/daily-check-in"
import { BurnoutIndicator } from "@/components/burnout-indicator"
import { RiskIndicatorCard } from "@/components/risk-indicator-card"
import { MoodTrendCard } from "@/components/mood-trend-card"
import WellnessChart from "@/components/wellness-chart"
import { InsightCard } from "@/components/insight-card"
import { SimpleInsightCard } from "@/components/simple-insight-card"
import { ActionSuggestions } from "@/components/action-suggestions"
import { RecommendationCard } from "@/components/recommendation-card"
import { GlassCard } from "@/components/glass-card"
import { Brain, Calendar, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation";

export default function MentalHealthDashboard() {
  
  

  const [userData, setUserData] = useState<any[]>([]);

  // 🔥 ALWAYS LOAD LATEST DATA
  const loadData = () => {
    const stored = localStorage.getItem("mentalData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserData(parsed);
    }
  };

  useEffect(() => {
    loadData();

    // 🔥 listen for storage updates
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
    };
  }, []);

  const result = analyzeData(userData);

  console.log("LIVE DATA:", userData);
  console.log("LIVE RESULT:", result);
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-primary/10 backdrop-blur-sm">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Resolve
            </h1>
          </div>
          <p className="text-muted-foreground ml-14">
            You feel it late. We detect it early.
          </p>
        </header>

        {/* Daily Check-In */}
        <div className="mb-6">
          <DailyCheckIn />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Risk Indicator Card - Minimal Apple Style */}
          <div className="lg:col-span-5 space-y-6">
            <RiskIndicatorCard 
            score={result.score}
            level={result.risk}
            />
            
            {/* Circular Burnout Gauge */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Burnout Score</h2>
                  <p className="text-sm text-muted-foreground">Current assessment</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Today</span>
                </div>
              </div>
              <BurnoutIndicator value={result.score*10} maxValue={100} />
            </GlassCard>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mood Trend Card - Minimal */}
            <MoodTrendCard />

            {/* Weekly Trends Chart */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Weekly Trends</h2>
                  <p className="text-sm text-muted-foreground">Energy vs Stress levels</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-accent font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12% energy</span>
                </div>
              </div>
              <WellnessChart data={userData} />
            </GlassCard>
          </div>

          {/* Row 3: Insights */}
          <div className="lg:col-span-5 flex">
            <SimpleInsightCard 
              text="Your stress levels tend to peak mid-week. Consider scheduling lighter tasks on Wednesdays to maintain balance."
            />
          </div>

          <div className="lg:col-span-7 flex">
            <GlassCard className="flex-1">
              <InsightCard
                title="AI Insight"
                insight={result.insight}
                trend={result.risk === "HIGH" ? "negative" : "positive"}
              />
            </GlassCard>
          </div>

          {/* Row 4: Actions */}
          <div className="lg:col-span-5 flex">
            <RecommendationCard />
          </div>

          <div className="lg:col-span-7 flex">
            <GlassCard className="flex-1 p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-foreground">Suggested Actions</h2>
                <p className="text-sm text-muted-foreground">Personalized recommendations for you</p>
              </div>
              <ActionSuggestions actions={result.actions} />
            </GlassCard>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Sleep Quality", value: "7.2h", subtext: "avg this week" },
            { label: "Mindful Minutes", value: "45", subtext: "today" },
            { label: "Active Days", value: "5/7", subtext: "this week" },
            { label: "Mood Score", value: "8.1", subtext: "trending up" },
          ].map((stat) => (
            <GlassCard key={stat.label} className="p-5 text-center">
              <p className="text-2xl sm:text-3xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm font-medium text-foreground mt-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.subtext}</p>
            </GlassCard>
          ))}
        </div>
      </main>
    </div>
  )
}
