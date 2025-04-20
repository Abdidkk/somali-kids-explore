import { learningCategories } from "@/data/learningCategories";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { useState } from "react";
import AlphabetModal from "@/components/AlphabetModal";
import ChildProgressBar from "@/components/ChildProgressBar";
import BadgeBar from "@/components/BadgeBar";
import ContinueCard from "@/components/ContinueCard";
import { Star, BadgeCheck } from "lucide-react";
import ProfileMenu from "@/components/ProfileMenu";

const mockChild = {
  name: "Sami",
  progress: 38, // overall progress %
  streak: 5,
  badges: ["Streak 3 dage", "Flittig Lærer"],
  lastCategory: "Tal",
  lastPercent: 30,
  finishedCategories: ["Alfabet"]
}

export default function LearnCategoriesPage() {
  const [showAlphabet, setShowAlphabet] = useState(false);

  const showContinue = !!mockChild.lastCategory;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center py-10 animate-fade-in relative">
      <ProfileMenu />
      <div className="absolute left-8 top-8 z-10 flex items-center space-x-3">
        <Avatar className="w-14 h-14 ring-2 ring-vivid-purple ring-offset-2 ring-offset-white shadow-lg">
          <AvatarImage
            src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=96&h=96&facepad=3"
            alt="Barnets billede"
          />
          <AvatarFallback>Barn</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-lg text-purple-700">{mockChild.name}</span>
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

      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">Læringskategorier</h1>
      <p className="text-lg text-gray-700 max-w-xl mb-8 text-center">
        Vælg en kategori og begynd at lære nye ting på dansk og somali!
      </p>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {learningCategories.map((cat, idx) => {
          const Icon = cat.icon;
          const isAlphabet = cat.name === "Alfabet";
          const isFinished = mockChild.finishedCategories.includes(cat.name);
          const isLastCat = cat.name === mockChild.lastCategory;

          return (
            <Card
              id={`learn-cat-${idx}`}
              key={cat.name}
              className={[
                "cursor-pointer transition-transform hover:scale-105 border-none shadow-lg hover:shadow-xl focus:scale-105 animate-fade-in relative duration-200",
                isLastCat ? "outline outline-vivid-purple outline-2 z-10" : ""
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
                    <span className="absolute -top-3 -right-3 bg-vivid-purple p-1 rounded-full animate-bounce shadow">
                      <BadgeCheck className="w-5 h-5 text-white" />
                    </span>
                  )}
                </div>
                <div className="font-bold text-lg text-gray-900 mb-2">{cat.name}</div>
                <div className="text-gray-700 text-center text-sm">{cat.description}</div>
                {isLastCat && (
                  <div className="mt-2 text-xs text-purple-700 font-semibold animate-pulse bg-purple-100 rounded py-1 px-2">Sidste kategori</div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <AlphabetModal open={showAlphabet} onClose={() => setShowAlphabet(false)} />
    </div>
  );
}
