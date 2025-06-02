
export const CONTINENTS = [
  { danish: "Afrika", somali: "Afrika" },
  { danish: "Europa", somali: "Yurub" },
  { danish: "Asien", somali: "Aasiya" },
  { danish: "Nordamerika", somali: "Waqooyiga Ameerika" },
  { danish: "Sydamerika", somali: "Koonfurta Ameerika" },
  { danish: "Australien", somali: "Awstaraaliya" },
  { danish: "Antarktis", somali: "Antaarktika" }
];

export const COUNTRIES = [
  { danish: "Somalia", somali: "Soomaaliya", flag: "🇸🇴" },
  { danish: "Kenya", somali: "Kenya", flag: "🇰🇪" },
  { danish: "Sydafrika", somali: "Koonfur Afrika", flag: "🇿🇦" },
  { danish: "Egypten", somali: "Masar", flag: "🇪🇬" },
  { danish: "Nigeria", somali: "Nayjeeriya", flag: "🇳🇬" },
  { danish: "Etiopien", somali: "Itoobiya", flag: "🇪🇹" },
  { danish: "Ghana", somali: "Gaana", flag: "🇬🇭" },
  { danish: "Uganda", somali: "Ugaanda", flag: "🇺🇬" },
  { danish: "Tanzania", somali: "Tansaaniya", flag: "🇹🇿" },
  { danish: "Algeriet", somali: "Aljeeriya", flag: "🇩🇿" },
  { danish: "Marokko", somali: "Marooko", flag: "🇲🇦" },
  { danish: "Senegal", somali: "Sinigal", flag: "🇸🇳" },
  { danish: "Danmark", somali: "Denmark", flag: "🇩🇰" },
  { danish: "Norge", somali: "Noorwey", flag: "🇳🇴" },
  { danish: "Sverige", somali: "Iswidhan", flag: "🇸🇪" },
  { danish: "Finland", somali: "Fiinland", flag: "🇫🇮" },
  { danish: "Tyskland", somali: "Jarmal", flag: "🇩🇪" },
  { danish: "Frankrig", somali: "Faransiis", flag: "🇫🇷" },
  { danish: "Spanien", somali: "Isbeyn", flag: "🇪🇸" },
  { danish: "Italien", somali: "Talyaani", flag: "🇮🇹" },
  { danish: "Portugal", somali: "Boortaqiis", flag: "🇵🇹" },
  { danish: "Holland", somali: "Holand", flag: "🇳🇱" },
  { danish: "Belgien", somali: "Beljam", flag: "🇧🇪" },
  { danish: "Østrig", somali: "Oostriya", flag: "🇦🇹" },
  { danish: "Polen", somali: "Booland", flag: "🇵🇱" },
  { danish: "Grækenland", somali: "Giriig", flag: "🇬🇷" },
  { danish: "Tyrkiet", somali: "Turki", flag: "🇹🇷" },
  { danish: "Rusland", somali: "Ruush", flag: "🇷🇺" },
  { danish: "Storbritannien", somali: "Boqortooyada Midowday", flag: "🇬🇧" },
  { danish: "Irland", somali: "Ayrlaan", flag: "🇮🇪" },
  { danish: "Canada", somali: "Kanada", flag: "🇨🇦" },
  { danish: "USA", somali: "Maraykanka", flag: "🇺🇸" },
  { danish: "Mexico", somali: "Meksiko", flag: "🇲🇽" },
  { danish: "Brasilien", somali: "Baraasiil", flag: "🇧🇷" },
  { danish: "Argentina", somali: "Arjantiin", flag: "🇦🇷" },
  { danish: "Kina", somali: "Shiinaha", flag: "🇨🇳" },
  { danish: "Indien", somali: "Hindiya", flag: "🇮🇳" }
];

export const NATURE_LANDSCAPES = [
  { danish: "Bjerg", somali: "Buuro", emoji: "🏔️" },
  { danish: "Hav", somali: "Badda", emoji: "🌊" },
  { danish: "Sø", somali: "Haro", emoji: "🏞️" },
  { danish: "Flod", somali: "Webi", emoji: "🏞️" },
  { danish: "Skov", somali: "Kaynta", emoji: "🌲" },
  { danish: "Ørken", somali: "Saxaraha", emoji: "🏜️" },
  { danish: "Ø", somali: "Jasiirad", emoji: "🏝️" },
  { danish: "By", somali: "Magaalo", emoji: "🏙️" },
  { danish: "Land", somali: "Tuulo", emoji: "🌾" }
];

export const GEOGRAPHY_GROUPS = {
  continents: { label: "Kontinenter", items: CONTINENTS },
  countries: { label: "Lande og flag", items: COUNTRIES },
  nature: { label: "Natur og landskaber", items: NATURE_LANDSCAPES }
};

// Farver for visuel differentiation
export const getGeographyItemColor = (index: number, type: 'continents' | 'countries' | 'nature') => {
  const colors = {
    continents: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FCEA2B', '#FF9F43', '#EE5A24'],
    countries: ['#3742FA', '#2F3542', '#FF3838', '#FF6348', '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43', '#10AC84', '#EE5A24', '#C44569'],
    nature: ['#7ED321', '#F5A623', '#D0021B', '#4A90E2', '#9013FE', '#50E3C2', '#B8E986', '#4A4A4A', '#7B68EE']
  };
  
  return colors[type][index % colors[type].length];
};

// Audio filer - placeholder til senere implementering
export const GEOGRAPHY_AUDIO_FILES: Record<string, string> = {};

export function hasGeographyAudio(word: string): boolean {
  return GEOGRAPHY_AUDIO_FILES[word] && GEOGRAPHY_AUDIO_FILES[word] !== "";
}
