
import React from "react";
import { ALPHABET_IMAGES, hasImage, getLetterColor } from "@/constants/alphabetData";

interface ColoredLetterDisplayProps {
  letter: string;
  size?: "small" | "medium" | "large";
}

const ColoredLetterDisplay: React.FC<ColoredLetterDisplayProps> = ({ 
  letter, 
  size = "large" 
}) => {
  const letterColor = getLetterColor(letter);
  
  const sizeClasses = {
    small: "w-16 h-16 text-2xl",
    medium: "w-24 h-24 text-4xl", 
    large: "w-32 h-32 text-6xl"
  };

  if (hasImage(letter)) {
    return (
      <div className={`${sizeClasses[size]} flex items-center justify-center relative`}>
        <img 
          src={ALPHABET_IMAGES[letter].img} 
          alt={ALPHABET_IMAGES[letter].alt}
          className="w-full h-full object-contain"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-lg"
          style={{ backgroundColor: letterColor }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} flex items-center justify-center rounded-lg font-bold text-white shadow-lg`}
      style={{ backgroundColor: letterColor }}
    >
      {letter}
    </div>
  );
};

export default ColoredLetterDisplay;
