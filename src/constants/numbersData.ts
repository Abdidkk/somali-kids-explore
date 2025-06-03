
export interface NumberData {
  number: number;
  somali: string;
  danish: string;
}

export const NUMBERS_1_19: NumberData[] = [
  { number: 1, somali: "Kow", danish: "et" },
  { number: 2, somali: "Laba", danish: "to" },
  { number: 3, somali: "Saddex", danish: "tre" },
  { number: 4, somali: "Afar", danish: "fire" },
  { number: 5, somali: "Shan", danish: "fem" },
  { number: 6, somali: "Lix", danish: "seks" },
  { number: 7, somali: "Todobaad", danish: "syv" },
  { number: 8, somali: "Sideed", danish: "otte" },
  { number: 9, somali: "Sagaal", danish: "ni" },
  { number: 10, somali: "Toban", danish: "ti" },
  { number: 11, somali: "Kow iyo toban", danish: "elleve" },
  { number: 12, somali: "Laba iyo toban", danish: "tolv" },
  { number: 13, somali: "Saddex iyo toban", danish: "tretten" },
  { number: 14, somali: "Afar iyo toban", danish: "fjorten" },
  { number: 15, somali: "Shan iyo toban", danish: "femten" },
  { number: 16, somali: "Lix iyo toban", danish: "seksten" },
  { number: 17, somali: "Todobaad iyo toban", danish: "sytten" },
  { number: 18, somali: "Sideed iyo toban", danish: "atten" },
  { number: 19, somali: "Sagaal iyo toban", danish: "nitten" },
];

export const NUMBERS_20_90: NumberData[] = [
  { number: 20, somali: "Labaatan", danish: "tyve" },
  { number: 30, somali: "Soddon", danish: "tredive" },
  { number: 40, somali: "Afartan", danish: "fyrre" },
  { number: 50, somali: "Konton", danish: "halvtreds" },
  { number: 60, somali: "Lixdan", danish: "tres" },
  { number: 70, somali: "Todobaatan", danish: "halvfjerds" },
  { number: 80, somali: "Sideedatan", danish: "firs" },
  { number: 90, somali: "Sagaashan", danish: "halvfems" },
];

export const NUMBERS_100_1000: NumberData[] = [
  { number: 100, somali: "Boqol", danish: "hundrede" },
  { number: 200, somali: "Laba boqol", danish: "to hundrede" },
  { number: 300, somali: "Saddex boqol", danish: "tre hundrede" },
  { number: 400, somali: "Afar boqol", danish: "fire hundrede" },
  { number: 500, somali: "Shan boqol", danish: "fem hundrede" },
  { number: 600, somali: "Lix boqol", danish: "seks hundrede" },
  { number: 700, somali: "Todobaad boqol", danish: "syv hundrede" },
  { number: 800, somali: "Sideed boqol", danish: "otte hundrede" },
  { number: 900, somali: "Sagaal boqol", danish: "ni hundrede" },
  { number: 1000, somali: "Kun", danish: "tusind" },
];

export function getNumbersForTab(tab: string): NumberData[] {
  switch (tab) {
    case "1-19":
      return NUMBERS_1_19;
    case "20-90":
      return NUMBERS_20_90;
    case "100-1000":
      return NUMBERS_100_1000;
    default:
      return NUMBERS_1_19;
  }
}
