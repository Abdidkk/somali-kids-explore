
import React from "react";
import { LearningCategory } from "@/data/learningCategories";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: LearningCategory[];
  categorySettings: Map<string, boolean>;
  finishedCategories: string[];
  lastCategory: string | null;
  onCategorySelect: (category: LearningCategory) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  categorySettings,
  finishedCategories, 
  lastCategory, 
  onCategorySelect 
}) => {
  return (
    <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category, idx) => {
        const isFinished = finishedCategories.includes(category.name);
        const isLastCat = category.name === lastCategory;
        const isEnabled = categorySettings.get(category.name) !== false; // Default to enabled if no setting
        
        return (
          <CategoryCard 
            key={category.name}
            category={category}
            isFinished={isFinished}
            isLastCat={isLastCat}
            isEnabled={isEnabled}
            onSelect={() => onCategorySelect(category)}
            index={idx}
          />
        );
      })}
    </div>
  );
};

export default CategoryGrid;
