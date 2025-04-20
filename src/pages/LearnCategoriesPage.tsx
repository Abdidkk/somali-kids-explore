import { learningCategories } from "@/data/learningCategories";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function LearnCategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col items-center py-10 animate-fade-in relative">
      {/* Avatar og navn øverst til højre */}
      <div className="absolute right-8 top-8 z-10 flex items-center space-x-3">
        <Avatar className="w-14 h-14 ring-2 ring-vivid-purple ring-offset-2 ring-offset-white shadow-lg">
          <AvatarImage
            src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=96&h=96&facepad=3"
            alt="Barnets billede"
          />
          <AvatarFallback>Barn</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-lg text-purple-700">Sami</span>
      </div>
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">Læringskategorier</h1>
      <p className="text-lg text-gray-700 max-w-xl mb-8 text-center">
        Vælg en kategori og begynd at lære nye ting på dansk og somali!
      </p>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {learningCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Card
              key={cat.name}
              className="cursor-pointer transition-transform hover:scale-105 border-none shadow hover:shadow-lg"
              style={{ background: cat.bgColor, borderRadius: "1.1rem" }}
              tabIndex={0}
              aria-label={`Lær om ${cat.name}`}
            >
              <CardContent className="flex flex-col items-center py-6">
                <div className="rounded-full bg-white shadow flex items-center justify-center mb-4" style={{ width: 64, height: 64 }}>
                  <Icon className="w-9 h-9" />
                </div>
                <div className="font-bold text-lg text-gray-900 mb-2">{cat.name}</div>
                <div className="text-gray-700 text-center text-sm">{cat.description}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
