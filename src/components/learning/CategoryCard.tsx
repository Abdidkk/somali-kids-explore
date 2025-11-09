import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Lock } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { LearningCategory } from "@/data/learningCategories";
import { useToast } from "@/hooks/use-toast";

interface CategoryCardProps {
  category: LearningCategory;
  isFinished: boolean;
  isLastCat: boolean;
  isEnabled: boolean;
  requiresSubscription?: boolean;
  onSelect: () => void;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isFinished, isLastCat, isEnabled, requiresSubscription = true, onSelect, index }) => {
  const { toast } = useToast();
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

  const handleClick = () => {
    if (requiresSubscription) {
      toast({
        title: "Abonnement påkrævet",
        description: "Du skal have et aktivt abonnement for at få adgang til læringsmodulerne.",
        variant: "destructive",
      });
      return;
    }
    if (isEnabled) {
      onSelect();
    }
  };
  
  const categoryCard = (
    <Card 
      id={`learn-cat-${index}`} 
      className={[
        "transition-transform border-none shadow-lg animate-fade-in relative",
        isEnabled ? "cursor-pointer hover:scale-105 hover:shadow-xl focus:scale-105" : "cursor-not-allowed opacity-60 grayscale",
        isLastCat ? "outline outline-blue-400 outline-2 z-10" : ""
      ].join(" ")} 
      style={{
        background: category.bgColor,
        borderRadius: "1.1rem"
      }} 
      tabIndex={isEnabled ? 0 : -1} 
      aria-label={isEnabled ? `Lær om ${category.name}` : `${category.name} er låst`} 
      onClick={handleClick}
    >
      <CardContent className="p-0 relative">
        {hasCustomImage ? (
          <div className="relative h-full">
            <img 
              src={getCategoryImage()} 
              alt={`${category.name} illustration`} 
              className={`w-full h-48 object-fill ${!isEnabled ? 'grayscale' : ''}`}
            />
            {!isEnabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-t-lg">
                <div className="bg-white bg-opacity-90 rounded-full p-2">
                  <Lock className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            )}
            {isFinished && isEnabled && (
              <span className="absolute top-2 right-2 bg-blue-500 p-1 rounded-full animate-bounce shadow z-10">
                <BadgeCheck className="w-5 h-5 text-white" />
              </span>
            )}
            <div className="p-6">
              <div className={`font-bold text-lg mb-2 ${isEnabled ? 'text-gray-900' : 'text-gray-500'}`}>
                {category.name}
                {!isEnabled && <Lock className="inline w-4 h-4 ml-1" />}
              </div>
              <div className={`text-center text-sm ${isEnabled ? 'text-gray-700' : 'text-gray-400'}`}>
                {requiresSubscription ? 'Kræver abonnement' : 
                 !isEnabled ? 'Kategori låst af forældre' : 
                 category.description}
              </div>
              {isLastCat && isEnabled && (
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
              <Icon className={`w-9 h-9 ${!isEnabled ? 'text-gray-400' : ''}`} />
              {!isEnabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
              )}
              {isFinished && isEnabled && (
                <span className="absolute -top-3 -right-3 bg-blue-500 p-1 rounded-full animate-bounce shadow">
                  <BadgeCheck className="w-5 h-5 text-white" />
                </span>
              )}
            </div>
            <div className={`font-bold text-lg mb-2 ${isEnabled ? 'text-gray-900' : 'text-gray-500'}`}>
              {category.name}
              {!isEnabled && <Lock className="inline w-4 h-4 ml-1" />}
            </div>
            <div className={`text-center text-sm ${isEnabled ? 'text-gray-700' : 'text-gray-400'}`}>
              {requiresSubscription ? 'Kræver abonnement' : 
               !isEnabled ? 'Kategori låst af forældre' : 
               category.description}
            </div>
            {isLastCat && isEnabled && (
              <div className="mt-2 text-xs text-blue-700 font-semibold animate-pulse bg-blue-100 rounded py-1 px-2">
                Sidste kategori
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return hasCustomImage && isEnabled ? (
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
            <li>Teste din viden ved at genkende farver</li>
          </>
        )}
        {category.name === "Tal" && (
          <>
            <li>Lære at tælle på somalisk</li>
            <li>Øve tal </li>
            <li>Hør og vælge den rigtigt tal</li>
            <li>Teste din viden ved at genkende tal</li>
          </>
        )}
        {category.name === "Mad" && (
          <>
            <li>Lære de grundlæggende madtyper</li>
            <li>Øve udtale af hver madtype</li>
            <li>Træne genkendelse af madtyper</li>
            <li>Teste din viden ved at genkende mad</li>
          </>
        )}
        {category.name === "Dyr" && (
          <>
            <li>Lære navnene på forskellige dyr</li>
            <li>Øve udtale af dyrenavne</li>
            <li>Teste din viden ved at genkende dyr</li>
          </>
        )}
        {category.name === "Kropsdel" && (
          <>
            <li>Lære navnene på forskellige kropsdel</li>
            <li>Øve udtale af kropsdelnavne</li>
            <li>Teste din viden ved at genkende kropdsdel</li>
          </>
        )}
        {category.name === "Geografi" && (
          <>
            <li>Lære om lande </li>
            <li>Lære om kontinenter</li>
            <li>Lære om lande natur</li>
            <li>Teste din viden ved at genkende geografi</li>
          </>
        )}
        {category.name === "Kalender" && (
          <>
            <li>Lære navnene på ugedage på somalisk</li>
            <li>Lære navnene på måneder på somalisk</li>
            <li>Lære navnene på årstider på somalisk</li>
            <li>Træne at sætte dage og måneder i korrekt rækkefølge</li>
            
          </>
        )}
        {category.name === "Familie og venner" && (
          <>
            <li>Lære navn på familiemedlemmer</li>
            <li>Forstå familierelationer på somalisk</li>
            <li>Øve ordforråd relateret til familie og venner</li>
          </>
        )}
        {category.name === "Ord" && (
          <>
            <li>Lære navne på hverdagsgenstande</li>
            <li>Øve ordforråd om møbler og hjemmet</li>
            <li>Forbedre forståelse af somaliske betegnelser for ting i dit miljø</li>
          </>
        )}
        {category.name === "Daglige aktiviteter" && (
          <>
            <li>Lære ord for daglige rutiner som at børste tænder og spise</li>
            <li>Øve udtryk for hverdagsaktiviteter på somalisk</li>
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
