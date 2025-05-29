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
    if (isAlphabet) return "/lovable-uploads/0d3cffdb-ae5f-47c7-921d-87af02dceffe.png";
    if (isColors) return "/lovable-uploads/2b3d5738-fe36-44c4-8d12-40c95bb1c0f8.png";
    if (isFood) return "/lovable-uploads/d53ddb64-53af-4bd5-a6c6-c7cd8495bda0.png";
    if (isAnimals) return "/lovable-uploads/5b82e785-bd89-4559-81c7-048e78c263ff.png";
    if (isKropsdele) return "/lovable-uploads/ae3f224d-137a-48d2-bfd6-2ec7db22aec3.png";
    if (isGeografi) return "/lovable-uploads/96a8e74c-d203-46ea-a5b3-62d43488681b.png";
    if (isKalender) return "/lovable-uploads/0435c435-2eb6-4de9-a68e-d3a18fd524e5.png";
    if (isFamilie) return "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png";
    if (isOrd) return "/lovable-uploads/a57afdc1-14bd-4e86-87d9-907a566e2c64.png";
    if (isDagligeAktiviteter) return "/lovable-uploads/cffd237e-6a54-4fc2-8948-ab03ee00399a.png";
    if (isSaetninger) return "/lovable-uploads/a1b97193-b26e-42a5-90f1-0ee432386d70.png";
    if (isKultureltIndhold) return "/lovable-uploads/5226a33a-bf7f-4cc7-ace6-28b7484c60ce.png";
    if (isLaeseBøger) return "/lovable-uploads/5ea2439d-4fd6-419d-a5b6-9afb3d0362dd.png";
    if (isQuiz) return "/lovable-uploads/4bdde527-cfcd-4a08-bf5c-65c9f1b9127f.png";
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
              className={`w-full h-48 object-contain ${isKropsdele ? 'p-2 bg-white/90 rounded-t-lg shadow-inner' : 'object-fill'}`}
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
            <li>Lære alle bogstaverne i det somaliske alfabet</li>
            <li>Øve udtale af hver bogstav</li>
            <li>Træne genkendelse af bogstaver</li>
            <li>Lære at skrive bogstaverne</li>
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
            <li>Lære om årstiderne og deres navne</li>
            <li>Forstå måneder og ugedage på somalisk</li>
            <li>Lære om traditioner knyttet til forskellige årstider</li>
            <li>Øve udtale af tidsrelaterede ord og begreber</li>
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
