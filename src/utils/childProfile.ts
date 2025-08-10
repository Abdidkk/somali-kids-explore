
import { supabase } from "@/integrations/supabase/client";

/**
 * Resolve the latest-created child profile id for a given (userId, childName).
 * Returns null if not found.
 */
export async function resolveChildProfileIdByName(userId: string, childName: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("child_profiles")
    .select("id")
    .eq("parent_user_id", userId)
    .eq("name", childName)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.warn("resolveChildProfileIdByName error:", error);
    return null;
  }
  return data?.id ?? null;
}

