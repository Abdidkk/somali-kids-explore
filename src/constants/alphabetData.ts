
// Bogstavgrupper
export const SHORT_VOWELS = ["A", "E", "I", "O", "U"];
export const LONG_VOWELS = ["AA", "EE", "II", "OO", "UU"];
export const CONSONANTS = [
  "Bb", "Cc", "Dd", "DHdh", "Ff", "Gg", "Hh", "Jj", "Kk", "KHkh",
  "Ll", "Mm", "Nn", "Qq", "Rr", "Ss", "SHsh", "Tt", "Ww", "Xx", "Yy"
];

export const GROUPS = {
  alphabet: { label: "Alfabetet", letters: CONSONANTS },
  short:    { label: "Korte vokaler", letters: SHORT_VOWELS },
  long:     { label: "Lange vokaler", letters: LONG_VOWELS }
};

// Audio file mappings - Foreløbig tomme stier, der skal udfyldes med faktiske lydfilstier
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
  // Alfabetet
  "Bb": "",
  "Cc": "",
  "Dd": "",
  "DHdh": "", 
  "Ff": "",
  "Gg": "",
  "Hh": "",
  "Jj": "",
  "Kk": "",
  "KHkh": "",
  "Ll": "",
  "Mm": "",
  "Nn": "",
  "Qq": "",
  "Rr": "",
  "Ss": "",
  "SHsh": "",
  "Tt": "",
  "Ww": "",
  "Xx": "",
  "Yy": ""
};

export const ALPHABET_IMAGES: Record<string, { img: string; alt: string }> = {
  // Korte vokaler - added image for A vowel
  "A": {
    img: "/lovable-uploads/0e29c5c2-6fa5-4899-a196-b7832d8abc67.png",
    alt: "Bogstavet A"
  },
  "E": {
    img: "/lovable-uploads/0435c435-2eb6-4de9-a68e-d3a18fd524e5.png",
    alt: "Bogstavet E"
  },
  "I": {
    img: "/lovable-uploads/2e500a3e-3baa-45e1-a7ba-07e14b919f79.png",
    alt: "Bogstavet I"
  },
  "O": {
    img: "/lovable-uploads/5226a33a-bf7f-4cc7-ace6-28b7484c60ce.png",
    alt: "Bogstavet O"
  },
  "U": {
    img: "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png",
    alt: "Bogstavet U"
  },
  // Lange vokaler - added images
  "AA": {
    img: "/lovable-uploads/0a4df638-a8fe-492e-b3bf-9b8d9c7235fc.png",
    alt: "Bogstavet AA"
  },
  "EE": {
    img: "/lovable-uploads/85f38696-d894-4781-a2e8-210a91796896.png",
    alt: "Bogstavet EE"
  },
  "II": {
    img: "/lovable-uploads/c14144b9-9843-4d08-ac21-d439ebef2ad0.png",
    alt: "Bogstavet II"
  },
  "OO": {
    img: "/lovable-uploads/96a8e74c-d203-46ea-a5b3-62d43488681b.png",
    alt: "Bogstavet OO"
  },
  "UU": {
    img: "/lovable-uploads/d0b3c9b9-109a-4f4a-b560-6bbcba7c84e8.png",
    alt: "Bogstavet UU"
  },
  // Alfabetet - nye billeder tilføjet
  "Bb": {
    img: "/lovable-uploads/137c3493-d107-4ad6-bdfe-0d3ebde86557.png",
    alt: "Bogstavet B"
  },
  "Cc": {
    img: "/lovable-uploads/2f53b20d-6439-420c-8bd8-f2b42e07562c.png",
    alt: "Bogstavet C"
  },
  "Dd": {
    img: "/lovable-uploads/21dbe823-efb8-4536-bae2-f0fa1b05135a.png",
    alt: "Bogstavet D"
  },
  "DHdh": {
    img: "/lovable-uploads/fed49f42-48ff-4aa2-971d-914092d122a8.png", 
    alt: "Bogstavet DH"
  },
  "Ff": {
    img: "/lovable-uploads/e6aa3b70-3fa2-4c9e-af6a-398e0c5487f6.png",
    alt: "Bogstavet F"
  },
  "Gg": {
    img: "/lovable-uploads/4097f6e7-9f3a-423f-8959-f5b7d9b23ed7.png",
    alt: "Bogstavet G"
  },
  "Hh": {
    img: "/lovable-uploads/fadf7158-7c58-41a5-bc73-84baf9995109.png",
    alt: "Bogstavet H"
  },
  "Jj": {
    img: "/lovable-uploads/2880b50d-a895-4677-a7d9-680fa0c872f3.png",
    alt: "Bogstavet J"
  },
  "Kk": {
    img: "/lovable-uploads/5e9cedef-3d1e-4ca9-8f28-eac454a506e7.png",
    alt: "Bogstavet K"
  },
  "KHkh": {
    img: "/lovable-uploads/a2da5f69-75bf-45a0-8325-4e3c1285929c.png",
    alt: "Bogstavet KH"
  },
  "Ll": {
    img: "/lovable-uploads/1dbfd78f-7c8b-4272-a674-10d38c20043d.png",
    alt: "Bogstavet L"
  },
  "Mm": {
    img: "/lovable-uploads/ad1381cf-5eeb-4fef-8af0-1dc5f93bf90b.png",
    alt: "Bogstavet M"
  },
  "Nn": {
    img: "/lovable-uploads/3b5c7f31-fb92-4d57-b31a-2b9f5e3f8f04.png",
    alt: "Bogstavet N"
  },
  "Qq": {
    img: "/lovable-uploads/49106c52-e19b-492a-8642-9a326819df86.png",
    alt: "Bogstavet Q"
  },
  "Rr": {
    img: "/lovable-uploads/05aa24f3-bf74-4721-80fd-294bfe79b1eb.png",
    alt: "Bogstavet R"
  },
  "Ss": {
    img: "/lovable-uploads/7704660d-576e-4a7f-ac19-3aed5364351f.png",
    alt: "Bogstavet S"
  },
  "SHsh": {
    img: "/lovable-uploads/0249030c-58e1-4fac-8541-4c83b0b41900.png",
    alt: "Bogstavet SH"
  },
  "Tt": {
    img: "/lovable-uploads/0e8c4234-8d4a-494f-ba70-7efa05bbf051.png",
    alt: "Bogstavet T"
  },
  "Ww": {
    img: "/lovable-uploads/1b83ffd6-177b-4abc-b5e8-ff1f289e98d6.png",
    alt: "Bogstavet W"
  },
  "Xx": {
    img: "/lovable-uploads/8caf3563-09bf-4bd5-a4ee-92b930b270a5.png",
    alt: "Bogstavet X"
  },
  "Yy": {
    img: "/lovable-uploads/635670fe-f87e-4fb0-aec5-e1d0346b85c7.png",
    alt: "Bogstavet Y"
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
