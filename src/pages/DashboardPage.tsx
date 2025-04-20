
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutDashboard, ChartBar, Check, Users, Badge, MessageSquare } from "lucide-react";
import { learningCategories } from "@/data/learningCategories";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockKids = [
  {
    name: "Amina",
    progress: 58,
    streak: 8,
    activities: [
      { time: "i dag kl. 17:23", text: "Færdiggjorde Alfabetet" },
      { time: "i går kl. 19:02", text: "Badges optjent: Streak 7 dage" },
    ],
    weeklyStats: [
      { day: "Man", score: 12 },
      { day: "Tir", score: 8 },
      { day: "Ons", score: 10 },
      { day: "Tor", score: 6 },
      { day: "Fre", score: 7 },
      { day: "Lør", score: 9 },
      { day: "Søn", score: 6 },
    ],
    badges: ["Streak 7 dage", "Flittig Lærer"],
  },
  {
    name: "Yusuf",
    progress: 32,
    streak: 3,
    activities: [
      { time: "i dag kl. 16:10", text: "Besvarede opgaver i Talforståelse" },
    ],
    weeklyStats: [
      { day: "Man", score: 3 },
      { day: "Tir", score: 5 },
      { day: "Ons", score: 0 },
      { day: "Tor", score: 6 },
      { day: "Fre", score: 3 },
      { day: "Lør", score: 9 },
      { day: "Søn", score: 6 },
    ],
    badges: [],
  },
];

// Simpel motiverende besked baseret på streaks
function getMotivationMsg(kid) {
  if (kid.streak >= 7) return `Fantastisk, ${kid.name}! Du har holdt streaken i ${kid.streak} dage! 🔥`;
  if (kid.progress >= 50) return `Super flot, ${kid.name}! Mere end halvdelen færdiggjort! 🎉`;
  if (kid.progress < 50 && kid.progress > 0) return `Godt begyndt, ${kid.name}! Du er allerede godt i gang 👍`;
  return null;
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-b from-blue-50 via-white to-white animate-fade-in">
      <h1 className="text-3xl font-bold text-purple-700 mb-4 flex items-center gap-2">
        <LayoutDashboard className="w-8 h-8 text-blue-400" /> Forældre Dashboard
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Børneliste med fremskridt, badges, aktiviteter, osv. */}
        <div className="flex-1 space-y-6">
          {mockKids.map((kid, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-lg font-semibold">{kid.name}</span>
                    <span className="text-blue-400 text-xs bg-blue-100 rounded-full px-2 py-1 font-mono">Streak: {kid.streak} 🔥</span>
                  </CardTitle>
                  <div>
                    <Link to="/admin-kids" className="text-xs bg-gray-50 px-3 py-1 rounded-md border text-blue-500 hover:bg-blue-100 transition hover:underline">Administrer</Link>
                  </div>
                </div>
                <CardDescription>
                  Fremgang i forløb
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Progress bar og procent */}
                <div className="mb-2">
                  <Progress value={kid.progress} />
                  <div className="text-right text-xs text-gray-600 mt-1">
                    {kid.progress}% gennemført
                  </div>
                </div>
                {/* Motiverende besked */}
                {getMotivationMsg(kid) && (
                  <div className="mb-2 flex items-center gap-2 text-green-700">
                    <MessageSquare className="w-4 h-4 text-green-400" />
                    <span>{getMotivationMsg(kid)}</span>
                  </div>
                )}
                {/* Seneste aktiviteter */}
                <div className="mb-3">
                  <div className="font-medium text-xs text-gray-500 mb-1 flex items-center gap-2">
                    <ChartBar className="w-4 h-4 text-purple-400" />
                    Seneste aktivitet
                  </div>
                  <ul className="ml-1 list-disc pl-4 text-xs text-gray-800">
                    {kid.activities.map((act, ai) => (
                      <li key={ai}>{act.text} <span className="text-gray-400">({act.time})</span></li>
                    ))}
                  </ul>
                </div>
                {/* Badges, hvis nogen */}
                {kid.badges && kid.badges.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-semibold text-yellow-600 flex items-center gap-1"><Badge className="w-4 h-4" /> Badges:</span>
                    {kid.badges.map((badge, bi) => (
                      <span key={bi} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono">{badge}</span>
                    ))}
                  </div>
                )}
                {/* Progress graf */}
                <div className="mb-2">
                  <div className="font-medium text-xs text-gray-500 mb-1 flex items-center gap-2">
                    <ChartBar className="w-4 h-4 text-purple-400" />
                    Aktivitet denne uge
                  </div>
                  <ResponsiveContainer width="100%" height={80}>
                    <BarChart data={kid.weeklyStats}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip />
                      <Bar dataKey="score" fill="#9b87f5" radius={[8,8,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Læringskategorier */}
                <div className="flex flex-wrap gap-2">
                  {learningCategories.map((cat, i) => (
                    <span key={cat.name} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> {cat.name}
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
          {/* Hurtig navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-md flex items-center gap-2 text-purple-800">
                <Users className="w-5 h-5 text-blue-400" />
                Forældre links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/admin-kids" className="block px-4 py-2 mb-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium transition">
                Administrer børn
              </Link>
              <Link to="/laer" className="block px-4 py-2 rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 text-sm font-medium transition">
                Se alle læringskategorier
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
