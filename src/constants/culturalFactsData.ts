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
    id: "tea_ceremony",
    title: "Somalisk te-ceremoni",
    factSomali: "Shaaha waa qayb muhiim ah oo ka mid ah dhaqanka Soomaalida. Waxaa loo sameeyaa shaaha cadays oo lagu daro qorfe iyo xawaash kale sida qarfaha iyo gingir. Shaaha waxa lagu cabbaa marka la kulmayo asxaabta iyo qoysaska.",
    factDanish: "Te er en vigtig del af somalisk kultur. Somalisk te laves med sort te, kardemomme og andre krydderier som kanel og ingefær. Te drikkes ved sociale sammenkomster med venner og familie.",
    image: "/placeholder.svg",
    category: "Traditioner"
  },
  {
    id: "nomadic_life",
    title: "Nomadeliv",
    factSomali: "Dadka Soomaaliyeed badan waxay asal ahaan ahaayeen reer-guuraa oo xoolo dhaqato ah. Waxa ay guuri jireen meel ka meel raadinta daaq iyo biyo xoolaha. Dhaqanka reer-guuraa ayaa weli jira qaybo ka mid ah Soomaaliya.",
    factDanish: "Mange somaliere var traditionelt nomader og dyrehold. De flyttede fra sted til sted for at finde græs og vand til deres dyr. Den nomadiske kultur eksisterer stadig i dele af Somalia.",
    image: "/placeholder.svg",
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
    id: "poetry",
    title: "Somalisk poesi",
    factSomali: "Gabaygu waa fanka ugu caansan Soomaaliya. Waxaa jira noocyo badan oo gabay ah, oo loogu isticmaalo sheekooyin, taariikhda iyo xisbiyada siyaasadeed. Gabaygu waa hab looga dhaxlo karo dhaqanka iyo taariikhda.",
    factDanish: "Poesi er den mest berømte kunstart i Somalia. Der findes mange typer poesi, der bruges til historier, historie og politiske budskaber. Poesi er en måde at videregive kultur og historie på.",
    image: "/placeholder.svg",
    category: "Kultur"
  },
  {
    id: "music_dance",
    title: "Musik og dans",
    factSomali: "Muusiqa iyo cayaarta Soomaalidu waxay leeyihiin taariikhda dheer. Alaabtii muusikada ee caadiga ahayd waxaa ka mid ah durbaan iyo oud. Cayaartu waxay inta badan la xidhiidhaa dabaaldeggayaasha iyo xafladaha.",
    factDanish: "Somalisk musik og dans har en lang historie. Traditionelle musikinstrumenter inkluderer trommer og oud. Dans er ofte forbundet med fejringer og festivaler.",
    image: "/placeholder.svg",
    category: "Kultur"
  },
  {
    id: "traditional_food",
    title: "Traditionel mad",
    factSomali: "Cuntada Soomaalidu waxay ku salaysan tahay hilib, bariis, iyo baasto. Cuntooyin caaan ah waxaa ka mid ah canjeero (rooti caato ah), suugo, iyo hilib ari. Xawaashku muhiim bay u yihiin dhadhanka.",
    factDanish: "Somalisk mad er baseret på kød, ris og pasta. Berømte retter inkluderer injera (fladbrød), suugo og fårekød. Krydderier er vigtige for smagen.",
    image: "/placeholder.svg",
    category: "Mad"
  },
  {
    id: "wedding_traditions",
    title: "Bryllupstraditioner",
    factSomali: "Arooskii Soomaalidu waa munaasabad ballaadhan oo qoys iyo saaxiibba ka qayb qaataan. Waxaa jira dhaqamo gaar ah sida meerishu, habeenka arooskii iyo dhawr maalmood oo dabaaldeg ah. Dhaqanka arooskii wuu kala duwan yahay gobol ka gobol.",
    factDanish: "Somaliske bryllupper er store begivenheder, hvor familie og venner deltager. Der er specielle traditioner som henna-ceremonien, bryllupsnattens fest og flere dage med fejring. Bryllupstraditioner varierer fra region til region.",
    image: "/placeholder.svg",
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
    id: "henna_art",
    title: "Henna-kunst",
    factSomali: "Xinnaha waa farshaxan caado ah oo haweenka Soomaaliyeed ay isticmaalaan marka ay jiraan dabaaldegyo sida aroosyada iyo ciidaha. Qaabka xinnaha wuu kala duwan yahay gobolka iyo qofka.",
    factDanish: "Henna er en traditionel kunstform, som somaliske kvinder bruger ved fejringer som bryllupper og religiøse højtider. Henna-mønstrene varierer efter region og person.",
    image: "/placeholder.svg",
    category: "Kunst"
  },
  {
    id: "traditional_clothing",
    title: "Traditionelt tøj",
    factSomali: "Dharka caadiga ah ee Soomaaliyeed wuxuu ka kooban yahay macawiis (marwadii ragga), dirac iyo guntiino (haweenka). Midabada iyo nashqadaha qaarkood waxay calaamad u yihiin dhaqanka iyo gobolka.",
    factDanish: "Traditionelt somalisk tøj består af macawis (mænds sarong), dirac og guntiino (kvinders kjoler). Visse farver og mønstre symboliserer kultur og region.",
    image: "/placeholder.svg",
    category: "Traditioner"
  },
  {
    id: "respect_elders",
    title: "Respekt for ældre",
    factSomali: "Ixtiraamka dadka waayeelka ah waa qayb muhiim ah oo ka mid ah dhaqanka Soomaalida. Dadka da'da weyn waxaa loo arkaa inay yihiin xero aqoon iyo waayo-aragnimo. Waxaa laga filayaa dadka dhallinyarada ah inay maqlaan talada dadka waayeelka.",
    factDanish: "Respekt for ældre er en vigtig del af somalisk kultur. Ældre mennesker ses som kilder til viden og visdom. Unge mennesker forventes at lytte til de ældres råd.",
    image: "/placeholder.svg",
    category: "Værdier"
  }
];

export const getAllCulturalFacts = (): CulturalFact[] => {
  return CULTURAL_FACTS;
};

export const getCulturalFactsByCategory = (category: string): CulturalFact[] => {
  return CULTURAL_FACTS.filter(fact => fact.category === category);
};
