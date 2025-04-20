
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { layoutDashboard, chartBar, check, grid2x2, book, music, video } from "lucide-react";

const mockKids = [
  {
    name: "Amina",
    progress: 58,
    streak: 8,
    categories: ["Ordforråd", "Læseøvelser", "Sange"],
  },
  {
    name: "Yusuf",
    progress: 32,
    streak: 3,
    categories: ["Ordforråd", "Videoer"],
  },
];

const learningCategories = [
  { name: "Ordforråd", icon: grid2x2 },
  { name: "Historier", icon: book },
  { name: "Sange", icon: music },
  { name: "Videoer", icon: video },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-b from-blue-50 via-white to-white animate-fade-in">
      <h1 className="text-3xl font-bold text-purple-700 mb-4 flex items-center gap-2">
        <layoutDashboard className="w-8 h-8 text-blue-400" /> Forældre Dashboard
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Børneliste med fremskridt */}
        <div className="flex-1 space-y-6">
          {mockKids.map((kid, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">{kid.name}</span>
                  <span className="text-blue-400 text-xs bg-blue-100 rounded-full px-2 py-1 font-mono">Streak: {kid.streak} 🔥</span>
                </CardTitle>
                <CardDescription>
                  Fremgang i forløb
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <Progress value={kid.progress} />
                  <div className="text-right text-xs text-gray-600 mt-1">{kid.progress}% gennemført</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {kid.categories.map((cat, i) => (
                    <span key={i} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <check className="w-3 h-3" /> {cat}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Læringskategorier */}
        <div className="min-w-[230px] flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
                <chartBar className="w-5 h-5 text-purple-400" />
                Kategorier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-3">
                {learningCategories.map((cat, idx) => (
                  <li key={cat.name} className="flex flex-col items-center gap-2">
                    <cat.icon className="w-7 h-7 text-purple-600" />
                    <span className="text-xs text-gray-700">{cat.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
