
import { Card, CardContent } from "@/components/ui/card";
import {
  Mic, Palette, Calculator, Carrot, PawPrint, Hand, Earth, Calendar,
  Users, House, Activity, MessageSquare, Music, BookOpen, HelpCircle
} from "lucide-react";

const categoryColors = [
  "#E9E3FC", // Alfabet - blid lilla
  "#FFEFF1", // Farver - blid rosa
  "#DBF3FA", // Tal - blid blå
  "#FBF1DE", // Mad - neddæmpet orange/gul
  "#FFFBE0", // Dyr - lys gul
  "#E2F7FF", // Kropsdel - blågrøn
  "#E5FAF1", // Geografi - pastel grøn/turkis
  "#E7F0FB", // Kalender - blålig pastel
  "#FDE4F2", // Familie og venner - svag pink/lilla
  "#E5E8ED", // Ord (hus) - grålig blå pastel
  "#FFF2EB", // Daglige aktiviteter - blid orange
  "#E6F5F8", // Sætninger - lyseblå/cyan
  "#F9EAF6", // Kulturelt indhold - pink/lilla
  "#FDF5E3", // Læse bøger - creme/gul
  "#F7EFFF", // Quiz - lys lilla
];

const featureData = [
  {
    icon: <Mic className="h-10 w-10 text-purple-500" />,
    title: "Alfabet",
    description: "Somaliske bogstaver og udtale.",
  },
  {
    icon: <Palette className="h-10 w-10 text-pink-400" />,
    title: "Farver",
    description: "Navne og genkendelse.",
  },
  {
    icon: <Calculator className="h-10 w-10 text-blue-400" />,
    title: "Tal",
    description: "Optælling af tal på somaliske.",
  },
  {
    icon: <Carrot className="h-10 w-10 text-orange-400" />,
    title: "Mad",
    description: "Ordforråd for frugter og grøntsager.",
  },
  {
    icon: <PawPrint className="h-10 w-10 text-yellow-400" />,
    title: "Dyr",
    description: "Lær dyrearter på somaliske.",
  },
  {
    icon: <Hand className="h-10 w-10 text-blue-400" />,
    title: "Kropsdel",
    description: "Lær navnene på kroppens dele på somalisk.",
  },
  {
    icon: <Earth className="h-10 w-10 text-green-500" />,
    title: "Geografi",
    description: "Lære om lande, Kontinenter og nartur geografi.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-blue-500" />,
    title: "Kalender",
    description: "Lær ordnavne dage, måneder og årstider på somaliske.",
  },
  {
    icon: <Users className="h-10 w-10 text-purple-400" />,
    title: "Familie og venner",
    description: "Opbygge ordforråd omkring relationer og sociale dynamikker.",
  },
  {
    icon: <House className="h-10 w-10 text-gray-400" />,
    title: "Ord",
    description: "Ordforråd med fokus på genstande i et hus, såsom stol, fjernsyn og sofa.",
  },
  {
    icon: <Activity className="h-10 w-10 text-orange-300" />,
    title: "Daglige aktiviteter",
    description: "Sætninger og udtryk for almindelige opgaver.",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-cyan-500" />,
    title: "Sætninger",
    description: "Strukturerede somaliske sætninger til kommunikationsøvelse.",
  },
  {
    icon: <Music className="h-10 w-10 text-pink-400" />,
    title: "Kulturelt indhold",
    description: "Udforske somalisk kulturarv gennem fortællinger, sange og traditioner.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-yellow-500" />,
    title: "Læse bøger",
    description: "Engagerende historier og praktisk anvendelse.",
  },
  {
    icon: <HelpCircle className="h-10 w-10 text-purple-400" />,
    title: "Quiz",
    description: "Test din viden om det, du har lært.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 bg-white md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategorier for læring</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Opdag sjove og lærerige kategorier for børn der vil lære somalisk gennem dansk
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureData.map((item, i) => (
            <FeatureCard
              key={i}
              icon={item.icon}
              title={item.title}
              description={item.description}
              bgColor={categoryColors[i % categoryColors.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, bgColor }) => {
  return (
    <Card
      className="border-0 shadow-md hover:shadow-lg transition-all"
      style={{
        background: bgColor,
        borderRadius: "1rem",
        minHeight: 220,
        transition: "background 0.2s"
      }}
    >
      <CardContent className="pt-6 bg-transparent">
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 rounded-full flex items-center justify-center shadow"
            style={{
              background: "#fff",
              width: 64,
              height: 64,
            }}
          >
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureSection;
