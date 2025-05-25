
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
        <div className="relative flex justify-center">
          <img
            src={imagePath}
            alt={imageAlt}
            className={`rounded-xl border mb-3 shadow bg-white ${isMobile ? 'w-40 h-40 sm:w-48 sm:h-48' : 'w-56 h-56'}`}
            style={{ objectFit: "contain", maxHeight: isMobile ? "180px" : "220px" }}
            onError={handleImageError}
          />
        </div>
      )}
      {imageError && (
        <div className="text-red-500 mb-2 text-sm">
          Billede kunne ikke indlæses
        </div>
      )}
      <h3 className={`font-bold text-purple-700 mb-3 ${isMobile ? 'text-lg sm:text-xl' : 'text-2xl'}`}>
        {selectedLetter} — Lyt til bogstavet
      </h3>
    </>
  );
}
