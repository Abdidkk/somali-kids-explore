import React, { useState } from "react";
import { learningCategories } from "@/data/learningCategories";
import AlphabetModal from "@/components/AlphabetModal";
import ColorsModal from "@/components/ColorsModal";
import NumbersModal from "@/components/NumbersModal";
import FoodModal from "@/components/FoodModal";
import AnimalsModal from "@/components/AnimalsModal";
import BodyPartsModal from "@/components/BodyPartsModal";
import ProfileMenu from "@/components/ProfileMenu";
import CategoryGrid from "@/components/learning/CategoryGrid";
import LearningPageHeader from "@/components/learning/LearningPageHeader";

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
  const [showAlphabet, setShowAlphabet] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const [showFood, setShowFood] = useState(false);
  const [showAnimals, setShowAnimals] = useState(false);
  const [showBodyParts, setShowBodyParts] = useState(false);

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
      setShowBodyParts(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center py-10 animate-fade-in relative">
      <ProfileMenu />
      
      <LearningPageHeader 
        child={mockChild} 
        onBack={handleBack}
        onContinue={handleContinueLastCategory}
      />

      <CategoryGrid 
        categories={learningCategories}
        finishedCategories={mockChild.finishedCategories}
        lastCategory={mockChild.lastCategory}
        onCategorySelect={handleCategorySelect}
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
      />
      
      <AnimalsModal 
        open={showAnimals} 
        onClose={() => setShowAnimals(false)} 
      />
      
      <BodyPartsModal 
        open={showBodyParts} 
        onClose={() => setShowBodyParts(false)} 
      />
    </div>
  );
}
