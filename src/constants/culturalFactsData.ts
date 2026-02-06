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
    audioSomali: "/Kultur/muslimiin.mp3",
    audioDanish: "/Kultur/muslimer.mp3",
    category: "Historie"
  },
  {
    id: "hospitality",
    title: "Somalisk gæstfrihed",
    factSomali: " Dhaqanka Soodhaweynta Soomaalida. Soodhaweynta martida aad ayay muhiim u tahay dhaqanka soomaaliyeed. Martida waxaa loo sameeyaa cunto, cabitaan iyo shaah gaar ah. Waa qadarin in martida loo soo dhaweeyo sifiican. ",
    factDanish: "Gæstfrihed er en vigtig del af somalisk kultur. Gæster bliver serveret mad og drikke, herunder te og specielle retter. Det er værdsat at byde gæster velkommen på en varm måde.",
    image: "/Kultur/gæst.png",
    audioSomali: "/Kultur/soodhaweynta.mp3",
    audioDanish: "/Kultur/gæstfrihed.mp3",
    category: "Traditioner"
  },
  {
    id: "traditional_food",
    title: "Traditionel mad",
    factSomali: "Dhaqan Cunto. Cunto dhaqameedka soomaalida waa cad (hilib) iyo caano, canjeero, soor iyo cambuulo. Cuntooyinka Caanka noqday waxaa kamid ah Bariis iyo hilib ari, baasto Iyo suugo. Carcarfiska waa u muhiim dhaqanka. ",
    factDanish: "Traditionelt somalisk mad, består af kød, kamelmælk, bønner, polenta og pandekagelignende fladbrød. Med tiden er retter som pasta med kødsovs, ris og lammekød blevet populære somaliske retter. Krydderier spiller en central rolle i somalisk  madlavning.",
    image: "/Kultur/maad.png",
    audioSomali: "/Kultur/cunto.mp3",
    audioDanish: "/Kultur/retter.mp3",
    category: "Mad"
  },
  {
    id: "wedding_traditions",
    title: "Bryllupstraditioner",
    factSomali: "Dhaqanka Guurka. Arooska Soomaalidu waa munaasabad ballaadhan oo qoys iyo saaxiibaba ka qayb qaataan. Xafladda arooska kahor waxaa dhaca xaflado yaryar, sida doonista iyo meherka. Arooska kadibna waxaa jira xafladda shaash saarka ama todobo bax",
    factDanish: "Somaliske bryllupper er store begivenheder, hvor familie og venner deltager. Der er specielle traditioner som henna-ceremonien, bryllupsnattens fest og flere dage med fejring.",
    image: "/Kultur/bryllup.png",
    audioSomali: "/Kultur/arooska.mp3",
    audioDanish: "/Kultur/bryllupper.mp3",
    category: "Traditioner"
  },
  {
    id: "frankincense",
    title: "Røgelse og parfume",
    factSomali: "Dhaqanka udgoonka Iyo uunsiga. Fooxa iyo uunsiga ayaa taariikh dheer ku leh Soomaaliya. Uunsiga waxaa loo isticmaalaa carfinta guryaha iyo xafladaha. Fooxa/ lubaantana waxaa laga sameeyaa waxyaabaha carfa. Cadarku waa qayb ka mid ah dhaqanka is carfinta haweenka Soomaaliyeed.",
    factDanish: "Røgelse og parfume har en lang historie i Somalia. Røgelse som frankincense bruges i hjem og ved ceremonier. Parfume er en del af somalisk kvindekultur.",
    image: "/Kultur/parfume.png",
    audioSomali: "/Kultur/udgoonka.mp3",
    audioDanish: "/Kultur/røgelse.mp3",
    category: "Traditioner"
  },

  {
    id: "music_dance",
    title: "Musik og dans",
    factSomali: "Dhaqanka ciyaarta Muusiga iyo cayaaraha Soomaalida waxay leeyihiin taariikh dheer. Qalabka muusiga waxaa ka mid ah durbaanka iyo kaban . Cayaaraha dhaantada, buraamburka iyo kuwa kale oo badan.",
    factDanish: "Musik og dans har været en del af det somaliske kultur længe. der findes mange dansetyper. Traditionelle musikinstrumenter inkluderer trommer og mandola. Dans er ofte forbundet med fejringer og festivaler.",
    image: "/Kultur/fest.png",
    audioSomali: "/Kultur/ciyaarta.mp3",
    audioDanish: "/Kultur/musik.mp3",
    category: "Kultur"
  },
  {
    id: "traditional_clothing",
    title: "Traditionelt tøj",
    factSomali: " Dhaqanka dharka Dharka caadiga ah ee Soomaaliyeed wuxuu ka kooban yahay macawiis, dirac iyo guntiino. Si lamid ah cayaaraha, Qaabka xirashada hidaha iyo dhaqanka way ku Kala duwan yihiin gobolada",
    factDanish: "Traditionelt somalisk tøj består af mænds sarong, kjoler i forskellige farver og modeller til kvinder. Visse farver og mønstre symboliserer kultur og region.",
    image: "/Kultur/kultur.png",
    audioSomali: "/Kultur/dharka.mp3",
    audioDanish: "/Kultur/tøj.mp3",
    category: "Traditioner"
  },
  {
    id: "respect_elders",
    title: "Respekt for ældre",
    factSomali: "Ixtiraamka qofka weyn, Ixtiraamka dadka waayeelka ah waa qayb muhiim ah oo ka mid ah dhaqanka Soomaalida. Dadka da'da weyn waxay xambaarsan yihiin aqoon iyo waayo-aragnimo xeeldheer. Waxaa laga filaayaa dadka dhallinyarada ah inay maqlaan talada dadka waayeelka.",
    factDanish: "Respekt for ældre er en vigtig del af somalisk kultur. Ældre mennesker ses som kilder til viden og visdom. Unge mennesker forventes at lytte til de ældres råd.",
    image: "/Kultur/ædrer.png",
    audioSomali: "/Kultur/dadka.mp3",
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
