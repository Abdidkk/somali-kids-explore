

// Bogstavgrupper
export const SHORT_VOWELS = ["A", "E", "I", "O", "U"];
export const LONG_VOWELS = ["AA", "EE", "II", "OO", "UU"];
export const CONSONANTS: string[] = ["B", "C", "D", "DH", "F", "G", "H", "J", "K", "KH", "L", "M", "N", "P", "Q", "R", "S", "SH", "T", "V", "W", "X", "Y", "Z"]; // Complete Somali alphabet with digraphs

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
  "C": "",
  "D": "",
  "DH": "",
  "F": "",
  "G": "",
  "H": "",
  "J": "",
  "K": "",
  "KH": "",
  "L": "",
  "M": "",
  "N": "",
  "P": "",
  "Q": "",
  "R": "",
  "S": "",
  "SH": "",
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
  // Consonants with updated image mappings from uploaded files
  "B": {
    img: "/lovable-uploads/21c9dccc-fb21-4aee-9f6f-6de24ab69a0d.png",
    alt: "Bogstavet B"
  },
  "C": {
    img: "/lovable-uploads/24359a93-cd7c-4cd8-a421-ceb9b8f45bb9.png",
    alt: "Bogstavet C"
  },
  "D": {
    img: "/lovable-uploads/968054ad-60e9-4e68-91b0-03b2fad888a2.png",
    alt: "Bogstavet D"
  },
  "DH": {
    img: "/lovable-uploads/f60eecb4-865c-4a83-907c-b15c190c300a.png",
    alt: "Bogstavet DH"
  },
  "F": {
    img: "/lovable-uploads/aee0280a-2434-493c-8180-e7ace9f4a89b.png", 
    alt: "Bogstavet F"
  },
  "G": {
    img: "/lovable-uploads/25264bfe-de04-484e-9f0e-62113974aa65.png",
    alt: "Bogstavet G"
  },
  "H": {
    img: "/lovable-uploads/61de946b-37f5-4def-9c0b-8659fc5c7e60.png",
    alt: "Bogstavet H"
  },
  "J": {
    img: "/lovable-uploads/ea6f776c-fc95-4f9c-9b19-e161711ab1d9.png",
    alt: "Bogstavet J"
  },
  "K": {
    img: "/lovable-uploads/d644d00a-2079-4693-9e0c-10575e898ac0.png",
    alt: "Bogstavet K"
  },
  "KH": {
    img: "/lovable-uploads/d7098faf-cce7-4c67-aaa7-342269b6275d.png",
    alt: "Bogstavet KH"
  },
  "L": {
    img: "/lovable-uploads/7042d830-3270-48c7-a5cb-cac9b00fb249.png",
    alt: "Bogstavet L"
  },
  "M": {
    img: "/lovable-uploads/b8557c67-cf0a-4c2f-ba61-81ef327af440.png",
    alt: "Bogstavet M"
  },
  "N": {
    img: "/lovable-uploads/bae4fc6d-0a95-4f11-a9cb-678ad9104980.png",
    alt: "Bogstavet N"
  },
  "P": {
    img: "/lovable-uploads/c3c53a02-5ecc-4109-964e-df932b52581c.png",
    alt: "Bogstavet P"
  },
  "Q": {
    img: "/lovable-uploads/39550249-2c78-495a-8d1d-8ee30d0bfd11.png",
    alt: "Bogstavet Q"
  },
  "R": {
    img: "/lovable-uploads/0264af11-4d98-40b2-ae46-849d662b25d4.png",
    alt: "Bogstavet R"
  },
  "S": {
    img: "/lovable-uploads/0be6fe4a-4dd9-4477-815f-c774c20c36fc.png",
    alt: "Bogstavet S"
  },
  "SH": {
    img: "/lovable-uploads/686e71c2-924e-4681-88ee-cc2bd31802e6.png",
    alt: "Bogstavet SH"
  },
  "T": {
    img: "/lovable-uploads/a25523b0-c75a-4941-9cdf-961f3cce4b96.png",
    alt: "Bogstavet T"
  },
  "V": {
    img: "/lovable-uploads/1e80efba-0e83-48c7-aa88-40fa3c48f0a9.png",
    alt: "Bogstavet V"
  },
  "W": {
    img: "/lovable-uploads/e39fb3d1-806d-48ea-84d8-f57229d07492.png",
    alt: "Bogstavet W"
  },
  "X": {
    img: "/lovable-uploads/bd5f3fe5-451f-4dda-967d-9334aba0ae0f.png", 
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

