
import { learningCategories } from "@/data/learningCategories";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import AlphabetModal from "@/components/AlphabetModal";
import ChildProgressBar from "@/components/ChildProgressBar";
import BadgeBar from "@/components/BadgeBar";
import ContinueCard from "@/components/ContinueCard";
import { Star, BadgeCheck, ArrowLeft } from "lucide-react";
import ProfileMenu from "@/components/ProfileMenu";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const mockChild = {
  name: "Sami",
  progress: 38,
  // overall progress %
  streak: 5,
  badges: ["Streak 3 dage", "Flittig Lærer"],
  lastCategory: "Tal",
  lastPercent: 30,
  finishedCategories: ["Alfabet"]
};

export default function LearnCategoriesPage() {
  const [showAlphabet, setShowAlphabet] = useState(false);
  const showContinue = !!mockChild.lastCategory;

  const handleBack = () => {
    window.history.back();
  };

  return <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center py-10 animate-fade-in relative">
    <ProfileMenu />
    <div className="absolute left-4 top-4 z-20">
      <Button onClick={handleBack} variant="outline" size="sm" className="flex items-center gap-1 border-blue-200 text-blue-600">
        <ArrowLeft className="w-4 h-4" />
        Tilbage
      </Button>
    </div>
    <ChildProgressBar name={mockChild.name} progress={mockChild.progress} streak={mockChild.streak} />
    <BadgeBar badges={mockChild.badges} />

    {showContinue && <ContinueCard lastCategory={mockChild.lastCategory} percent={mockChild.lastPercent} onContinue={() => {
      const idx = learningCategories.findIndex(c => c.name === mockChild.lastCategory);
      if (idx !== -1) {
        document.getElementById(`learn-cat-${idx}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }} />}

    <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Læringskategorier</h1>
    <p className="text-lg text-gray-700 max-w-xl mb-8 text-center">
      Vælg en kategori og begynd at lære nye ting på dansk og somali!
    </p>
    <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {learningCategories.map((cat, idx) => {
        const Icon = cat.icon;
        const isAlphabet = cat.name === "Alfabet";
        const isColors = cat.name === "Farver";
        const isNumbers = cat.name === "Tal";
        const isFood = cat.name === "Mad";
        const isAnimals = cat.name === "Dyr";
        const isKropsdele = cat.name === "Kropsdel";
        const isGeografi = cat.name === "Geografi";
        const isKalender = cat.name === "Kalender";
        const isFamilie = cat.name === "Familie og venner";
        const isOrd = cat.name === "Ord";
        const isDagligeAktiviteter = cat.name === "Daglige aktiviteter";
        const isSaetninger = cat.name === "Sætninger";
        const isKultureltIndhold = cat.name === "Kulturelt indhold";
        const isLaeseBøger = cat.name === "Læse bøger";
        const isFinished = mockChild.finishedCategories.includes(cat.name);
        const isLastCat = cat.name === mockChild.lastCategory;
        const categoryCard = <Card id={`learn-cat-${idx}`} key={cat.name} className={["cursor-pointer transition-transform hover:scale-105 border-none shadow-lg hover:shadow-xl focus:scale-105 animate-fade-in relative", isLastCat ? "outline outline-blue-400 outline-2 z-10" : ""].join(" ")} style={{
          background: cat.bgColor,
          borderRadius: "1.1rem"
        }} tabIndex={0} aria-label={`Lær om ${cat.name}`} onClick={isAlphabet ? () => setShowAlphabet(true) : undefined}>
              <CardContent className="p-0 relative">
                {isAlphabet || isColors || isNumbers || isFood || isAnimals || isKropsdele || isGeografi || isKalender || isFamilie || isOrd || isDagligeAktiviteter || isSaetninger || isKultureltIndhold || isLaeseBøger ? <div className="relative h-full">
                    <img src={isAlphabet ? "/lovable-uploads/0d3cffdb-ae5f-47c7-921d-87af02dceffe.png" : 
                            isColors ? "/lovable-uploads/2b3d5738-fe36-44c4-8d12-40c95bb1c0f8.png" : 
                            isFood ? "/lovable-uploads/d53ddb64-53af-4bd5-a6c6-c7cd8495bda0.png" :
                            isAnimals ? "/lovable-uploads/5b82e785-bd89-4559-81c7-048e78c263ff.png" :
                            isKropsdele ? "/lovable-uploads/5f3c2e5c-8a56-4baf-8c3f-4d8ecbe1f924.png" :
                            isGeografi ? "/lovable-uploads/96a8e74c-d203-46ea-a5b3-62d43488681b.png" :
                            isKalender ? "/lovable-uploads/0435c435-2eb6-4de9-a68e-d3a18fd524e5.png" :
                            isFamilie ? "/lovable-uploads/bf322fd4-1e3c-47c6-ad3c-26b80dabb788.png" :
                            isOrd ? "/lovable-uploads/a57afdc1-14bd-4e86-87d9-907a566e2c64.png" :
                            isDagligeAktiviteter ? "/lovable-uploads/cffd237e-6a54-4fc2-8948-ab03ee00399a.png" :
                            isSaetninger ? "/lovable-uploads/a1b97193-b26e-42a5-90f1-0ee432386d70.png" :
                            isKultureltIndhold ? "/lovable-uploads/5226a33a-bf7f-4cc7-ace6-28b7484c60ce.png" :
                            isLaeseBøger ? "/lovable-uploads/5ea2439d-4fd6-419d-a5b6-9afb3d0362dd.png" :
                            "/lovable-uploads/04d6bd8a-13b1-43ae-9c27-983dac50c5be.png"} 
                         alt={`${cat.name} illustration`} 
                         className={`w-full h-48 object-contain ${isKropsdele ? 'p-2 bg-white/90 rounded-t-lg shadow-inner' : 'object-fill'}`} />
                    {isFinished && <span className="absolute top-2 right-2 bg-blue-500 p-1 rounded-full animate-bounce shadow z-10">
                        <BadgeCheck className="w-5 h-5 text-white" />
                      </span>}
                    <div className="p-6">
                      <div className="font-bold text-lg text-gray-900 mb-2">{cat.name}</div>
                      <div className="text-gray-700 text-center text-sm">{cat.description}</div>
                      {isLastCat && <div className="mt-2 text-xs text-blue-700 font-semibold animate-pulse bg-blue-100 rounded py-1 px-2">Sidste kategori</div>}
                    </div>
                  </div> : <div className="flex flex-col items-center py-6">
                    <div className="rounded-full bg-white shadow flex items-center justify-center mb-4 relative" style={{
                width: 64,
                height: 64
              }}>
                      <Icon className="w-9 h-9" />
                      {isFinished && <span className="absolute -top-3 -right-3 bg-blue-500 p-1 rounded-full animate-bounce shadow">
                          <BadgeCheck className="w-5 h-5 text-white" />
                        </span>}
                    </div>
                    <div className="font-bold text-lg text-gray-900 mb-2">{cat.name}</div>
                    <div className="text-gray-700 text-center text-sm">{cat.description}</div>
                    {isLastCat && <div className="mt-2 text-xs text-blue-700 font-semibold animate-pulse bg-blue-100 rounded py-1 px-2">Sidste kategori</div>}
                  </div>}
              </CardContent>
            </Card>;

        if (isAlphabet || isColors || isNumbers || isFood || isAnimals || isKropsdele || isGeografi || isKalender || isFamilie || isOrd || isDagligeAktiviteter || isSaetninger || isKultureltIndhold || isLaeseBøger) {
          return <HoverCard key={cat.name}>
                <HoverCardTrigger asChild>
                  {categoryCard}
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4 border-none shadow-lg" style={{
              background: cat.bgColor
            }}>
                  <div className="text-gray-800">
                    <h3 className="font-bold text-lg mb-2">Lær om {cat.name}</h3>
                    <p className="mb-2">I denne kategori vil du:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {isAlphabet && <>
                          <li>Lære alle bogstaverne i det somaliske alfabet</li>
                          <li>Øve udtale af hver bogstav</li>
                          <li>Træne genkendelse af bogstaver</li>
                          <li>Lære at skrive bogstaverne</li>
                        </>}
                      {isColors && <>
                          <li>Lære de grundlæggende farver</li>
                          <li>Øve farvenavne på somalisk</li>
                          <li>Lave sjove farveøvelser</li>
                          <li>Lære at genkende farver i hverdagen</li>
                        </>}
                      {isNumbers && <>
                          <li>Lære at tælle på somalisk</li>
                          <li>Øve tal og mængder</li>
                          <li>Træne grundlæggende matematik</li>
                          <li>Lære tallenes navne og symboler</li>
                        </>}
                      {isFood && <>
                          <li>Lære de grundlæggende madtyper</li>
                          <li>Øve udtale af hver madtype</li>
                          <li>Træne genkendelse af madtyper</li>
                          <li>Lære at genkende madtyper i hverdagen</li>
                        </>}
                      {isAnimals && <>
                          <li>Lære navnene på forskellige dyr</li>
                          <li>Øve udtale af dyrenavne</li>
                          <li>Lære om dyrelyde</li>
                          <li>Forstå forskellige dyrearter</li>
                        </>}
                      {isKropsdele && <>
                          <li>Lære navnene på forskellige kropsdel</li>
                          <li>Øve udtale af kropsdelnavne</li>
                          <li>Lære om kropsdellyde</li>
                          <li>Forstå forskellige kropsdelarter</li>
                        </>}
                      {isGeografi && <>
                          <li>Lære om lande og kontinenter</li>
                          <li>Forstå geografi på somalisk</li>
                          <li>Udforske kort og globus</li>
                          <li>Lære om forskellige kulturer og steder</li>
                        </>}
                      {isKalender && <>
                          <li>Lære om årstiderne og deres navne</li>
                          <li>Forstå måneder og ugedage på somalisk</li>
                          <li>Lære om traditioner knyttet til forskellige årstider</li>
                          <li>Øve udtale af tidsrelaterede ord og begreber</li>
                        </>}
                      {isFamilie && <>
                          <li>Lære navn på familiemedlemmer</li>
                          <li>Forstå familierelationer på somalisk</li>
                          <li>Øve ordforråd relateret til familie og venner</li>
                          <li>Lære om social interaktion og samtalefærdigheder</li>
                        </>}
                      {isOrd && <>
                          <li>Lære navne på hverdagsgenstande</li>
                          <li>Øve ordforråd om møbler og hjemmet</li>
                          <li>Opbygge sætninger med de nye ord</li>
                          <li>Forbedre forståelse af somaliske betegnelser for ting i dit miljø</li>
                        </>}
                      {isDagligeAktiviteter && <>
                          <li>Lære ord for daglige rutiner som at børste tænder og spise</li>
                          <li>Øve udtryk for hverdagsaktiviteter på somalisk</li>
                          <li>Forstå tidsudtryk og rækkefølge af aktiviteter</li>
                          <li>Udvikle ordforråd relateret til almindelige gøremål</li>
                        </>}
                      {isSaetninger && <>
                          <li>Lære grundlæggende hilsner på somalisk</li>
                          <li>Opbygge enkle dialoger og samtaler</li>
                          <li>Træne daglig kommunikation og udtryk</li>
                          <li>Forbedre din evne til at føre samtaler på somalisk</li>
                        </>}
                      {isKultureltIndhold && <>
                          <li>Udforske somaliske traditioner og skikke</li>
                          <li>Lære om kulturelle begivenheder og festivaler</li>
                          <li>Forstå musik, kunst og fortællinger fra Somalia</li>
                          <li>Opleve traditionelle sange og dansetrin</li>
                        </>}
                      {isLaeseBøger && <>
                          <li>Læse alderssvarende historier på somalisk</li>
                          <li>Forbedre læseforståelse og ordforråd</li>
                          <li>Blive introduceret til somalisk litteratur</li>
                          <li>Udvikle glæde ved læsning på to sprog</li>
                        </>}
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>;
        }
        return categoryCard;
      })}
    </div>
    <AlphabetModal open={showAlphabet} onClose={() => setShowAlphabet(false)} />
  </div>;
}
