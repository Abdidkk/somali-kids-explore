export interface calendarItem {
  danish: string;
  somali: string;
  audio?: string;
}


export const WEEKDAYS = [
  { danish: "Mandag", somali: "Isniin", audio: "/kalender/mandag.mp3" },
  { danish: "Tirsdag", somali: "Talaado", audio: "/kalender/tirsdag.mp3" },
  { danish: "Onsdag", somali: "Arbaco", audio: "/kalender/onsdag.mp3" },
  { danish: "Torsdag", somali: "Khamiis", audio: "/kalender/torsdag.mp3" },
  { danish: "Fredag", somali: "Jimce", audio: "/kalender/fredag.mp3" },
  { danish: "Lørdag", somali: "Sabti", audio: "/kalender/lordag.mp3" },
  { danish: "Søndag", somali: "Axad", audio: "/kalender/sondag.mp3" }
];

export const MONTHS = [
  { danish: "Januar", somali: "Janaayo", audio: "/kalender/januar.mp3" },
  { danish: "Februar", somali: "Febraayo", audio: "/kalender/feb.mp3" },
  { danish: "Marts", somali: "Maarso", audio: "/kalender/mar.mp3" },
  { danish: "April", somali: "Abriil", audio: "/kalender/apr.mp3" },
  { danish: "Maj", somali: "Maajo", audio: "/kalender/maj.mp3" },
  { danish: "Juni", somali: "Juun", audio: "/kalender/juni.mp3" },
  { danish: "Juli", somali: "Luuliyo", audio: "/kalender/juli.mp3" },
  { danish: "August", somali: "Agoosto", audio: "/kalender/aug.mp3" },
  { danish: "September", somali: "Sebteembar", audio: "/kalender/sep.mp3" },
  { danish: "Oktober", somali: "Oktoobar", audio: "/kalender/okt.mp3" },
  { danish: "November", somali: "Nofeembar", audio: "/kalender/nov.mp3" },
  { danish: "December", somali: "Diseembar", audio: "/kalender/dec.mp3" }
];

export const SEASONS = [
  { danish: "Forår", somali: "Guga", audio: "/kalender/forar.mp3" },
  { danish: "Sommer", somali: "Xagaaga", audio: "/kalender/sommer.mp3" },
  { danish: "Efterår", somali: "Dayrta", audio: "/kalender/efterar.mp3" },
  { danish: "Vinter", somali: "Jiilaalka", audio: "/kalender/vinter.mp3" }
];

export const CALENDAR_GROUPS = {
  weekdays: { label: "Ugedage", items: WEEKDAYS },
  months: { label: "Måneder", items: MONTHS },
  seasons: { label: "Årstider", items: SEASONS }
};

// Farver for visuel differentiation
export const getCalendarItemColor = (index: number, type: 'weekdays' | 'months' | 'seasons') => {
  const colors = {
    weekdays: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FCEA2B', '#FF9F43', '#EE5A24'],
    months: ['#3742FA', '#2F3542', '#FF3838', '#FF6348', '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43', '#10AC84', '#EE5A24', '#C44569'],
    seasons: ['#7ED321', '#F5A623', '#D0021B', '#4A90E2']
  };
  
  return colors[type][index % colors[type].length];
};

// Audio filer - placeholder til senere implementering
export const CALENDAR_AUDIO_FILES: Record<string, string> = {};

export function hasCalendarAudio(word: string): boolean {
  return CALENDAR_AUDIO_FILES[word] && CALENDAR_AUDIO_FILES[word] !== "";
}
