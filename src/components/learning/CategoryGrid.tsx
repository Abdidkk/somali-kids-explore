
import React from "react";
import { LearningCategory } from "@/data/learningCategories";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: LearningCategory[];
  categorySettings: Map<string, boolean>;
  finishedCategories: string[];
  lastCategory: string | null;
  onCategorySelect: (category: LearningCategory) => void;
  requiresSubscription?: boolean;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  categorySettings,
  finishedCategories, 
  lastCategory, 
  onCategorySelect,
  requiresSubscription = true
}) => {
  return (
    <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category, idx) => {
        const isFinished = finishedCategories.includes(category.name);
        const isLastCat = category.name === lastCategory;
        const isEnabled = requiresSubscription ? (categorySettings.get(category.name) !== false) : false; // Disable if no subscription
        
        return (
          <CategoryCard 
            key={category.name}
            category={category}
            isFinished={isFinished}
            isLastCat={isLastCat}
            isEnabled={isEnabled}
            requiresSubscription={requiresSubscription}
            onSelect={() => onCategorySelect(category)}
            index={idx}
          />
        );
      })}
    </div>
  );
};

export default CategoryGrid;
