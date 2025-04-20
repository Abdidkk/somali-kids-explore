
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutDashboard, ChartBar, Check } from "lucide-react";
import { learningCategories } from "@/data/learningCategories";

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

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-b from-blue-50 via-white to-white animate-fade-in">
      <h1 className="text-3xl font-bold text-purple-700 mb-4 flex items-center gap-2">
        <LayoutDashboard className="w-8 h-8 text-blue-400" /> Forældre Dashboard
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
                      <Check className="w-3 h-3" /> {cat}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Læringskategorier (hentet fra forsiden) */}
        <div className="min-w-[260px] flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
                <ChartBar className="w-5 h-5 text-purple-400" />
                Kategorier for læring
              </CardTitle>
              <CardDescription>
                Opdag de samme sjove og lærerige kategorier som på forsiden
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-3">
                {learningCategories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <li key={cat.name} className="flex flex-col items-center gap-2">
                      <span
                        className="rounded-full flex items-center justify-center shadow mb-1"
                        style={{ background: "#fff", width: 48, height: 48 }}
                      >
                        <Icon className="w-6 h-6" />
                      </span>
                      <span className="text-xs text-gray-700 font-semibold" style={{ background: cat.bgColor, borderRadius: "0.5rem", padding: "2px 8px" }}>
                        {cat.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
