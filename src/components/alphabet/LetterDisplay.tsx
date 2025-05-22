
import React, { useState } from "react";
import { ALPHABET_IMAGES } from "@/constants/alphabetData";

interface LetterDisplayProps {
  selectedLetter: string;
}

export default function LetterDisplay({ selectedLetter }: LetterDisplayProps) {
  const [imageError, setImageError] = useState(false);

  // Reset image error state when letter changes
  React.useEffect(() => {
    setImageError(false);
  }, [selectedLetter]);

  const imagePath = ALPHABET_IMAGES[selectedLetter]?.img;
  const imageAlt = ALPHABET_IMAGES[selectedLetter]?.alt || selectedLetter;
  
  const handleImageError = () => {
    console.error(`Failed to load image for letter ${selectedLetter}: ${imagePath}`);
    setImageError(true);
  };

  return (
    <>
      {/* Display image for the selected letter if available */}
      {imagePath && !imageError && (
        <div className="relative">
          <img
            src={imagePath}
            alt={imageAlt}
            className="w-full max-w-xs rounded-xl border mb-2 shadow bg-white"
            style={{ objectFit: "cover" }}
            onError={handleImageError}
          />
          {/* Add a console log to help debug */}
          {console.log(`Rendering image for ${selectedLetter}: ${imagePath}`)}
        </div>
      )}
      {imageError && (
        <div className="text-red-500 mb-2 text-sm">
          Billede kunne ikke indlæses. Sti: {imagePath}
        </div>
      )}
      <h3 className="text-xl font-bold text-purple-700 mb-2">{selectedLetter} — Lyt til bogstavet</h3>
    </>
  );
}
