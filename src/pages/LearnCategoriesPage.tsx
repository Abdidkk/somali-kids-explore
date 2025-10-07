import React, { useState, useEffect } from "react";
import { learningCategories } from "@/data/learningCategories";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useChildProfiles } from "@/hooks/useChildProfiles";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { PointsManager } from "@/utils/pointsManager";
import { resolveChildProfileIdByName } from "@/utils/childProfile";
import AlphabetModal from "@/components/AlphabetModal";
import ColorsModal from "@/components/ColorsModal";
import NumbersModal from "@/components/NumbersModal";
import FoodModal from "@/components/FoodModal";
import AnimalsModal from "@/components/AnimalsModal";
import KropsdeleModal from "@/components/KropsdeleModal";
import CalendarModal from "@/components/CalendarModal";
import GeographyModal from "@/components/GeographyModal";
import FamilyModal from "@/components/FamilyModal";
import CategoryGrid from "@/components/learning/CategoryGrid";
import LearningPageHeader from "@/components/learning/LearningPageHeader";
import WordsModal from "@/components/WordsModal";
import DailyActivitiesModal from "@/components/DailyActivitiesModal";
import SentencesModal from "@/components/SentencesModal";
import ReadBooksModal from "@/components/ReadBooksModal";
import CulturalModal from "@/components/CulturalModal";
import QuizModal from "@/components/QuizModal";

export default function LearnCategoriesPage() {
  const { user } = useAuth();
  const { childProfiles, loading: childProfilesLoading } = useChildProfiles();
  const { subscribed, status } = useSubscription();
  const navigate = useNavigate();
  const [categorySettings, setCategorySettings] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState<string>("");
  
  // Real child data state
  const [childData, setChildData] = useState({
    name: "",
    progress: 0,
    streak: 0,
    badges: [],
    lastCategory: null,
    lastPercent: 0,
    finishedCategories: []
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  
  // Fetch real child data
  const fetchChildData = async () => {
    if (!user) return;
    
    try {
      // Get progress data from PointsManager
      const progressData = await PointsManager.getProgress();
      
      // Resolve child id and set current child context
      const childId = await resolveChildProfileIdByName(user.id, selectedChild);
      if (childId) {
        PointsManager.setCurrentChildWithId(selectedChild, childId);
      } else {
        PointsManager.setCurrentChild(selectedChild);
      }
      
      // Get recent activity (prefer id)
      let recentQuery = supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (childId) {
        recentQuery = recentQuery.eq('child_profile_id', childId);
      } else {
        recentQuery = recentQuery.eq('child_name', selectedChild);
      }
      const { data: recentQuizResults } = await recentQuery;
      
      if (recentQuizResults) {
        setRecentActivity(recentQuizResults);
      }
      
      // Calculate badges based on progress
      const badges = [];
      if (progressData.totalPoints > 100) badges.push("Flittig Lærer");
      if (progressData.totalPoints > 500) badges.push("Vidunderlig Elev");
      
      // Find last category and percent from recent activity
      const lastQuiz = recentQuizResults?.[0];
      const lastCategory = lastQuiz?.category || null;
      const lastPercent = lastQuiz ? Math.round((lastQuiz.score / lastQuiz.max_score) * 100) : 0;
      
      // Get finished categories (categories with high completion rate)
      const finishedCategories = Object.entries(progressData.categoryScores)
        .filter(([_, score]) => score > 80)
        .map(([category, _]) => category);
      
      setChildData({
        name: selectedChild,
        progress: Math.min(Math.round(progressData.totalPoints / 10), 100), // Convert points to percentage
        streak: 0, // Would need to calculate from daily activity
        badges,
        lastCategory,
        lastPercent,
        finishedCategories
      });
      
    } catch (error) {
      console.error('Error fetching child data:', error);
    }
  };
  
  const [showAlphabet, setShowAlphabet] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const [showFood, setShowFood] = useState(false);
  const [showAnimals, setShowAnimals] = useState(false);
  const [showKropsdele, setShowKropsdele] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGeography, setShowGeography] = useState(false);
  const [showFamily, setShowFamily] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const [showDailyActivities, setShowDailyActivities] = useState(false);
  const [showSentences, setShowSentences] = useState(false);
  const [showReadBooks, setShowReadBooks] = useState(false);
  const [showCultural, setShowCultural] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // Get selected child from PointsManager instead of auto-selecting first child
  useEffect(() => {
    if (!childProfilesLoading && childProfiles.length > 0 && !selectedChild) {
      const currentChild = PointsManager.getCurrentChild();
      
      if (currentChild && childProfiles.some(p => p.name === currentChild)) {
        // Use the child that's already set in PointsManager
        setSelectedChild(currentChild);
        console.log('LearnCategoriesPage: Using PointsManager current child:', currentChild);
      } else if (childProfiles.length > 0) {
        // Fallback to first child only if no valid child is set in PointsManager
        const firstChild = childProfiles[0].name;
        if (firstChild && firstChild.trim() !== '' && firstChild !== 'default') {
          setSelectedChild(firstChild);
          PointsManager.setCurrentChild(firstChild);
          console.log('LearnCategoriesPage: Fallback to first child:', firstChild);
        }
      }
    }
  }, [childProfiles, childProfilesLoading, selectedChild]);

  useEffect(() => {
    const fetchCategorySettings = async () => {
      if (!user || !selectedChild) return;

      try {
        setLoading(true);
        
        // CRITICAL: Set current child in PointsManager before any operations
        PointsManager.setCurrentChild(selectedChild);
        console.log('LearnCategoriesPage: Set current child to:', selectedChild);
        
        // Sync with PointsManager's current child
        const currentChild = PointsManager.getCurrentChild();
        console.log('LearnCategoriesPage: Current child in PointsManager:', currentChild);
        
        // Fetch category settings from Supabase
        const { data: categorySettings, error } = await supabase
          .from('progress')
          .select('category, category_enabled')
          .eq('user_id', user.id)
          .eq('child_name', currentChild);

        if (error) {
          console.error('Error fetching category settings:', error);
          setCategorySettings(new Map()); // Show all categories as enabled on error
          return;
        }

        // Create a map of category settings
        const settingsMap = new Map(
          categorySettings?.map(setting => [setting.category, setting.category_enabled]) || []
        );

        console.log('Category settings map:', settingsMap);
        setCategorySettings(settingsMap);
      } catch (error) {
        console.error('Error in fetchCategorySettings:', error);
        setCategorySettings(new Map()); // Show all categories as enabled on error
      } finally {
        setLoading(false);
      }
    };

    if (selectedChild) {
      fetchCategorySettings();
      fetchChildData();
    }
  }, [user, selectedChild]);

  // Set up real-time listener for category changes
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('progress-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'progress',
          filter: `user_id=eq.${user.id}`
        },
        async (payload) => {
          console.log('Real-time category change detected:', payload);
          
          // Re-fetch category settings when changes occur
          const currentChild = PointsManager.getCurrentChild();
          const { data: categorySettings } = await supabase
            .from('progress')
            .select('category, category_enabled')
            .eq('user_id', user.id)
            .eq('child_name', currentChild);

          if (categorySettings) {
            const settingsMap = new Map(
              categorySettings.map(setting => [setting.category, setting.category_enabled])
            );

            console.log('Updated category settings map:', settingsMap);
            setCategorySettings(settingsMap);
          }
          
          // Also refetch child data when progress changes
          fetchChildData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleBack = () => {
    window.history.back();
  };

  const handleCategorySelect = (category) => {
    if (category.name === "Alfabet") {
      setShowAlphabet(true);
    } else if (category.name === "Farver") {
      setShowColors(true);
    } else if (category.name === "Tal") {
      setShowNumbers(true);
    } else if (category.name === "Mad") {
      setShowFood(true);
    } else if (category.name === "Dyr") {
      setShowAnimals(true);
    } else if (category.name === "Kropsdel") {
      setShowKropsdele(true);
    } else if (category.name === "Kalender") {
      setShowCalendar(true);
    } else if (category.name === "Geografi") {
      setShowGeography(true);
    } else if (category.name === "Familie og venner") {
      setShowFamily(true);
    } else if (category.name === "Ord") {
      setShowWords(true);
    }else if (category.name === "Daglige aktiviteter") {
      setShowDailyActivities(true);
    }else if (category.name === "Sætninger") {
      setShowSentences(true);
    }
    else if (category.name === "Læse bøger") {
      setShowReadBooks(true);
    }
    else if (category.name === "Kulturelt indhold") {
      setShowCultural(true);
    }
    else if (category.name === "Quiz") {
      setShowQuiz(true);
    }
  };

  const handleContinueLastCategory = (categoryName) => {
    const idx = learningCategories.findIndex(c => c.name === categoryName);
    if (idx !== -1) {
      document.getElementById(`learn-cat-${idx}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  if (loading || childProfilesLoading || !selectedChild) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center justify-center py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {childProfilesLoading ? "Indlæser børneprofiler..." : 
             !selectedChild ? "Ingen børn fundet..." : 
             "Indlæser kategorier..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center py-10 animate-fade-in relative">
      
      
      <LearningPageHeader 
        child={childData} 
        onBack={handleBack}
        onContinue={handleContinueLastCategory}
      />

      <CategoryGrid 
        categories={learningCategories}
        categorySettings={categorySettings}
        finishedCategories={childData.finishedCategories}
        lastCategory={childData.lastCategory}
        onCategorySelect={handleCategorySelect}
        requiresSubscription={subscribed && status !== 'cancelled'}
      />
      
      <AlphabetModal 
        open={showAlphabet} 
        onClose={() => setShowAlphabet(false)} 
      />
      
      <ColorsModal 
        open={showColors} 
        onClose={() => setShowColors(false)} 
      />
      
      <NumbersModal 
        open={showNumbers} 
        onClose={() => setShowNumbers(false)} 
      />
      
      <FoodModal 
        open={showFood} 
        onClose={() => setShowFood(false)} 
        selectedChild={selectedChild}
      />
      
      <AnimalsModal 
        open={showAnimals} 
        onClose={() => setShowAnimals(false)} 
        selectedChild={selectedChild}
      />
      
      <KropsdeleModal 
        open={showKropsdele} 
        onClose={() => setShowKropsdele(false)} 
        selectedChild={selectedChild}
      />
      
      <CalendarModal 
        open={showCalendar} 
        onClose={() => setShowCalendar(false)} 
      />
      
      <GeographyModal 
        open={showGeography} 
        onClose={() => setShowGeography(false)} 
      />
      
      <FamilyModal 
        open={showFamily} 
        onClose={() => setShowFamily(false)} 
      />
      
      <WordsModal 
        open={showWords}
        onClose={() => setShowWords(false)}
      />
      <DailyActivitiesModal 
        open={showDailyActivities}
        onClose={() => setShowDailyActivities(false)}
      />
      <SentencesModal 
        open={showSentences}
        onClose={() => setShowSentences(false)}
      />
      <ReadBooksModal 
        open={showReadBooks} 
        onClose={() => setShowReadBooks(false)} 
      />
      
      <CulturalModal 
        open={showCultural} 
        onClose={() => setShowCultural(false)} 
      />
      
      <QuizModal 
        open={showQuiz} 
        onClose={() => setShowQuiz(false)} 
      />
    </div>
  );
}