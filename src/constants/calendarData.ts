
export const WEEKDAYS = [
  { danish: "Mandag", somali: "Isniin" },
  { danish: "Tirsdag", somali: "Talaado" },
  { danish: "Onsdag", somali: "Arbaco" },
  { danish: "Torsdag", somali: "Khamiis" },
  { danish: "Fredag", somali: "Jimce" },
  { danish: "Lørdag", somali: "Sabti" },
  { danish: "Søndag", somali: "Axad" }
];

export const MONTHS = [
  { danish: "Januar", somali: "Janaayo" },
  { danish: "Februar", somali: "Febraayo" },
  { danish: "Marts", somali: "Maarso" },
  { danish: "April", somali: "Abriil" },
  { danish: "Maj", somali: "Maajo" },
  { danish: "Juni", somali: "Juun" },
  { danish: "Juli", somali: "Luuliyo" },
  { danish: "August", somali: "Agoosto" },
  { danish: "September", somali: "Sebteembar" },
  { danish: "Oktober", somali: "Oktoobar" },
  { danish: "November", somali: "Nofeembar" },
  { danish: "December", somali: "Diseembar" }
];

export const SEASONS = [
  { danish: "Forår", somali: "Guga" },
  { danish: "Sommer", somali: "Xagaaga" },
  { danish: "Efterår", somali: "Dayrta" },
  { danish: "Vinter", somali: "Jiilaalka" }
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
