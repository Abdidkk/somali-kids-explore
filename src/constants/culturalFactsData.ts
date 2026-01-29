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
    category: "Historie"
  },
  {
    id: "hospitality",
    title: "Somalisk gæstfrihed",
    factSomali: "Martiqaadnimadu waa qayb muhiim ah oo ka mid ah dhaqanka Soomaalida. Martida waxaa loo sameeyaa cunto iyo cabitaan, waxaana loo isticmaalaa shaaha iyo cunno gaar ah. Waa qadarin in martida loo dhoweeyo si fiican.",
    factDanish: "Gæstfrihed er en vigtig del af somalisk kultur. Gæster bliver serveret mad og drikke, herunder te og specielle retter. Det er værdsat at byde gæster velkommen på en varm måde.",
    image: "/placeholder.svg",
    category: "Traditioner"
  },
  {
    id: "traditional_food",
    title: "Traditionel mad",
    factSomali: "Cuntada Soomaalidu waxay ku salaysan tahay hilib, bariis, iyo baasto. Cuntooyin caaan ah waxaa ka mid ah canjeero (rooti caato ah), suugo, iyo hilib ari. Xawaashku muhiim bay u yihiin dhadhanka.",
    factDanish: "Somalisk mad er baseret på kød, ris og pasta. Berømte retter inkluderer injera (fladbrød), suugo og fårekød. Krydderier er vigtige for smagen.",
    image: "/Kultur/maad.png",
    category: "Mad"
  },
  {
    id: "wedding_traditions",
    title: "Bryllupstraditioner",
    factSomali: "Arooskii Soomaalidu waa munaasabad ballaadhan oo qoys iyo saaxiibba ka qayb qaataan. Waxaa jira dhaqamo gaar ah sida meerishu, habeenka arooskii iyo dhawr maalmood oo dabaaldeg ah. Dhaqanka arooskii wuu kala duwan yahay gobol ka gobol.",
    factDanish: "Somaliske bryllupper er store begivenheder, hvor familie og venner deltager. Der er specielle traditioner som henna-ceremonien, bryllupsnattens fest og flere dage med fejring. Bryllupstraditioner varierer fra region til region.",
    image: "/Kultur/bryllup.png",
    category: "Traditioner"
  },
  {
    id: "frankincense",
    title: "Røgelse og parfume",
    factSomali: "Fooxa iyo uunsiga ayaa taariikhda dheer ka leh Soomaaliya. Uunsiga oo ah lubaan waxaa loo isticmaalaa guryaha iyo xafladaha. Cadarku waa qayb ka mid ah dhaqanka haweenka Soomaaliyeed.",
    factDanish: "Røgelse og parfume har en lang historie i Somalia. Røgelse som frankincense bruges i hjem og ved ceremonier. Parfume er en del af somalisk kvindekultur.",
    image: "/placeholder.svg",
    category: "Traditioner"
  },
  {
    id: "oral_tradition",
    title: "Mundtlig tradition",
    factSomali: "Dhaqanka afka ah waa hab muhiim ah oo lagu dhaxliyo aqoonta Soomaalida. Sheekooyin, maahmaahyo iyo taariikhda waxaa lagu dhaxlaa afka. Dadka waayeelku door muhiim ah ayay ka ciyaaraan dhaxalka aqoontan.",
    factDanish: "Mundtlig tradition er en vigtig måde at videregive somalisk viden på. Historier, ordsprog og historie videregives gennem tale. Ældre mennesker spiller en vigtig rolle i at bevare denne viden.",
    image: "/placeholder.svg",
    category: "Kultur"
  },
  {
    id: "music_dance",
    title: "Musik og dans",
    factSomali: "Muusiqa iyo cayaarta Soomaalidu waxay leeyihiin taariikhda dheer. Alaabtii muusikada ee caadiga ahayd waxaa ka mid ah durbaan iyo oud. Cayaartu waxay inta badan la xidhiidhaa dabaaldeggayaasha iyo xafladaha.",
    factDanish: "Somalisk musik og dans har en lang historie. Traditionelle musikinstrumenter inkluderer trommer og oud. Dans er ofte forbundet med fejringer og festivaler.",
    image: "/Kultur/dans.png",
    category: "Kultur"
  },
  {
    id: "traditional_clothing",
    title: "Traditionelt tøj",
    factSomali: "Dharka caadiga ah ee Soomaaliyeed wuxuu ka kooban yahay macawiis (marwadii ragga), dirac iyo guntiino (haweenka). Midabada iyo nashqadaha qaarkood waxay calaamad u yihiin dhaqanka iyo gobolka.",
    factDanish: "Traditionelt somalisk tøj består af macawis (mænds sarong), dirac og guntiino (kvinders kjoler). Visse farver og mønstre symboliserer kultur og region.",
    image: "/Kultur/kultur.png",
    category: "Traditioner"
  },
  {
    id: "respect_elders",
    title: "Respekt for ældre",
    factSomali: "Ixtiraamka dadka waayeelka ah waa qayb muhiim ah oo ka mid ah dhaqanka Soomaalida. Dadka da'da weyn waxaa loo arkaa inay yihiin xero aqoon iyo waayo-aragnimo. Waxaa laga filayaa dadka dhallinyarada ah inay maqlaan talada dadka waayeelka.",
    factDanish: "Respekt for ældre er en vigtig del af somalisk kultur. Ældre mennesker ses som kilder til viden og visdom. Unge mennesker forventes at lytte til de ældres råd.",
    image: "/Kultur/ældre.png",
    category: "Værdier"
  }
];

export const getAllCulturalFacts = (): CulturalFact[] => {
  return CULTURAL_FACTS;
};

export const getCulturalFactsByCategory = (category: string): CulturalFact[] => {
  return CULTURAL_FACTS.filter(fact => fact.category === category);
};
