
export interface NumberData {
  number: number;
  somali: string;
  danish: string;
}

export const NUMBERS_1_19: NumberData[] = [
  { number: 1, somali: "hal", danish: "et" },
  { number: 2, somali: "laba", danish: "to" },
  { number: 3, somali: "saddex", danish: "tre" },
  { number: 4, somali: "afar", danish: "fire" },
  { number: 5, somali: "shan", danish: "fem" },
  { number: 6, somali: "lix", danish: "seks" },
  { number: 7, somali: "todobaad", danish: "syv" },
  { number: 8, somali: "sideed", danish: "otte" },
  { number: 9, somali: "sagaal", danish: "ni" },
  { number: 10, somali: "toban", danish: "ti" },
  { number: 11, somali: "kow iyo toban", danish: "elleve" },
  { number: 12, somali: "laba iyo toban", danish: "tolv" },
  { number: 13, somali: "saddex iyo toban", danish: "tretten" },
  { number: 14, somali: "afar iyo toban", danish: "fjorten" },
  { number: 15, somali: "shan iyo toban", danish: "femten" },
  { number: 16, somali: "lix iyo toban", danish: "seksten" },
  { number: 17, somali: "todobaad iyo toban", danish: "sytten" },
  { number: 18, somali: "sideed iyo toban", danish: "atten" },
  { number: 19, somali: "sagaal iyo toban", danish: "nitten" },
];

export const NUMBERS_20_90: NumberData[] = [
  { number: 20, somali: "labaatan", danish: "tyve" },
  { number: 30, somali: "soddon", danish: "tredive" },
  { number: 40, somali: "afartan", danish: "fyrre" },
  { number: 50, somali: "konton", danish: "halvtreds" },
  { number: 60, somali: "lixdan", danish: "tres" },
  { number: 70, somali: "todobaatan", danish: "halvfjerds" },
  { number: 80, somali: "sideedatan", danish: "firs" },
  { number: 90, somali: "sagaashan", danish: "halvfems" },
];

export const NUMBERS_100_1000: NumberData[] = [
  { number: 100, somali: "boqol", danish: "hundrede" },
  { number: 200, somali: "laba boqol", danish: "to hundrede" },
  { number: 300, somali: "saddex boqol", danish: "tre hundrede" },
  { number: 400, somali: "afar boqol", danish: "fire hundrede" },
  { number: 500, somali: "shan boqol", danish: "fem hundrede" },
  { number: 600, somali: "lix boqol", danish: "seks hundrede" },
  { number: 700, somali: "todobaad boqol", danish: "syv hundrede" },
  { number: 800, somali: "sideed boqol", danish: "otte hundrede" },
  { number: 900, somali: "sagaal boqol", danish: "ni hundrede" },
  { number: 1000, somali: "kun", danish: "tusind" },
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
