
import { Brain, Coffee, Play } from "lucide-react";

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
            Hvorfor er det vigtigt at lære sit modersmål?
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 text-lg">
            <li>
              Styrker barnets identitet og tilknytning til deres rødder og kultur.
            </li>
            <li>
              Giver mulighed for at kommunikere med familie og fællesskab både her og i Somalia.
            </li>
            <li>
              Forbedrer barnets generelle sproglige udvikling og læringsevner.
            </li>
            <li>
              Understøtter sociale relationer og følelsen af samhørighed.
            </li>
            <li>
              At kunne flere sprog åbner døre til flere muligheder i fremtiden.
            </li>
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

export default HowItWorksSection;
