// Points Manager for Learning Activities
// This will prepare for future backend integration with Progress and Quiz Results tables

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

export class PointsManager {
  private static STORAGE_KEY = 'learning_progress';

  // Get current progress from localStorage
  static getProgress(): ProgressData {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    
    return {
      totalPoints: 0,
      activitiesCompleted: 0,
      categoryScores: {},
      recentScores: []
    };
  }

  // Save progress to localStorage
  private static saveProgress(progress: ProgressData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  // Add points for an activity
  static addScore(activityScore: ActivityScore): void {
    const progress = this.getProgress();
    
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
    
    this.saveProgress(progress);
  }

  // Get category score
  static getCategoryScore(category: string): number {
    const progress = this.getProgress();
    return progress.categoryScores[category] || 0;
  }

  // Get total points
  static getTotalPoints(): number {
    return this.getProgress().totalPoints;
  }

  // Calculate points based on performance
  static calculatePoints(correctAnswers: number, totalQuestions: number, timeBonus: boolean = false): number {
    const basePoints = Math.floor((correctAnswers / totalQuestions) * 100);
    const timeBonusPoints = timeBonus ? 10 : 0;
    return Math.max(0, basePoints + timeBonusPoints);
  }

  // Reset all progress (for testing/debugging)
  static resetProgress(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
