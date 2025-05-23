
// Letter group definitions for the Somali alphabet
export const SHORT_VOWELS = ["A", "E", "I", "O", "U"];
export const LONG_VOWELS = ["AA", "EE", "II", "OO", "UU"];
export const CONSONANTS: string[] = ["B", "C", "D", "DH", "F", "G", "H", "J", "K", "KH", "L", "M", "N", "P", "Q", "R", "S", "SH", "T", "V", "W", "X", "Y", "Z"];

export const GROUPS = {
  alphabet: { label: "Alfabetet", letters: CONSONANTS },
  short:    { label: "Korte vokaler", letters: SHORT_VOWELS },
  long:     { label: "Lange vokaler", letters: LONG_VOWELS }
};
