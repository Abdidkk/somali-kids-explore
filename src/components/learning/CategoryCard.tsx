import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { LearningCategory } from "@/data/learningCategories";

interface CategoryCardProps {
  category: LearningCategory;
  isFinished: boolean;
  isLastCat: boolean;
  onSelect: () => void;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isFinished, isLastCat, onSelect, index }) => {
  const Icon = category.icon;
  const isAlphabet = category.name === "Alfabet";
  const isColors = category.name === "Farver";
  const isNumbers = category.name === "Tal";
  const isFood = category.name === "Mad";
  const isAnimals = category.name === "Dyr";
  const isKropsdele = category.name === "Kropsdel";
  const isGeografi = category.name === "Geografi";
  const isKalender = category.name === "Kalender";
  const isFamilie = category.name === "Familie og venner";
  const isOrd = category.name === "Ord";
  const isDagligeAktiviteter = category.name === "Daglige aktiviteter";
  const isSaetninger = category.name === "Sætninger";
  const isKultureltIndhold = category.name === "Kulturelt indhold";
  const isLaeseBøger = category.name === "Læse bøger";
  const isQuiz = category.name === "Quiz";
  
  const hasCustomImage = isAlphabet || isColors || isNumbers || isFood || isAnimals || 
                         isKropsdele || isGeografi || isKalender || isFamilie || 
                         isOrd || isDagligeAktiviteter || isSaetninger || 
                         isKultureltIndhold || isLaeseBøger || isQuiz;
  
  const getCategoryImage = () => {
    if (isAlphabet) return "/kategorier/alfabet.png";
    if (isColors) return "/kategorier/farver.png";
    if (isNumbers) return "/kategorier/tal.png";
    if (isFood) return "/kategorier/mad.png";
    if (isAnimals) return "/kategorier/dyr.png";
    if (isKropsdele) return "/kategorier/krop.png";
    if (isGeografi) return "/kategorier/verden.png";
    if (isKalender) return "/kategorier/kalender.png";
    if (isFamilie) return "/kategorier/familie.png";
    if (isOrd) return "/kategorier/hjem.png";
    if (isDagligeAktiviteter) return "/kategorier/hverdag.png";
    if (isSaetninger) return "/kategorier/snak.png";
    if (isKultureltIndhold) return "/kategorier/kultur.png";
    if (isLaeseBøger) return "/kategorier/bog.png";
    if (isQuiz) return "/kategorier/quiz.png";
    return "/lovable-uploads/04d6bd8a-13b1-43ae-9c27-983dac50c5be.png";
  };
  
  const categoryCard = (
    <Card 
      id={`learn-cat-${index}`} 
      className={[
        "cursor-pointer transition-transform hover:scale-105 border-none shadow-lg hover:shadow-xl focus:scale-105 animate-fade-in relative", 
        isLastCat ? "outline outline-blue-400 outline-2 z-10" : ""
      ].join(" ")} 
      style={{
        background: category.bgColor,
        borderRadius: "1.1rem"
      }} 
      tabIndex={0} 
      aria-label={`Lær om ${category.name}`} 
      onClick={onSelect}
    >
      <CardContent className="p-0 relative">
        {hasCustomImage ? (
          <div className="relative h-full">
            <img 
              src={getCategoryImage()} 
              alt={`${category.name} illustration`} 
              className="w-full h-48 object-fill"
            />
            {isFinished && (
              <span className="absolute top-2 right-2 bg-blue-500 p-1 rounded-full animate-bounce shadow z-10">
                <BadgeCheck className="w-5 h-5 text-white" />
              </span>
            )}
            <div className="p-6">
              <div className="font-bold text-lg text-gray-900 mb-2">{category.name}</div>
              <div className="text-gray-700 text-center text-sm">{category.description}</div>
              {isLastCat && (
                <div className="mt-2 text-xs text-blue-700 font-semibold animate-pulse bg-blue-100 rounded py-1 px-2">
                  Sidste kategori
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-6">
            <div 
              className="rounded-full bg-white shadow flex items-center justify-center mb-4 relative" 
              style={{
                width: 64,
                height: 64
              }}
            >
              <Icon className="w-9 h-9" />
              {isFinished && (
                <span className="absolute -top-3 -right-3 bg-blue-500 p-1 rounded-full animate-bounce shadow">
                  <BadgeCheck className="w-5 h-5 text-white" />
                </span>
              )}
            </div>
            <div className="font-bold text-lg text-gray-900 mb-2">{category.name}</div>
            <div className="text-gray-700 text-center text-sm">{category.description}</div>
            {isLastCat && (
              <div className="mt-2 text-xs text-blue-700 font-semibold animate-pulse bg-blue-100 rounded py-1 px-2">
                Sidste kategori
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return hasCustomImage ? (
    <HoverCard>
      <HoverCardTrigger asChild>
        {categoryCard}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4 border-none shadow-lg" style={{ background: category.bgColor }}>
        <CategoryHoverContent category={category} />
      </HoverCardContent>
    </HoverCard>
  ) : categoryCard;
};

const CategoryHoverContent: React.FC<{ category: LearningCategory }> = ({ category }) => {
  return (
    <div className="text-gray-800">
      <h3 className="font-bold text-lg mb-2">Lær om {category.name}</h3>
      <p className="mb-2">I denne kategori vil du:</p>
      <ul className="list-disc pl-4 space-y-1">
        {category.name === "Alfabet" && (
          <>
            <li>Lære det somaliske alfabet gennem lyd og tekst</li>
            <li>Høre udtale af hvert bogstav på somalisk</li>
            <li>Se store og tydelige bogstaver i forskellige farver</li>
            <li>Øve med alfabetet, korte vokaler og lange vokaler</li>
            <li>Spore og skrive bogstaver for at træne skrivetræning</li>
            <li>Teste din viden ved at genkende bogstaver</li>
          </>
        )}
        {category.name === "Farver" && (
          <>
            <li>Lære de grundlæggende farver</li>
            <li>Øve farvenavne på somalisk</li>
            <li>Lave sjove farveøvelser</li>
            <li>Lære at genkende farver i hverdagen</li>
          </>
        )}
        {category.name === "Tal" && (
          <>
            <li>Lære at tælle på somalisk</li>
            <li>Øve tal og mængder</li>
            <li>Træne grundlæggende matematik</li>
            <li>Lære tallenes navne og symboler</li>
          </>
        )}
        {category.name === "Mad" && (
          <>
            <li>Lære de grundlæggende madtyper</li>
            <li>Øve udtale af hver madtype</li>
            <li>Træne genkendelse af madtyper</li>
            <li>Lære at genkende madtyper i hverdagen</li>
          </>
        )}
        {category.name === "Dyr" && (
          <>
            <li>Lære navnene på forskellige dyr</li>
            <li>Øve udtale af dyrenavne</li>
            <li>Lære om dyrelyde</li>
            <li>Forstå forskellige dyrearter</li>
          </>
        )}
        {category.name === "Kropsdel" && (
          <>
            <li>Lære navnene på forskellige kropsdel</li>
            <li>Øve udtale af kropsdelnavne</li>
            <li>Lære om kropsdellyde</li>
            <li>Forstå forskellige kropsdelarter</li>
          </>
        )}
        {category.name === "Geografi" && (
          <>
            <li>Lære om lande og kontinenter</li>
            <li>Forstå geografi på somalisk</li>
            <li>Udforske kort og globus</li>
            <li>Lære om forskellige kulturer og steder</li>
          </>
        )}
        {category.name === "Kalender" && (
          <>
            <li>Lære navnene på ugedage, måneder og årstider på somalisk</li>
            <li>Øve udtale af tidsrelaterede ord og begreber</li>
            <li>Træne at sætte dage og måneder i korrekt rækkefølge</li>
            <li>Forstå kalendersystemet gennem interaktive øvelser</li>
          </>
        )}
        {category.name === "Familie og venner" && (
          <>
            <li>Lære navn på familiemedlemmer</li>
            <li>Forstå familierelationer på somalisk</li>
            <li>Øve ordforråd relateret til familie og venner</li>
            <li>Lære om social interaktion og samtalefærdigheder</li>
          </>
        )}
        {category.name === "Ord" && (
          <>
            <li>Lære navne på hverdagsgenstande</li>
            <li>Øve ordforråd om møbler og hjemmet</li>
            <li>Opbygge sætninger med de nye ord</li>
            <li>Forbedre forståelse af somaliske betegnelser for ting i dit miljø</li>
          </>
        )}
        {category.name === "Daglige aktiviteter" && (
          <>
            <li>Lære ord for daglige rutiner som at børste tænder og spise</li>
            <li>Øve udtryk for hverdagsaktiviteter på somalisk</li>
            <li>Forstå tidsudtryk og rækkefølge af aktiviteter</li>
            <li>Udvikle ordforråd relateret til almindelige gøremål</li>
          </>
        )}
        {category.name === "Sætninger" && (
          <>
            <li>Lære grundlæggende hilsner på somalisk</li>
            <li>Opbygge enkle dialoger og samtaler</li>
            <li>Træne daglig kommunikation og udtryk</li>
            <li>Forbedre din evne til at føre samtaler på somalisk</li>
          </>
        )}
        {category.name === "Kulturelt indhold" && (
          <>
            <li>Udforske somaliske traditioner og skikke</li>
            <li>Lære om kulturelle begivenheder og festivaler</li>
            <li>Forstå musik, kunst og fortællinger fra Somalia</li>
            <li>Opleve traditionelle sange og dansetrin</li>
          </>
        )}
        {category.name === "Læse bøger" && (
          <>
            <li>Læse alderssvarende historier på somalisk</li>
            <li>Forbedre læseforståelse og ordforråd</li>
            <li>Blive introduceret til somalisk litteratur</li>
            <li>Udvikle glæde ved læsning på to sprog</li>
          </>
        )}
        {category.name === "Quiz" && (
          <>
            <li>Teste din viden om det lærte materiale</li>
            <li>Besvare spørgsmål om alle kategorier</li>
            <li>Styrke hukommelse og forståelse gennem sjove opgaver</li>
            <li>Opnå point og anerkendelse for dine præstationer</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default CategoryCard;
