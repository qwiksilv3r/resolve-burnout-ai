type AnalysisResult = {
  risk: "LOW" | "MEDIUM" | "HIGH";
  score: number;
  insight: string;
  actions: string[];
  metrics: {
    avgMood: number;
    avgStress: number;
    avgSleep: number;
    avgEnergy: number;
    moodTrend: number;
    stressTrend: number;
    sleepTrend: number;
    energyTrend: number;
  };
};

export function analyzeData(data: any[]): AnalysisResult {
  if (!data || data.length === 0) {
    return {
      risk: "LOW",
      score: 0,
      insight: "No data yet.",
      actions: [],
      metrics: {
        avgMood: 0,
        avgStress: 0,
        avgSleep: 0,
        avgEnergy: 0,
        moodTrend: 0,
        stressTrend: 0,
        sleepTrend: 0,
        energyTrend: 0,
      },
    };
  }

  const recent = data.slice(-5);

  const avg = (key: string) =>
    recent.reduce((sum, d) => sum + d[key], 0) / recent.length;

  const avgMood = avg("mood");
  const avgStress = avg("stress");
  const avgSleep = avg("sleep");
  const avgEnergy = avg("energy");

  const first = recent[0];
  const last = recent[recent.length - 1];

  const moodTrend = last.mood - first.mood;
  const stressTrend = last.stress - first.stress;
  const sleepTrend = last.sleep - first.sleep;
  const energyTrend = last.energy - first.energy;

  let score = 0;
  const reasons: string[] = [];

  // Latest weighted
  if (last.mood < 4) {
    score += 3;
    reasons.push("very low mood");
  }

  if (last.stress > 8) {
    score += 3;
    reasons.push("extremely high stress");
  }

  if (last.sleep < 5) {
    score += 2;
    reasons.push("low sleep");
  }

  if (last.energy < 4) {
    score += 2;
    reasons.push("low energy");
  }

  // Averages
  if (avgMood < 5) score += 2;
  if (avgStress > 7) score += 2;
  if (avgSleep < 6) score += 2;
  if (avgEnergy < 5) score += 1;

  // Trends
  if (stressTrend > 2) score += 2;
  if (moodTrend < -2) score += 2;
  if (sleepTrend < -2) score += 1;
  if (energyTrend < -2) score += 1;

  const normalizedScore = Math.min(10, Math.round(score));

  let risk: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  if (normalizedScore >= 7) risk = "HIGH";
  else if (normalizedScore >= 4) risk = "MEDIUM";

  const insight =
    reasons.length > 0
      ? `Your recent patterns show ${reasons.slice(0, 3).join(", ")}.`
      : "Your mental health looks stable.";

  const actions: string[] = [];

  if (last.sleep < 6) actions.push("Sleep at least 7–8 hours");
  if (last.stress > 7) actions.push("Take regular breaks");
  if (last.mood < 5) actions.push("Do a relaxing activity");
  if (last.energy < 5) actions.push("Manage workload and rest");

  if (actions.length === 0) {
    actions.push("Maintain your routine");
  }
  console.log("FINAL SCORE:", normalizedScore);
  console.log("FINAL DATA:", data);
  return {
    risk,
    score: normalizedScore,
    insight,
    actions,
    metrics: {
      avgMood,
      avgStress,
      avgSleep,
      avgEnergy,
      moodTrend,
      stressTrend,
      sleepTrend,
      energyTrend,
    },
  };
}