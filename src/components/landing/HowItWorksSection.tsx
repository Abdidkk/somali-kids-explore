
import { Brain, Coffee, Play, Disc } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="py-16 px-4 bg-purple-50 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sådan Fungerer Det
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StepCard
            icon={<Coffee className="h-10 w-10" />}
            title="1. Opret en Konto"
            description="Tilmeld dig og opret forældre- og børneprofiler"
            bgColor="bg-orange-100"
            textColor="text-orange-500"
          />
          <StepCard
            icon={<Play className="h-10 w-10" />}
            title="2. Start Læring"
            description="Få adgang til interaktive lektioner og quizzer"
            bgColor="bg-purple-100"
            textColor="text-purple-500"
          />
          <StepCard
            icon={<Brain className="h-10 w-10" />}
            title="3. Følg Fremskridt"
            description="Overvåg præstationer og læringsmål"
            bgColor="bg-blue-100"
            textColor="text-blue-500"
          />
        </div>

        {/* Ny sektion med vigtige punkter */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-purple-700 text-center">
            Hvorfor er det vigtigt at lære sit <span className="text-purple-600">modersmål?</span>
          </h3>
          <ul className="space-y-4 text-lg">
            <InfoBullet 
              iconColor="text-[#F97316]" 
              text={<>Styrker barnets <span className="text-[#8B5CF6] font-semibold">identitet</span> og tilknytning til deres <span className="text-[#D946EF] font-semibold">rødder</span> og kultur.</>} 
            />
            <InfoBullet 
              iconColor="text-[#33C3F0]" 
              text={<>Giver mulighed for at <span className="text-[#0EA5E9] font-semibold">kommunikere</span> med familie og fællesskab både her og i <span className="text-[#1575ad] font-semibold">Somalia</span>.</>} 
            />
            <InfoBullet 
              iconColor="text-[#FEC6A1]" 
              text={<>Forbedrer barnets generelle <span className="text-[#403E43] font-semibold">sproglige udvikling</span> og <span className="text-[#6E59A5] font-semibold">læringsevner</span>.</>} 
            />
            <InfoBullet 
              iconColor="text-[#7E69AB]" 
              text={<>Understøtter <span className="text-[#9b87f5] font-semibold">sociale relationer</span> og følelsen af <span className="text-[#F97316] font-semibold">samhørighed</span>.</>} 
            />
            <InfoBullet 
              iconColor="text-[#8B5CF6]" 
              text={<>At kunne <span className="text-[#D946EF] font-semibold">flere sprog</span> åbner døre til <span className="text-[#1EAEDB] font-semibold">flere muligheder</span> i fremtiden.</>} 
            />
          </ul>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ icon, title, description, bgColor, textColor }) => {
  return (
    <div className="text-center">
      <div className={`flex justify-center items-center w-20 h-20 mx-auto mb-4 rounded-full ${bgColor} ${textColor}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// InfoBullet: farverigt ikonpunkt + farverig tekst
const InfoBullet = ({ iconColor, text }) => (
  <li className="flex items-start space-x-3">
    <span className={`pt-1`}>
      <Disc className={`w-5 h-5 ${iconColor} min-w-5`} />
    </span>
    <span className="">{text}</span>
  </li>
);

export default HowItWorksSection;
