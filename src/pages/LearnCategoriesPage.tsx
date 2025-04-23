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
  progress: 38, // overall progress %
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center py-10 animate-fade-in relative">
      <ProfileMenu />
      <div className="absolute left-4 top-4 z-20">
        <Button onClick={handleBack} variant="outline" size="sm" className="flex items-center gap-1 border-blue-200 text-blue-600">
          <ArrowLeft className="w-4 h-4" />
          Tilbage
        </Button>
      </div>
      <ChildProgressBar name={mockChild.name} progress={mockChild.progress} streak={mockChild.streak} />
      <BadgeBar badges={mockChild.badges} />

      {showContinue && (
        <ContinueCard
          lastCategory={mockChild.lastCategory}
          percent={mockChild.lastPercent}
          onContinue={() => {
            const idx = learningCategories.findIndex(c => c.name === mockChild.lastCategory);
            if (idx !== -1) {
              document.getElementById(`learn-cat-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }}
        />
      )}

      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Læringskategorier</h1>
      <p className="text-lg text-gray-700 max-w-xl mb-8 text-center">
        Vælg en kategori og begynd at lære nye ting på dansk og somali!
      </p>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {learningCategories.map((cat, idx) => {
          const Icon = cat.icon;
          const isAlphabet = cat.name === "Alfabet";
          const isFinished = mockChild.finishedCategories.includes(cat.name);
          const isLastCat = cat.name === mockChild.lastCategory;

          const categoryCard = (
            <Card
              id={`learn-cat-${idx}`}
              key={cat.name}
              className={[
                "cursor-pointer transition-transform hover:scale-105 border-none shadow-lg hover:shadow-xl focus:scale-105 animate-fade-in relative duration-200",
                isLastCat ? "outline outline-blue-400 outline-2 z-10" : ""
              ].join(" ")}
              style={{
                background: cat.bgColor,
                borderRadius: "1.1rem"
              }}
              tabIndex={0}
              aria-label={`Lær om ${cat.name}`}
              onClick={isAlphabet ? () => setShowAlphabet(true) : undefined}
            >
              <CardContent className="flex flex-col items-center py-6">
                <div className="rounded-full bg-white shadow flex items-center justify-center mb-4 relative" style={{ width: 64, height: 64 }}>
                  <Icon className="w-9 h-9" />
                  {isFinished && (
                    <span className="absolute -top-3 -right-3 bg-blue-500 p-1 rounded-full animate-bounce shadow">
                      <BadgeCheck className="w-5 h-5 text-white" />
                    </span>
                  )}
                </div>
                <div className="font-bold text-lg text-gray-900 mb-2">{cat.name}</div>
                <div className="text-gray-700 text-center text-sm">{cat.description}</div>
                {isLastCat && (
                  <div className="mt-2 text-xs text-blue-700 font-semibold animate-pulse bg-blue-100 rounded py-1 px-2">Sidste kategori</div>
                )}
              </CardContent>
            </Card>
          );

          if (isAlphabet) {
            return (
              <HoverCard key={cat.name}>
                <HoverCardTrigger asChild>
                  {categoryCard}
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4 border-none shadow-lg" style={{ background: cat.bgColor }}>
                  <div className="text-gray-800">
                    <h3 className="font-bold text-lg mb-2">Lær det somaliske alfabet</h3>
                    <p className="mb-2">I denne kategori vil du:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Lære alle bogstaverne i det somaliske alfabet</li>
                      <li>Øve udtale af hver bogstav</li>
                      <li>Træne genkendelse af bogstaver</li>
                      <li>Lære at skrive bogstaverne</li>
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          }

          return categoryCard;
        })}
      </div>
      <AlphabetModal open={showAlphabet} onClose={() => setShowAlphabet(false)} />
    </div>
  );
}
