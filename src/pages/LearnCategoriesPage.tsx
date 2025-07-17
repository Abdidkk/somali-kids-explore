import React, { useState, useEffect } from "react";
import { learningCategories } from "@/data/learningCategories";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import AlphabetModal from "@/components/AlphabetModal";
import ColorsModal from "@/components/ColorsModal";
import NumbersModal from "@/components/NumbersModal";
import FoodModal from "@/components/FoodModal";
import AnimalsModal from "@/components/AnimalsModal";
import KropsdeleModal from "@/components/KropsdeleModal";
import CalendarModal from "@/components/CalendarModal";
import GeographyModal from "@/components/GeographyModal";
import FamilyModal from "@/components/FamilyModal";
import ProfileMenu from "@/components/ProfileMenu";
import CategoryGrid from "@/components/learning/CategoryGrid";
import LearningPageHeader from "@/components/learning/LearningPageHeader";
import WordsModal from "@/components/WordsModal";
import DailyActivitiesModal from "@/components/DailyActivitiesModal";
import SentencesModal from "@/components/SentencesModal";
import ReadBooksModal from "@/components/ReadBooksModal";
import CulturalModal from "@/components/CulturalModal";
import QuizModal from "@/components/QuizModal";

// Mock child data for development
const mockChild = {
  name: "Sami",
  progress: 38,
  streak: 5,
  badges: ["Streak 3 dage", "Flittig Lærer"],
  lastCategory: "Tal",
  lastPercent: 30,
  finishedCategories: ["Alfabet"]
};

export default function LearnCategoriesPage() {
  const { user } = useAuth();
  const [filteredCategories, setFilteredCategories] = useState(learningCategories);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState("Sami"); // Default child for now
  
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

  useEffect(() => {
    const fetchCategorySettings = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Fetch category settings from Supabase
        const { data: categorySettings, error } = await supabase
          .from('progress')
          .select('category, category_enabled')
          .eq('user_id', user.id)
          .eq('child_name', selectedChild);

        if (error) {
          console.error('Error fetching category settings:', error);
          setFilteredCategories(learningCategories); // Show all categories on error
          return;
        }

        // Create a map of category settings
        const settingsMap = new Map(
          categorySettings?.map(setting => [setting.category, setting.category_enabled]) || []
        );

        // Filter categories based on enabled status
        const enabledCategories = learningCategories.filter(category => {
          // If no setting exists for this category, default to enabled
          return settingsMap.get(category.name) !== false;
        });

        setFilteredCategories(enabledCategories);
      } catch (error) {
        console.error('Error in fetchCategorySettings:', error);
        setFilteredCategories(learningCategories); // Show all categories on error
      } finally {
        setLoading(false);
      }
    };

    fetchCategorySettings();
  }, [user, selectedChild]);

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
    const idx = filteredCategories.findIndex(c => c.name === categoryName);
    if (idx !== -1) {
      document.getElementById(`learn-cat-${idx}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center justify-center py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Indlæser kategorier...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center py-10 animate-fade-in relative">
      <ProfileMenu />
      
      <LearningPageHeader 
        child={mockChild} 
        onBack={handleBack}
        onContinue={handleContinueLastCategory}
      />

      {filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Ingen kategorier er tilgængelige.</p>
          <p className="text-gray-500 mt-2">Kontakt en forælder for at aktivere kategorier.</p>
        </div>
      ) : (
        <CategoryGrid 
          categories={filteredCategories}
          finishedCategories={mockChild.finishedCategories}
          lastCategory={mockChild.lastCategory}
          onCategorySelect={handleCategorySelect}
        />
      )}
      
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
      />
      
      <AnimalsModal 
        open={showAnimals} 
        onClose={() => setShowAnimals(false)} 
      />
      
      <KropsdeleModal 
        open={showKropsdele} 
        onClose={() => setShowKropsdele(false)} 
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