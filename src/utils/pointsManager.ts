import { supabase } from "@/integrations/supabase/client";

// Points Manager for Learning Activities - Now with Supabase backend
export interface ActivityScore {
  category: string;
  activity: string;
  score: number;
  maxScore: number;
  timestamp: string;
  timeSpent?: number; // in seconds
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

  // Set current child name for multi-child support
  static setCurrentChild(childName: string): void {
    this.currentChildName = childName;
  }

  // Get current child name
  static getCurrentChild(): string {
    return this.currentChildName;
  }

  // Get current progress from Supabase
  static async getProgress(): Promise<ProgressData> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Fallback to localStorage if not authenticated
        return this.getLocalProgress();
      }

      const { data: progressData, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('child_name', this.currentChildName);

      if (error) {
        console.error('Error loading progress from Supabase:', error);
        return this.getLocalProgress();
      }

      // Convert database format to ProgressData format
      const totalPoints = progressData.reduce((sum, p) => sum + p.total_points, 0);
      const activitiesCompleted = progressData.reduce((sum, p) => sum + p.activities_completed, 0);
      const categoryScores: Record<string, number> = {};
      
      progressData.forEach(p => {
        categoryScores[p.category] = p.total_points;
      });

      // Get recent quiz results
      const { data: quizResults } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .eq('child_name', this.currentChildName)
        .order('created_at', { ascending: false })
        .limit(50);

      const recentScores: ActivityScore[] = (quizResults || []).map(qr => ({
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
      timestamp: new Date().toISOString()
    });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No user found, falling back to localStorage');
        this.addLocalScore(activityScore);
        return;
      }

      console.log('Saving score to Supabase for user:', user.id, 'child:', this.currentChildName);

      // Update or create progress record
      const { data: existingProgress } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('child_name', this.currentChildName)
        .eq('category', activityScore.category)
        .single();

      if (existingProgress) {
        // Update existing progress
        await supabase
          .from('progress')
          .update({
            total_points: existingProgress.total_points + activityScore.score,
            activities_completed: existingProgress.activities_completed + 1,
            time_spent: existingProgress.time_spent + (activityScore.timeSpent || 0)
          })
          .eq('id', existingProgress.id);
      } else {
        // Create new progress record
        await supabase
          .from('progress')
          .insert({
            user_id: user.id,
            child_name: this.currentChildName,
            category: activityScore.category,
            total_points: activityScore.score,
            activities_completed: 1,
            time_spent: activityScore.timeSpent || 0
          });
      }

      // Add quiz result
      const quizResult = await supabase
        .from('quiz_results')
        .insert({
          user_id: user.id,
          child_name: this.currentChildName,
          category: activityScore.category,
          activity_name: activityScore.activity,
          score: activityScore.score,
          max_score: activityScore.maxScore,
          answers: [],
          completion_time: activityScore.timeSpent
        });

      console.log('Score saved successfully to Supabase for child:', this.currentChildName);
      
      if (quizResult.error) {
        console.error('Error inserting quiz result:', quizResult.error);
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
    
    // Add to recent scores (keep last 50)
    progress.recentScores.unshift(activityScore);
    if (progress.recentScores.length > 50) {
      progress.recentScores = progress.recentScores.slice(0, 50);
    }
    
    // Update totals
    progress.totalPoints += activityScore.score;
    progress.activitiesCompleted += 1;
    
    // Update category score
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
      
      if (!user) {
        return true; // Default to enabled if not authenticated
      }

      const { data: progressData } = await supabase
        .from('progress')
        .select('category_enabled')
        .eq('user_id', user.id)
        .eq('child_name', this.currentChildName)
        .eq('category', category)
        .single();

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

      console.log('PointsManager: Toggling category', category, 'to', enabled, 'for child', this.currentChildName);

      const { data: existingProgress } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('child_name', this.currentChildName)
        .eq('category', category)
        .single();

      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('progress')
          .update({ category_enabled: enabled })
          .eq('id', existingProgress.id);
        
        if (error) {
          console.error('Error updating category:', error);
        } else {
          console.log('Successfully updated category', category, 'to', enabled);
        }
      } else {
        // Create new progress record with category disabled
        const { error } = await supabase
          .from('progress')
          .insert({
            user_id: user.id,
            child_name: this.currentChildName,
            category: category,
            category_enabled: enabled
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
    const basePoints = Math.floor((correctAnswers / totalQuestions) * 100);
    const timeBonusPoints = timeBonus ? 10 : 0;
    return Math.max(0, basePoints + timeBonusPoints);
  }

  // Reset all progress (for testing/debugging)
  static async resetProgress(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase
          .from('progress')
          .delete()
          .eq('user_id', user.id)
          .eq('child_name', this.currentChildName);

        await supabase
          .from('quiz_results')
          .delete()
          .eq('user_id', user.id)
          .eq('child_name', this.currentChildName);
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
    
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
