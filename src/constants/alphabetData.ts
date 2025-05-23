
// Bogstavgrupper
export const SHORT_VOWELS = ["A", "E", "I", "O", "U"];
export const LONG_VOWELS = ["AA", "EE", "II", "OO", "UU"];
export const CONSONANTS: string[] = []; // Removed all consonants

export const GROUPS = {
  alphabet: { label: "Alfabetet", letters: CONSONANTS },
  short:    { label: "Korte vokaler", letters: SHORT_VOWELS },
  long:     { label: "Lange vokaler", letters: LONG_VOWELS }
};

// Audio file mappings - Only vowels remain
export const AUDIO_FILES: Record<string, string> = {
  // Korte vokaler
  "A": "",
  "E": "",
  "I": "",
  "O": "",
  "U": "",
  // Lange vokaler
  "AA": "",
  "EE": "",
  "II": "",
  "OO": "",
  "UU": ""
};

export const ALPHABET_IMAGES: Record<string, { img: string; alt: string }> = {
  // Korte vokaler - updated with new uploaded images
  "A": {
    img: "/lovable-uploads/f584a67e-2b87-4d62-86dc-f19fdabc6fa9.png",
    alt: "Bogstavet A"
  },
  "E": {
    img: "/lovable-uploads/6b8402cb-3183-4698-a050-5c9030cbdccd.png",
    alt: "Bogstavet E"
  },
  "I": {
    img: "/lovable-uploads/baeff668-cdc5-49e6-91f8-39f8a79ef959.png",
    alt: "Bogstavet I"
  },
  "O": {
    img: "/lovable-uploads/e920e3c0-12e4-42f6-887d-4a0c1d2af2dc.png",
    alt: "Bogstavet O"
  },
  "U": {
    img: "/lovable-uploads/061ec32d-c737-4aba-bb96-e1924b0c39a6.png",
    alt: "Bogstavet U"
  },
  // Lange vokaler - updated with new uploaded images
  "AA": {
    img: "/lovable-uploads/c7e639a4-cc13-4207-aeb6-641c37cb7565.png",
    alt: "Bogstavet AA"
  },
  "EE": {
    img: "/lovable-uploads/237b7523-c439-422c-a3e6-e3fc2fa4a508.png",
    alt: "Bogstavet EE"
  },
  "II": {
    img: "/lovable-uploads/d287a2a9-249c-4973-b525-d3117639bee9.png",
    alt: "Bogstavet II"
  },
  "OO": {
    img: "/lovable-uploads/db1c1aca-aa6e-4bb1-b0fd-bf1f2f34539b.png",
    alt: "Bogstavet OO"
  },
  "UU": {
    img: "/lovable-uploads/a519a572-4893-49e9-baee-965f0243deb5.png",
    alt: "Bogstavet UU"
  }
};

// Helper functions
export const isVowel = (letter: string) => {
  return SHORT_VOWELS.includes(letter) || LONG_VOWELS.includes(letter);
};

export const hasImage = (letter: string) => {
  return ALPHABET_IMAGES[letter]?.img && ALPHABET_IMAGES[letter].img !== "";
};

export const hasAudio = (letter: string) => {
  return AUDIO_FILES[letter] && AUDIO_FILES[letter] !== "";
};
