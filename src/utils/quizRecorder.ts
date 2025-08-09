import { supabase } from "@/integrations/supabase/client";
import { PointsManager } from "@/utils/pointsManager";
import { toast } from "sonner";

const POINTS_RULES = {
  finishedThresholdPercent: 80,
  badge1: 100,
  badge2: 500,
};

export type RecordPayload = {
  category: string;
  activityName?: string;
  correct: number;
  total: number;
};

export async function recordQuizResultAuto({
  category,
  activityName = "Quiz",
  correct,
  total,
}: RecordPayload): Promise<{ pointsAwarded: number; percent: number }> {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  try {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;
    const child = PointsManager.getCurrentChild();

    if (!user || !child) {
      toast.error("Mangler bruger eller valgt barn.");
      return { pointsAwarded: 0, percent };
    }

    // Use centralized point calculation to stay consistent across the app
    const points = PointsManager.calculatePoints(correct, total, correct === total);

    // Persist via PointsManager (handles Supabase/local fallbacks internally and writes quiz_results)
    PointsManager.setCurrentChild(child);
    await PointsManager.addScore({
      category,
      activity: activityName,
      score: points,
      maxScore: 100,
      timestamp: new Date().toISOString(),
    });

    // Upsert progress flags (finished based on threshold)
    const finished = percent >= POINTS_RULES.finishedThresholdPercent;
    const { error: upsertErr } = await supabase.from("progress").upsert(
      {
        user_id: user.id,
        child_name: child,
        category,
        category_enabled: true,
        finished,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,child_name,category" }
    );
    if (upsertErr) throw upsertErr;

    // Toast + simple badge milestones
    const progress = await PointsManager.getProgress();
    if (progress.totalPoints >= POINTS_RULES.badge2) {
      toast.success("Ny badge: Vidunderlig Elev! ⭐️");
    } else if (progress.totalPoints >= POINTS_RULES.badge1) {
      toast.success("Ny badge: Flittig Lærer! 🌟");
    } else {
      toast.success(`Resultat gemt! +${points} point`);
    }

    return { pointsAwarded: points, percent };
  } catch (err) {
    console.error("recordQuizResultAuto error:", err);
    toast.error("Kunne ikke gemme resultatet.");
    return { pointsAwarded: 0, percent };
  }
}
