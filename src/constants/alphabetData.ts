
// Bogstavgrupper - Updated with new order
export const SHORT_VOWELS = ["A", "E", "I", "O", "U"];
export const LONG_VOWELS = ["AA", "EE", "II", "OO", "UU"];
export const CONSONANTS = [
  "B", "T", "J", "X", "KH", "D", "R", "S", "SH", "DH", 
  "C", "G", "F", "Q", "K", "L", "M", "N", "W", "H", "Y"
];

export const GROUPS = {
  alphabet: { label: "Alfabetet", letters: CONSONANTS },
  short:    { label: "Korte vokaler", letters: SHORT_VOWELS },
  long:     { label: "Lange vokaler", letters: LONG_VOWELS }
};

// Audio file mappings - Fixed path inconsistency
export const AUDIO_FILES: Record<string, string> = {
  // Korte vokaler
  "A": "/Alfabet/1A.mp3",
  "E": "/Alfabet/1B.mp3",
  "I": "/Alfabet/I.mp3",
  "O": "/Alfabet/O.mp3",
  "U": "/Alfabet/U.mp3",
  // Lange vokaler
  "AA": "/Alfabet/AA.mp3",
  "EE": "/Alfabet/EE.mp3",
  "II": "/Alfabet/II.mp3",
  "OO": "/Alfabet/OO.mp3",
  "UU": "/Alfabet/UU.mp3",
  // Alfabetet - updated with new order
  "B": "/Alfabet/B.mp3",
  "T": "/Alfabet/T.mp3",
  "J": "/Alfabet/J.mp3",
  "X": "/Alfabet/X.mp3",
  "KH": "/Alfabet/KH.mp3",
  "D": "/Alfabet/D.mp3",
  "R": "/Alfabet/R.mp3",
  "S": "/Alfabet/S.mp3",
  "SH": "/Alfabet/SH.mp3",
  "DH": "/Alfabet/DH.mp3",
  "C": "/Alfabet/C.mp3",
  "G": "/Alfabet/G.mp3",
  "F": "/Alfabet/F.mp3",
  "Q": "/Alfabet/Q.mp3",
  "K": "/Alfabet/K.mp3",
  "L": "/Alfabet/L.mp3",
  "M": "/Alfabet/M.mp3",
  "N": "/Alfabet/N.mp3",
  "W": "/Alfabet/W.mp3",
  "H": "/Alfabet/H.mp3",
  "Y": "/Alfabet/Y.mp3"
};

export const ALPHABET_IMAGES: Record<string, { img: string; alt: string }> = {
  // Korte vokaler - updated with new uploaded images
  "A": {
    img: "billeder/a.png",
    alt: "Bogstavet A"
  },
  "E": {
    img: "billeder/e.png",
    alt: "Bogstavet E"
  },
  "I": {
    img: "billeder/i.png",
    alt: "Bogstavet I"
  },
  "O": {
    img: "billeder/o.png",
    alt: "Bogstavet O"
  },
  "U": {
    img: "billeder/u.png",
    alt: "Bogstavet U"
  },
  "AA": {
    img: "billeder/aa.png",
    alt: "Bogstavet AA"
  },
  "EE": {
    img: "billeder/ee.png",
    alt: "Bogstavet EE"
  },
  "II": {
    img: "billeder/ii.png",
    alt: "Bogstavet II"
  },
  "OO": {
    img: "billeder/oo.png",
    alt: "Bogstavet OO"
  },
  "UU": {
    img: "billeder/uu.png",
    alt: "Bogstavet UU"
  },
  "B": {
    img: "billeder/b.png",
    alt: "Bogstavet B"
  },
  "C": {
    img: "billeder/c.png",
    alt: "Bogstavet C"
  },
  "D": {
    img: "billeder/d.png",
    alt: "Bogstavet D"
  },
  "DH": {
    img: "billeder/dh.png", 
    alt: "Bogstavet DH"
  },
  "F": {
    img: "billeder/f.png",
    alt: "Bogstavet F"
  },
  "G": {
    img: "billeder/g.png",
    alt: "Bogstavet G"
  },
  "H": {
    img: "billeder/h.png",
    alt: "Bogstavet H"
  },
  "J": {
    img: "billeder/j.png",
    alt: "Bogstavet J"
  },
  "K": {
    img: "billeder/k.png",
    alt: "Bogstavet K"
  },
  "KH": {
    img: "billeder/kh.png",
    alt: "Bogstavet KH"
  },
  "L": {
    img: "billeder/l.png",
    alt: "Bogstavet L"
  },
  "M": {
    img: "billeder/m.png",
    alt: "Bogstavet M"
  },
  "N": {
    img: "billeder/n.png",
    alt: "Bogstavet N"
  },
  "Q": {
    img: "billeder/q.png",
    alt: "Bogstavet Q"
  },
  "R": {
    img: "billeder/r.png",
    alt: "Bogstavet R"
  },
  "S": {
    img: "billeder/s.png",
    alt: "Bogstavet S"
  },
  "SH": {
    img: "billeder/sh.png",
    alt: "Bogstavet SH"
  },
  "T": {
    img: "billeder/t.png",
    alt: "Bogstavet T"
  },
  "W": {
    img: "billeder/w.png",
    alt: "Bogstavet W"
  },
  "X": {
    img: "billeder/x.png",
    alt: "Bogstavet X"
  },
  "Y": {
    img: "billeder/y.png",
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
