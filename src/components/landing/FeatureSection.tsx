
import { Card, CardContent } from "@/components/ui/card";
import {
  Mic, Palette, Calculator, Carrot, PawPrint, Earth, Calendar,
  Users, House, Activity, MessageSquare, Music, BookOpen
} from "lucide-react";

const featureData = [
  {
    icon: <Mic className="h-10 w-10 text-purple-500" />,
    title: "Alfabet",
    description: "Somaliske bogstaver og udtale."
  },
  {
    icon: <Palette className="h-10 w-10 text-pink-500" />,
    title: "Farver",
    description: "Navne og genkendelse."
  },
  {
    icon: <Calculator className="h-10 w-10 text-blue-500" />,
    title: "Tal",
    description: "Optælling og grundlæggende matematik."
  },
  {
    icon: <Carrot className="h-10 w-10 text-orange-500" />,
    title: "Mad",
    description: "Ordforråd for frugter og grøntsager."
  },
  {
    icon: <PawPrint className="h-10 w-10 text-yellow-500" />,
    title: "Dyr",
    description: "Somaliske navne og deres egenskaber."
  },
  {
    icon: <Earth className="h-10 w-10 text-green-500" />,
    title: "Geografi",
    description: "Lære om lande og regioner, inklusive somalisk-specifik geografi."
  },
  {
    icon: <Calendar className="h-10 w-10 text-lime-500" />,
    title: "Kalender",
    description: "Forstå somalisk terminologi for dage, måneder og årstider."
  },
  {
    icon: <Users className="h-10 w-10 text-blue-400" />,
    title: "Familie og venner",
    description: "Opbygge ordforråd omkring relationer og sociale dynamikker."
  },
  {
    icon: <House className="h-10 w-10 text-violet-500" />,
    title: "Ord",
    description: "Ordforråd med fokus på genstande i et hus, såsom stol, fjernsyn og sofa."
  },
  {
    icon: <Activity className="h-10 w-10 text-red-400" />,
    title: "Daglige aktiviteter",
    description: "Sætninger og udtryk for almindelige opgaver."
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-cyan-500" />,
    title: "Sætninger",
    description: "Strukturerede somaliske sætninger til kommunikationsøvelse."
  },
  {
    icon: <Music className="h-10 w-10 text-fuchsia-600" />,
    title: "Kulturelt indhold",
    description: "Udforske somalisk kulturarv gennem fortællinger, sange og traditioner."
  },
  {
    icon: <BookOpen className="h-10 w-10 text-orange-400" />,
    title: "Læse bøger",
    description: "Engagerende historier og praktisk anvendelse."
  }
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureSection;
