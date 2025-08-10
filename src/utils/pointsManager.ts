import { supabase } from "@/integrations/supabase/client";
import { resolveChildProfileIdByName } from "@/utils/childProfile";

// Points Manager for Learning Activities - Now with Supabase backend
export interface ActivityScore {
  category: string;
  activity: string;
  score: number; // points awarded
  maxScore: number; // normalized max (often 100)
  timestamp: string;
  timeSpent?: number; // in seconds
  // Raw quiz metrics (optional): correct answers and total questions
  rawCorrect?: number;
  rawTotal?: number;
}

export interface ProgressData {
  totalPoints: number;
  activitiesCompleted: number;
  categoryScores: Record<string, number>;
  recentScores: ActivityScore[];
}

export interface QuizResult {
  id?: string;
  category: string;
  activity: string;
  score: number;
  maxScore: number;
  answers: any[];
  completionTime?: number;
  timestamp: string;
}

export class PointsManager {
  private static STORAGE_KEY = 'learning_progress';
  private static currentChildName = 'default'; // Default child name
  private static currentChildId: string | null = null; // New: track child profile id when available

  // Set current child name for multi-child support
  static setCurrentChild(childName: string): void {
    this.currentChildName = childName;
    // Reset id when name is explicitly set without id
    this.currentChildId = null;
  }

  // New: Set current child name + id together (preferred)
  static setCurrentChildWithId(childName: string, childId: string): void {
    this.currentChildName = childName;
    this.currentChildId = childId;
  }

  // Get current child name
  static getCurrentChild(): string {
    return this.currentChildName;
  }

  // New: Get current child id (may be null)
  static getCurrentChildId(): string | null {
    return this.currentChildId;
  }

  // Internal helper: ensure we have a child id for the current child context
  private static async ensureCurrentChildId(userId: string): Promise<string | null> {
    if (this.currentChildId) return this.currentChildId;
    if (!this.currentChildName) return null;
    const resolved = await resolveChildProfileIdByName(userId, this.currentChildName);
    if (resolved) {
      this.currentChildId = resolved;
      console.log("PointsManager: resolved child id for", this.currentChildName, "=>", resolved);
    } else {
      console.warn("PointsManager: could not resolve child id for", this.currentChildName);
    }
    return this.currentChildId;
  }

  // Get current progress from Supabase
  static async getProgress(): Promise<ProgressData> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Fallback to localStorage if not authenticated
        return this.getLocalProgress();
      }

      // Prefer filtering by child_profile_id if we have it
      const childId = await this.ensureCurrentChildId(user.id);

      let progressQuery = supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id);

      if (childId) {
        progressQuery = progressQuery.eq('child_profile_id', childId);
      } else {
        progressQuery = progressQuery.eq('child_name', this.currentChildName);
      }

      const { data: progressData, error } = await progressQuery;

      if (error) {
        console.error('Error loading progress from Supabase:', error);
        return this.getLocalProgress();
      }

      // Convert database format to ProgressData format
      const totalPoints = (progressData || []).reduce((sum, p: any) => sum + (p.total_points ?? 0), 0);
      const activitiesCompleted = (progressData || []).reduce((sum, p: any) => sum + (p.activities_completed ?? 0), 0);
      const categoryScores: Record<string, number> = {};
      
      (progressData || []).forEach((p: any) => {
        categoryScores[p.category] = p.total_points ?? 0;
      });

      // Get recent quiz results
      let quizQuery = supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (childId) {
        quizQuery = quizQuery.eq('child_profile_id', childId);
      } else {
        quizQuery = quizQuery.eq('child_name', this.currentChildName);
      }

      const { data: quizResults } = await quizQuery;

      const recentScores: ActivityScore[] = (quizResults || []).map((qr: any) => ({
        category: qr.category,
        activity: qr.activity_name,
        score: qr.score,
        maxScore: qr.max_score,
        timestamp: qr.created_at,
        timeSpent: qr.completion_time
      }));

      return {
        totalPoints,
        activitiesCompleted,
        categoryScores,
        recentScores
      };
    } catch (error) {
      console.error('Error loading progress:', error);
      return this.getLocalProgress();
    }
  }

  // Fallback to localStorage
  private static getLocalProgress(): ProgressData {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
    }
    
    return {
      totalPoints: 0,
      activitiesCompleted: 0,
      categoryScores: {},
      recentScores: []
    };
  }

  // Add points for an activity
  static async addScore(activityScore: ActivityScore): Promise<void> {
    console.log('PointsManager.addScore called with:', {
      category: activityScore.category,
      activity: activityScore.activity,
      score: activityScore.score,
      currentChild: this.currentChildName,
      currentChildId: this.currentChildId,
      timestamp: new Date().toISOString()
    });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No user found, falling back to localStorage');
        this.addLocalScore(activityScore);
        return;
      }

      // Ensure we have child_profile_id if possible
      const childId = await this.ensureCurrentChildId(user.id);

      console.log('Saving score to Supabase for user:', user.id, 'child:', this.currentChildName, 'childId:', childId);

      // Update or create progress record
      let progressSelect = supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('category', activityScore.category);

      if (childId) {
        progressSelect = progressSelect.eq('child_profile_id', childId);
      } else {
        progressSelect = progressSelect.eq('child_name', this.currentChildName);
      }

      const { data: existingProgress } = await progressSelect.maybeSingle();

      if (existingProgress) {
        // Update existing progress
        await supabase
          .from('progress')
          .update({
            total_points: (existingProgress.total_points || 0) + activityScore.score,
            activities_completed: (existingProgress.activities_completed || 0) + 1,
            time_spent: (existingProgress.time_spent || 0) + (activityScore.timeSpent || 0),
            // keep track of name and id consistently
            child_name: this.currentChildName,
            child_profile_id: childId ?? existingProgress.child_profile_id ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingProgress.id);
      } else {
        // Create new progress record
        await supabase
          .from('progress')
          .insert({
            user_id: user.id,
            child_name: this.currentChildName,
            child_profile_id: childId,
            category: activityScore.category,
            total_points: activityScore.score,
            activities_completed: 1,
            time_spent: activityScore.timeSpent || 0,
            updated_at: new Date().toISOString(),
          });
      }

      // Add quiz result
      const quizResult = await supabase
        .from('quiz_results')
        .insert({
          user_id: user.id,
          child_name: this.currentChildName,
          child_profile_id: childId,
          category: activityScore.category,
          activity_name: activityScore.activity,
          // Store raw performance if provided; fallback to normalized values
          score: activityScore.rawCorrect ?? activityScore.score,
          max_score: activityScore.rawTotal ?? activityScore.maxScore,
          points_awarded: activityScore.score,
          answers: [],
          completion_time: activityScore.timeSpent
        });

      console.log('Score saved successfully to Supabase for child:', this.currentChildName, 'childId:', childId);
      
      if ((quizResult as any).error) {
        console.error('Error inserting quiz result:', (quizResult as any).error);
      } else {
        console.log('Quiz result inserted successfully');
      }

    } catch (error) {
      console.error('Error saving score to Supabase:', error);
      this.addLocalScore(activityScore);
    }
  }

  // Fallback to localStorage
  private static addLocalScore(activityScore: ActivityScore): void {
    const progress = this.getLocalProgress();
    progress.recentScores.unshift(activityScore);
    if (progress.recentScores.length > 50) {
      progress.recentScores = progress.recentScores.slice(0, 50);
    }
    progress.totalPoints += activityScore.score;
    progress.activitiesCompleted += 1;
    if (!progress.categoryScores[activityScore.category]) {
      progress.categoryScores[activityScore.category] = 0;
    }
    progress.categoryScores[activityScore.category] += activityScore.score;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress to localStorage:', error);
    }
  }

  // Get category score
  static async getCategoryScore(category: string): Promise<number> {
    const progress = await this.getProgress();
    return progress.categoryScores[category] || 0;
  }

  // Get total points
  static async getTotalPoints(): Promise<number> {
    const progress = await this.getProgress();
    return progress.totalPoints;
  }

  // Check if category is enabled for current child
  static async isCategoryEnabled(category: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return true;

      const childId = await this.ensureCurrentChildId(user.id);

      let query = supabase
        .from('progress')
        .select('category_enabled')
        .eq('user_id', user.id)
        .eq('category', category)
        .limit(1);

      if (childId) {
        query = query.eq('child_profile_id', childId);
      } else {
        query = query.eq('child_name', this.currentChildName);
      }

      const { data: progressData } = await query.maybeSingle();

      return progressData?.category_enabled ?? true;
    } catch (error) {
      console.error('Error checking category status:', error);
      return true;
    }
  }

  // Toggle category enabled/disabled (for parents)
  static async toggleCategory(category: string, enabled: boolean): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user found when toggling category');
        return;
      }

      console.log('PointsManager: Toggling category', category, 'to', enabled, 'for child', this.currentChildName, 'childId', this.currentChildId);

      const childId = await this.ensureCurrentChildId(user.id);

      let selectQuery = supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('category', category)
        .limit(1);

      if (childId) {
        selectQuery = selectQuery.eq('child_profile_id', childId);
      } else {
        selectQuery = selectQuery.eq('child_name', this.currentChildName);
      }

      const { data: existingProgress } = await selectQuery.maybeSingle();

      if (existingProgress) {
        const { error } = await supabase
          .from('progress')
          .update({ category_enabled: enabled, updated_at: new Date().toISOString(), child_name: this.currentChildName, child_profile_id: childId ?? existingProgress.child_profile_id ?? null })
          .eq('id', existingProgress.id);
        
        if (error) {
          console.error('Error updating category:', error);
        } else {
          console.log('Successfully updated category', category, 'to', enabled);
        }
      } else {
        const { error } = await supabase
          .from('progress')
          .insert({
            user_id: user.id,
            child_name: this.currentChildName,
            child_profile_id: childId,
            category,
            category_enabled: enabled,
            updated_at: new Date().toISOString(),
          });
        
        if (error) {
          console.error('Error creating category record:', error);
        } else {
          console.log('Successfully created category record for', category, 'with enabled:', enabled);
        }
      }
    } catch (error) {
      console.error('Error toggling category:', error);
    }
  }

  // Calculate points based on performance
  static calculatePoints(correctAnswers: number, totalQuestions: number, timeBonus: boolean = false): number {
    const basePoints = Math.floor((totalQuestions > 0 ? (correctAnswers / totalQuestions) : 0) * 100);
    const timeBonusPoints = timeBonus ? 10 : 0;
    return Math.max(0, basePoints + timeBonusPoints);
  }

  // Reset all progress (for testing/debugging)
  static async resetProgress(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const childId = await this.ensureCurrentChildId(user.id);

        let progressDelete = supabase.from('progress').delete().eq('user_id', user.id);
        let quizDelete = supabase.from('quiz_results').delete().eq('user_id', user.id);

        if (childId) {
          progressDelete = progressDelete.eq('child_profile_id', childId);
          quizDelete = quizDelete.eq('child_profile_id', childId);
        } else {
          progressDelete = progressDelete.eq('child_name', this.currentChildName);
          quizDelete = quizDelete.eq('child_name', this.currentChildName);
        }

        await progressDelete;
        await quizDelete;
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
    
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
