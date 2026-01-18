export interface GeographyItem {
  danish: string;
  somali: string;
  audio?: string;
}

interface countryItem extends GeographyItem {
  flag: string;
}

interface continentItem extends GeographyItem {}

export const CONTINENTS: continentItem[] = [
  { danish: "Afrika", somali: "Afrika", audio: "/geografi/afrika.mp3" },
  { danish: "Europa", somali: "Yurub", audio: "/geografi/europa.mp3" },
  { danish: "Asien", somali: "Aasiya", audio: "/geografi/asien .mp3" },
  { danish: "Nordamerika", somali: "Waqooyiga Ameerika", audio: "/geografi/na.mp3" },
  { danish: "Sydamerika", somali: "Koonfurta Ameerika" , audio: "/geografi/sa.mp3" },
  { danish: "Australien", somali: "Awstaraaliya" , audio: "/geografi/Australien.mp3" },
  { danish: "Antarktis", somali: "Antaartika" , audio: "/geografi/Antarktis.mp3" }
];

export const COUNTRIES: countryItem[] = [
  { danish: "Somalia", somali: "Soomaaliya", audio: "/geografi/somalia.mp3", flag: "🇸🇴", },
  { danish: "Kenya", somali: "Keenya", audio: "/geografi/kenya.mp3", flag: "🇰🇪" },
  { danish: "Sydafrika", somali: "Koonfur Afrika", audio: "/geografi/koonfur.mp3", flag: "🇿🇦" },
  { danish: "Egypten", somali: "Masar", audio: "/geografi/egypten.mp3", flag: "🇪🇬" },
  { danish: "Nigeria", somali: "Nayjeeriya", audio: "/geografi/nigera.mp3", flag: "🇳🇬" },
  { danish: "Etiopien", somali: "Itoobiya", audio: "/geografi/etiopien.mp3", flag: "🇪🇹" },
  { danish: "Ghana", somali: "Gaana", audio: "/geografi/ghana.mp3", flag: "🇬🇭" },
  { danish: "Uganda", somali: "Ugaanda", audio: "/geografi/uganda.mp3", flag: "🇺🇬" },
  { danish: "Tanzania", somali: "Tansaaniya", audio: "/geografi/tanzania.mp3", flag: "🇹🇿" },
  { danish: "Algeriet", somali: "Aljeeriya", audio: "/geografi/algeriet.mp3", flag: "🇩🇿" },
  { danish: "Marokko", somali: "Marooko", audio: "/geografi/marokko.mp3", flag: "🇲🇦" },
  { danish: "Senegal", somali: "Sinigal", audio: "/geografi/senegal.mp3", flag: "🇸🇳" },
  { danish: "Danmark", somali: "Denmark", audio: "/geografi/danmark.mp3", flag: "🇩🇰" },
  { danish: "Norge", somali: "Noorwey", audio: "/geografi/norg.mp3", flag: "🇳🇴" },
  { danish: "Sverige", somali: "Iswiidhan", audio: "/geografi/sverige.mp3", flag: "🇸🇪" },
  { danish: "Finland", somali: "Fiinland", audio: "/geografi/finland.mp3", flag: "🇫🇮" },
  { danish: "Tyskland", somali: "Jarmal", audio: "/geografi/tyskland.mp3", flag: "🇩🇪" },
  { danish: "Frankrig", somali: "Faransiis", audio: "/geografi/frankrig.mp3", flag: "🇫🇷" },
  { danish: "Spanien", somali: "Isbeyn", audio: "/geografi/spanien.mp3", flag: "🇪🇸" },
  { danish: "Italien", somali: "Talyaani", audio: "/geografi/italien.mp3", flag: "🇮🇹" },
  { danish: "Portugal", somali: "Boortaqiis", audio: "/geografi/portugal.mp3", flag: "🇵🇹" },
  { danish: "Holland", somali: "Holand", audio: "/geografi/holland.mp3", flag: "🇳🇱" },
  { danish: "Belgien", somali: "Biljam", audio: "/geografi/belgien.mp3", flag: "🇧🇪" },
  { danish: "Østrig", somali: "Oostariya", audio: "/geografi/ostrig.mp3", flag: "🇦🇹" },
  { danish: "Polen", somali: "Boolan", audio: "/geografi/polen.mp3", flag: "🇵🇱" },
  { danish: "Grækenland", somali: "Giriig", audio: "/geografi/grækenland.mp3", flag: "🇬🇷" },
  { danish: "Tyrkiet", somali: "Turki", audio: "/geografi/tyrkiet.mp3", flag: "🇹🇷" },
  { danish: "Rusland", somali: "Ruush", audio: "/geografi/rusland.mp3", flag: "🇷🇺" },
  { danish: "England", somali: "Ingiriis", audio: "/geografi/england.mp3", flag: "🇬🇧" },
  { danish: "Irland", somali: "Ayrlaan", audio: "/geografi/irland.mp3", flag: "🇮🇪" },
  { danish: "Canada", somali: "Kanada", audio: "/geografi/canada.mp3", flag: "🇨🇦" },
  { danish: "USA", somali: "Maraykan", audio: "/geografi/maraycan.mp3", flag: "🇺🇸" },
  { danish: "Mexico", somali: "Meksiko", audio: "/geografi/mexico.mp3", flag: "🇲🇽" },
  { danish: "Brasilien", somali: "Baraasiil", audio: "/geografi/brasilien.mp3", flag: "🇧🇷" },
  { danish: "Argentina", somali: "Arjantiin", audio: "/geografi/argentina.mp3", flag: "🇦🇷" },
  { danish: "Kina", somali: "Shiinaha", audio: "/geografi/kina.mp3", flag: "🇨🇳" },
  { danish: "Indien", somali: "Hindiya", audio: "/geografi/indien.mp3", flag: "🇮🇳" }
];

export const NATURE_LANDSCAPES = [
  { danish: "Bjerg", somali: "Buur", audio: "/geografi/buur.mp3", emoji: "🏔️" },
  { danish: "Havet", somali: "Badda", audio: "/geografi/strand.mp3", emoji: "🌊" },
  { danish: "Sø", somali: "Haro", audio: "/geografi/haro.mp3", emoji: "🏞️" },
  { danish: "Flod", somali: "Wabi", audio: "/geografi/wabi.mp3", emoji: "🏞️" },
  { danish: "Skov", somali: "Kaynta", audio: "/geografi/skov.mp3", emoji: "🌲" },
  { danish: "Ørken", somali: "Saxaraha", audio: "/geografi/orken.mp3", emoji: "🏜️" },
  { danish: "Ø", somali: "Jasiirad", audio: "/geografi/o.mp3", emoji: "🏝️" },
  { danish: "By", somali: "Magaalo", audio: "/geografi/by.mp3", emoji: "🏙️" },
  { danish: "Landsby", somali: "Tuulo", audio: "/geografi/land.mp3", emoji: "🌾" }
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
export const GEOGRAPHY_AUDIO_FILES: Record<string, string> = {
// Kontinenter

};

export function hasGeographyAudio(word: string): boolean {
  return GEOGRAPHY_AUDIO_FILES[word] && GEOGRAPHY_AUDIO_FILES[word] !== "";
}
