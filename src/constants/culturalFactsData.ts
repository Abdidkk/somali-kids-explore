export interface CulturalFact {
  id: string;
  title: string;
  factSomali: string;
  factDanish: string;
  image: string;
  audioSomali?: string;
  audioDanish?: string;
  category?: string;
}

export const CULTURAL_FACTS: CulturalFact[] = [
 
  {
    id: "nomadic_life",
    title: "Islam",
    factSomali: "Ma ogtahay in dadka Soomaaliyeed ay Muslimiin yihiin.",
    factDanish: "Vidste du at 99% af befolkningen i Somalia er muslimer.",
    image: "/Kultur/islam.png",
    audioSomali: "",
    audioDanish: "/Kultur/muslimer.mp3",
    category: "Historie"
  },
  {
    id: "hospitality",
    title: "Somalisk gæstfrihed",
    factSomali: " Dhaqanka Soodhaweynta Soomaalida. Soodhaweynta martida aad ayay muhiim u tahay dhaqanka soomaaliyeed. Martida waxaa loo sameeyaa cunto, cabitaan iyo shaah gaar ah. Waa qadarin in martida loo soo dhaweeyo sifiican. ",
    factDanish: "Gæstfrihed er en vigtig del af somalisk kultur. Gæster bliver serveret mad og drikke, herunder te og specielle retter. Det er værdsat at byde gæster velkommen på en varm måde.",
    image: "/Kultur/gæst.png",
    audioSomali: "",
    audioDanish: "/Kultur/gæstfrihed.mp3",
    category: "Traditioner"
  },
  {
    id: "traditional_food",
    title: "Traditionel mad",
    factSomali: "Dhaqan Cunto. Cunto dhaqameedka soomaalida waa cad (hilib) iyo caano, canjeero, soor iyo cambuulo. Cuntooyinka Caanka noqday waxaa kamid ah Bariis iyo hilib ari, baasto Iyo suugo. Carcarfiska waa u muhiim dhaqanka. ",
    factDanish: "Somalisk mad er baseret på kød, ris og pasta. Berømte retter inkluderer injera (fladbrød), suugo og fårekød. Krydderier er vigtige for smagen.",
    image: "/Kultur/maad.png",
    audioSomali: "",
    audioDanish: "/Kultur/retter.mp3",
    category: "Mad"
  },
  {
    id: "wedding_traditions",
    title: "Bryllupstraditioner",
    factSomali: "Dhaqanka Guurka. Arooska Soomaalidu waa munaasabad ballaadhan oo qoys iyo saaxiibaba ka qayb qaataan. Xafladda arooska kahor waxaa dhaca xaflado yaryar, sida doonista iyo meherka. Arooska kadibna waxaa jira xafladda shaash saarka ama todo",
    factDanish: "Somaliske bryllupper er store begivenheder, hvor familie og venner deltager. Der er specielle traditioner som henna-ceremonien, bryllupsnattens fest og flere dage med fejring.",
    image: "/Kultur/bryllup.png",
    audioSomali: "",
    audioDanish: "/Kultur/bryllupper.mp3",
    category: "Traditioner"
  },
  {
    id: "frankincense",
    title: "Røgelse og parfume",
    factSomali: "Fooxa iyo uunsiga ayaa taariikhda dheer ka leh Soomaaliya. Uunsiga oo ah lubaan waxaa loo isticmaalaa guryaha iyo xafladaha. Cadarku waa qayb ka mid ah dhaqanka haweenka Soomaaliyeed.",
    factDanish: "Røgelse og parfume har en lang historie i Somalia. Røgelse som frankincense bruges i hjem og ved ceremonier. Parfume er en del af somalisk kvindekultur.",
    image: "/Kultur/parfume.png",
    audioSomali: "",
    audioDanish: "/Kultur/røgelse.mp3",
    category: "Traditioner"
  },

  {
    id: "music_dance",
    title: "Musik og dans",
    factSomali: "Muusiqa iyo cayaarta Soomaalidu waxay leeyihiin taariikhda dheer. Alaabtii muusikada ee caadiga ahayd waxaa ka mid ah durbaan iyo oud. Cayaartu waxay inta badan la xidhiidhaa dabaaldeggayaasha iyo xafladaha.",
    factDanish: "Somalisk musik og dans har en lang historie. Traditionelle musikinstrumenter inkluderer trommer og oud. Dans er ofte forbundet med fejringer og festivaler.",
    image: "/Kultur/fest.png",
    audioSomali: "",
    audioDanish: "/Kultur/musik.mp3",
    category: "Kultur"
  },
  {
    id: "traditional_clothing",
    title: "Traditionelt tøj",
    factSomali: "Dharka caadiga ah ee Soomaaliyeed wuxuu ka kooban yahay macawiis (marwadii ragga), dirac iyo guntiino (haweenka). Midabada iyo nashqadaha qaarkood waxay calaamad u yihiin dhaqanka iyo gobolka.",
    factDanish: "Traditionelt somalisk tøj består af macawis (mænds sarong), dirac og guntiino (kvinders kjoler). Visse farver og mønstre symboliserer kultur og region.",
    image: "/Kultur/kultur.png",
    audioSomali: "",
    audioDanish: "/Kultur/tøj.mp3",
    category: "Traditioner"
  },
  {
    id: "respect_elders",
    title: "Respekt for ældre",
    factSomali: "Ixtiraamka dadka waayeelka ah waa qayb muhiim ah oo ka mid ah dhaqanka Soomaalida. Dadka da'da weyn waxaa loo arkaa inay yihiin xero aqoon iyo waayo-aragnimo. Waxaa laga filayaa dadka dhallinyarada ah inay maqlaan talada dadka waayeelka.",
    factDanish: "Respekt for ældre er en vigtig del af somalisk kultur. Ældre mennesker ses som kilder til viden og visdom. Unge mennesker forventes at lytte til de ældres råd.",
    image: "/Kultur/ædrer.png",
    audioSomali: "",
    audioDanish: "/Kultur/respekt.mp3",
    category: "Værdier"
  }
];

export const getAllCulturalFacts = (): CulturalFact[] => {
  return CULTURAL_FACTS;
};

export const getCulturalFactsByCategory = (category: string): CulturalFact[] => {
  return CULTURAL_FACTS.filter(fact => fact.category === category);
};
