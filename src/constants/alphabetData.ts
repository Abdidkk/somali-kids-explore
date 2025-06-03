// Bogstavgrupper - Updated with new order
export const SHORT_VOWELS = ["A", "E", "I", "O", "U"];
export const LONG_VOWELS = ["AA", "EE", "II", "OO", "UU"];
export const CONSONANTS = [
  "Bb", "Tt", "Jj", "Xx", "KHkh", "Dd", "Rr", "Ss", "SHsh", "DHdh", 
  "Cc", "Gg", "Ff", "Qq", "Kk", "Ll", "Mm", "Nn", "Ww", "Hh", "Yy"
];

export const GROUPS = {
  alphabet: { label: "Alfabetet", letters: CONSONANTS },
  short:    { label: "Korte vokaler", letters: SHORT_VOWELS },
  long:     { label: "Lange vokaler", letters: LONG_VOWELS }
};

// Audio file mappings - Updated with new audio folder structure
export const AUDIO_FILES: Record<string, string> = {
  // Korte vokaler
  "A": "/audio/alphabet/A.mp3",
  "E": "/audio/alphabet/E.mp3",
  "I": "/audio/alphabet/I.mp3",
  "O": "/audio/alphabet/O.mp3",
  "U": "/audio/alphabet/U.mp3",
  // Lange vokaler
  "AA": "/audio/alphabet/AA.mp3",
  "EE": "/audio/alphabet/EE.mp3",
  "II": "/audio/alphabet/II.mp3",
  "OO": "/audio/alphabet/OO.mp3",
  "UU": "/audio/alphabet/UU.mp3",
  // Alfabetet
  "Bb": "/audio/alphabet/Bb.mp3",
  "Tt": "/audio/alphabet/Tt.mp3",
  "Jj": "/audio/alphabet/Jj.mp3",
  "Xx": "/audio/alphabet/Xx.mp3",
  "KHkh": "/audio/alphabet/KHkh.mp3",
  "Dd": "/audio/alphabet/Dd.mp3",
  "Rr": "/audio/alphabet/Rr.mp3",
  "Ss": "/audio/alphabet/Ss.mp3",
  "SHsh": "/audio/alphabet/SHsh.mp3",
  "DHdh": "/audio/alphabet/DHdh.mp3",
  "Cc": "/audio/alphabet/Cc.mp3",
  "Gg": "/audio/alphabet/Gg.mp3",
  "Ff": "/audio/alphabet/Ff.mp3",
  "Qq": "/audio/alphabet/Qq.mp3",
  "Kk": "/audio/alphabet/Kk.mp3",
  "Ll": "/audio/alphabet/Ll.mp3",
  "Mm": "/audio/alphabet/Mm.mp3",
  "Nn": "/audio/alphabet/Nn.mp3",
  "Ww": "/audio/alphabet/Ww.mp3",
  "Hh": "/audio/alphabet/Hh.mp3",
  "Yy": "/audio/alphabet/Yy.mp3"
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
  "B": {
    img: "/lovable-uploads/137c3493-d107-4ad6-bdfe-0d3ebde86557.png",
    alt: "Bogstavet B"
  },
  "C": {
    img: "/lovable-uploads/2f53b20d-6439-420c-8bd8-f2b42e07562c.png",
    alt: "Bogstavet C"
  },
  "D": {
    img: "/lovable-uploads/21dbe823-efb8-4536-bae2-f0fa1b05135a.png",
    alt: "Bogstavet D"
  },
  "DH": {
    img: "/lovable-uploads/fed49f42-48ff-4aa2-971d-914092d122a8.png", 
    alt: "Bogstavet DH"
  },
  "F": {
    img: "/lovable-uploads/e6aa3b70-3fa2-4c9e-af6a-398e0c5487f6.png",
    alt: "Bogstavet F"
  },
  "G": {
    img: "/lovable-uploads/4097f6e7-9f3a-423f-8959-f5b7d9b23ed7.png",
    alt: "Bogstavet G"
  },
  "H": {
    img: "/lovable-uploads/fadf7158-7c58-41a5-bc73-84baf9995109.png",
    alt: "Bogstavet H"
  },
  "J": {
    img: "/lovable-uploads/2880b50d-a895-4677-a7d9-680fa0c872f3.png",
    alt: "Bogstavet J"
  },
  "K": {
    img: "/lovable-uploads/5e9cedef-3d1e-4ca9-8f28-eac454a506e7.png",
    alt: "Bogstavet K"
  },
  "KH": {
    img: "/lovable-uploads/a2da5f69-75bf-45a0-8325-4e3c1285929c.png",
    alt: "Bogstavet KH"
  },
  "L": {
    img: "/lovable-uploads/1dbfd78f-7c8b-4272-a674-10d38c20043d.png",
    alt: "Bogstavet L"
  },
  "M": {
    img: "/lovable-uploads/ad1381cf-5eeb-4fef-8af0-1dc5f93bf90b.png",
    alt: "Bogstavet M"
  },
  "N": {
    img: "/lovable-uploads/3b5c7f31-fb92-4d57-b31a-2b9f5e3f8f04.png",
    alt: "Bogstavet N"
  },
  "Q": {
    img: "/lovable-uploads/49106c52-e19b-492a-8642-9a326819df86.png",
    alt: "Bogstavet Q"
  },
  "R": {
    img: "/lovable-uploads/05aa24f3-bf74-4721-80fd-294bfe79b1eb.png",
    alt: "Bogstavet R"
  },
  "S": {
    img: "/lovable-uploads/7704660d-576e-4a7f-ac19-3aed5364351f.png",
    alt: "Bogstavet S"
  },
  "SH": {
    img: "/lovable-uploads/0249030c-58e1-4fac-8541-4c83b0b41900.png",
    alt: "Bogstavet SH"
  },
  "T": {
    img: "/lovable-uploads/0e8c4234-8d4a-494f-ba70-7efa05bbf051.png",
    alt: "Bogstavet T"
  },
  "W": {
    img: "/lovable-uploads/1b83ffd6-177b-4abc-b5e8-ff1f289e98d6.png",
    alt: "Bogstavet W"
  },
  "X": {
    img: "/lovable-uploads/8caf3563-09bf-4bd5-a4ee-92b930b270a5.png",
    alt: "Bogstavet X"
  },
  "Y": {
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

// Function to get letter color based on type and position
export const getLetterColor = (letter: string): string => {
  if (SHORT_VOWELS.includes(letter)) {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
    return colors[SHORT_VOWELS.indexOf(letter)];
  }
  
  if (LONG_VOWELS.includes(letter)) {
    const colors = ["#E17055", "#00B894", "#0984E3", "#00CEC9", "#FDCB6E"];
    return colors[LONG_VOWELS.indexOf(letter)];
  }
  
  // For consonants, use a variety of colors
  const consonantColors = [
    "#6C5CE7", "#A29BFE", "#FD79A8", "#E84393", "#00CEC9",
    "#00B894", "#00A085", "#FDCB6E", "#E17055", "#D63031",
    "#74B9FF", "#0984E3", "#6C5CE7", "#A29BFE", "#FD79A8",
    "#E84393", "#00CEC9", "#00B894", "#FDCB6E", "#E17055", "#D63031"
  ];
  
  const index = CONSONANTS.indexOf(letter);
  return index >= 0 ? consonantColors[index % consonantColors.length] : "#6C5CE7";
};
