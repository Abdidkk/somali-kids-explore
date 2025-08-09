import { PointsManager } from '@/utils/pointsManager';

interface RecordQuizResultParams {
  userId: string;
  childName: string;
  category: string;
  score: number;      // correct answers or raw score
  maxScore: number;   // total questions or max possible
  activity?: string;  // optional activity label
}

// Unified helper to record a quiz result and award points consistently
// Uses PointsManager to keep logic centralized and in sync with dashboards
export async function recordQuizResult({
  userId,
  childName,
  category,
  score,
  maxScore,
  activity = 'Quiz',
}: RecordQuizResultParams) {
  // Set the current child context
  PointsManager.setCurrentChild(childName);

  // Calculate earned points using existing logic (includes optional bonus handling)
  const earnedPoints = PointsManager.calculatePoints(score, maxScore, score === maxScore);

  // Persist via PointsManager (handles Supabase/local fallbacks internally)
  await PointsManager.addScore({
    category,
    activity,
    score: earnedPoints,
    maxScore: 100, // keep normalized to 100 like existing components
    timestamp: new Date().toISOString(),
  });

  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  return { pointsAwarded: earnedPoints, percent };
}
