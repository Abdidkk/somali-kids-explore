
import { Card, CardContent } from "@/components/ui/card";
import { Languages, GraduationCap, Palette, Users, Calendar, BookOpen } from "lucide-react";

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 bg-white md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Læring Gjort Sjovt</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Udforsk vores interaktive læringsindhold designet specielt til børn der lærer somalisk gennem dansk
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Languages className="h-10 w-10 text-purple-500" />}
            title="Alfabet Læring"
            description="Lær somaliske bogstaver med visuelle hjælpemidler og lydudtale på dansk"
          />
          <FeatureCard 
            icon={<GraduationCap className="h-10 w-10 text-blue-500" />}
            title="Tal & Regning"
            description="Mestre tælling og grundlæggende matematik på somalisk med dansk forklaring"
          />
          <FeatureCard 
            icon={<Palette className="h-10 w-10 text-pink-500" />}
            title="Farver & Former"
            description="Genkend og navngiv farver og former på somalisk gennem danske oversættelser"
          />
          <FeatureCard 
            icon={<Users className="h-10 w-10 text-yellow-500" />}
            title="Familie & Relationer"
            description="Lær somaliske ord for familiemedlemmer med dansk oversættelse"
          />
          <FeatureCard 
            icon={<Calendar className="h-10 w-10 text-green-500" />}
            title="Kalender & Tid"
            description="Forstå somalisk terminologi for dage og måneder med dansk reference"
          />
          <FeatureCard 
            icon={<BookOpen className="h-10 w-10 text-orange-500" />}
            title="Kulturelle Lektioner"
            description="Udforsk somaliske ordsprog og kulturelle fortællinger med dansk forklaring"
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
