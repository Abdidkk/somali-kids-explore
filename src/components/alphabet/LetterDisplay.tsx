
import React, { useState } from "react";
import { ALPHABET_IMAGES } from "@/constants/alphabetData";
import { useIsMobile } from "@/hooks/use-mobile";

interface LetterDisplayProps {
  selectedLetter: string;
}

export default function LetterDisplay({ selectedLetter }: LetterDisplayProps) {
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();

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
            className={`rounded-xl border mb-2 shadow bg-white ${isMobile ? 'w-28 h-28 sm:w-32 sm:h-32' : 'w-full max-w-xs'}`}
            style={{ objectFit: "contain", maxHeight: isMobile ? "120px" : "200px" }}
            onError={handleImageError}
          />
        </div>
      )}
      {imageError && (
        <div className="text-red-500 mb-2 text-sm">
          Billede kunne ikke indlæses
        </div>
      )}
      <h3 className={`font-bold text-purple-700 mb-2 ${isMobile ? 'text-base sm:text-lg' : 'text-xl'}`}>
        {selectedLetter} — Lyt til bogstavet
      </h3>
    </>
  );
}

