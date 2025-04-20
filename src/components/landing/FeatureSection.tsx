
import { Card, CardContent } from "@/components/ui/card";
import {
  Abc,
  Volume2,
  Palette,
  Coins,
  Apple,
  Dog,
  Earth,
  Calendar,
  Users,
  Sofa,
  Activity,
  MessageSquare,
  Book,
} from "lucide-react";

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 bg-white md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sjove Kategorier – Lær Somali og Dansk</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oplev engagerende indhold, der hjælper børn med at lære somalisk gennem dansk, opdelt i spændende kategorier!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Abc className="h-10 w-10 text-purple-700" />}
            title="Alfabet"
            description="Somaliske bogstaver og udtale, forklaret på dansk"
          />
          <FeatureCard 
            icon={<Palette className="h-10 w-10 text-pink-500" />}
            title="Farver"
            description="Navne og genkendelse af farver på somalisk"
          />
          <FeatureCard 
            icon={<Coins className="h-10 w-10 text-yellow-500" />}
            title="Tal"
            description="Optælling og grundlæggende matematik på somalisk"
          />
          <FeatureCard 
            icon={<Apple className="h-10 w-10 text-green-600" />}
            title="Mad"
            description="Ordforråd for frugter og grøntsager"
          />
          <FeatureCard 
            icon={<Dog className="h-10 w-10 text-orange-400" />}
            title="Dyr"
            description="Somaliske navne på dyr og deres egenskaber"
          />
          <FeatureCard 
            icon={<Earth className="h-10 w-10 text-blue-400" />}
            title="Geografi"
            description="Lær om lande, regioner og somalisk geografi"
          />
          <FeatureCard 
            icon={<Calendar className="h-10 w-10 text-teal-500" />}
            title="Kalender"
            description="Terminologi for dage, måneder og årstider"
          />
          <FeatureCard 
            icon={<Users className="h-10 w-10 text-violet-500" />}
            title="Familie og venner"
            description="Relationer og ordforråd om sociale dynamikker"
          />
          <FeatureCard 
            icon={<Sofa className="h-10 w-10 text-gray-700" />}
            title="Ord"
            description="Genstande i hjemmet – stol, fjernsyn, sofa og flere"
          />
          <FeatureCard 
            icon={<Activity className="h-10 w-10 text-lime-600" />}
            title="Daglige aktiviteter"
            description="Sætninger til hverdagsopgaver"
          />
          <FeatureCard 
            icon={<MessageSquare className="h-10 w-10 text-cyan-600" />}
            title="Sætninger"
            description="Strukturerede somaliske sætninger til øvelse"
          />
          <FeatureCard 
            icon={<Book className="h-10 w-10 text-orange-600" />}
            title="Kulturelt indhold og Læse bøger"
            description="Historier, fortællinger, traditioner og praktisk læsning"
          />
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
          <div className="mb-4">
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
