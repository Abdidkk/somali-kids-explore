
// Bogstavgrupper
export const SHORT_VOWELS = ["A", "E", "I", "O", "U"];
export const LONG_VOWELS = ["AA", "EE", "II", "OO", "UU"];
export const CONSONANTS: string[] = ["B", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"]; // Restored consonants

export const GROUPS = {
  alphabet: { label: "Alfabetet", letters: CONSONANTS },
  short:    { label: "Korte vokaler", letters: SHORT_VOWELS },
  long:     { label: "Lange vokaler", letters: LONG_VOWELS }
};

// Audio file mappings - Including consonants (with empty paths for now)
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
  "UU": "",
  // Consonants (empty paths)
  "B": "",
  "D": "",
  "F": "",
  "G": "",
  "H": "",
  "J": "",
  "K": "",
  "L": "",
  "M": "",
  "N": "",
  "P": "",
  "Q": "",
  "R": "",
  "S": "",
  "T": "",
  "V": "",
  "W": "",
  "X": "",
  "Y": "",
  "Z": ""
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
  },
  // Consonants with image mappings from uploaded files
  "B": {
    img: "/lovable-uploads/85f38696-d894-4781-a2e8-210a91796896.png",
    alt: "Bogstavet B"
  },
  "D": {
    img: "/lovable-uploads/0e29c5c2-6fa5-4899-a196-b7832d8abc67.png",
    alt: "Bogstavet D"
  },
  "F": {
    img: "/lovable-uploads/39e62fa6-99c4-4bf1-996f-19577f56a318.png", 
    alt: "Bogstavet F"
  },
  "G": {
    img: "/lovable-uploads/4b8dc6fc-aca1-44d7-9188-920521dc6d81.png",
    alt: "Bogstavet G"
  },
  "H": {
    img: "/lovable-uploads/2880b50d-a895-4677-a7d9-680fa0c872f3.png",
    alt: "Bogstavet H"
  },
  "J": {
    img: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png",
    alt: "Bogstavet J"
  },
  "K": {
    img: "/lovable-uploads/ad1381cf-5eeb-4fef-8af0-1dc5f93bf90b.png",
    alt: "Bogstavet K"
  },
  "L": {
    img: "/lovable-uploads/51f528f7-5124-4514-b0f4-ecf0d93a85ae.png",
    alt: "Bogstavet L"
  },
  "M": {
    img: "/lovable-uploads/a1b97193-b26e-42a5-90f1-0ee432386d70.png",
    alt: "Bogstavet M"
  },
  "N": {
    img: "/lovable-uploads/4097f6e7-9f3a-423f-8959-f5b7d9b23ed7.png",
    alt: "Bogstavet N"
  },
  "P": {
    img: "/lovable-uploads/c3c53a02-5ecc-4109-964e-df932b52581c.png",
    alt: "Bogstavet P"
  },
  "Q": {
    img: "/lovable-uploads/cffd237e-6a54-4fc2-8948-ab03ee00399a.png",
    alt: "Bogstavet Q"
  },
  "R": {
    img: "/lovable-uploads/e07592ff-5948-45cb-a7a5-de1ab3075b22.png",
    alt: "Bogstavet R"
  },
  "S": {
    img: "/lovable-uploads/c14144b9-9843-4d08-ac21-d439ebef2ad0.png",
    alt: "Bogstavet S"
  },
  "T": {
    img: "/lovable-uploads/5f3c2e5c-8a56-4baf-8c3f-4d8ecbe1f924.png",
    alt: "Bogstavet T"
  },
  "V": {
    img: "/lovable-uploads/1e80efba-0e83-48c7-aa88-40fa3c48f0a9.png",
    alt: "Bogstavet V"
  },
  "W": {
    img: "/lovable-uploads/23df9b50-7f66-4b52-819b-59cc920edd2b.png",
    alt: "Bogstavet W"
  },
  "X": {
    img: "/lovable-uploads/2e500a3e-3baa-45e1-a7ba-07e14b919f79.png", 
    alt: "Bogstavet X"
  },
  "Y": {
    img: "/lovable-uploads/96a8e74c-d203-46ea-a5b3-62d43488681b.png",
    alt: "Bogstavet Y"
  },
  "Z": {
    img: "/lovable-uploads/c7a740c6-588d-44dc-ba26-f1f0a1d10531.png",
    alt: "Bogstavet Z"
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
