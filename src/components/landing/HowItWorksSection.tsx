
import { Brain, Coffee, Play } from "lucide-react";

// Nye, mere illustrative billeder - midlertidigt brugt Unsplash
const bulletImages = [
  {
    src: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=800&q=80",
    alt: "Barn og forælder sammen – Identitet & Kultur",
    bg: "bg-[#FDE1D3]",
  },
  {
    src: "https://images.unsplash.com/photo-1458071103677-270ed5661cfc?w=800&q=80",
    alt: "Gruppe børn i dialog – Kommunikation & Fællesskab",
    bg: "bg-[#D3E4FD]",
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=80",
    alt: "Barn, bøger og læring – Sprog og læring",
    bg: "bg-[#E5DEFF]",
  },
  {
    src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80",
    alt: "Børn i leg, sammenhold – Sociale relationer",
    bg: "bg-[#FEF7CD]",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    alt: "Børn på opdagelse – Muligheder",
    bg: "bg-[#FFDEE2]",
  },
];

const howWhyBullets = [
  {
    img: bulletImages[0],
    title: (
      <>
        <span className="text-[#8B5CF6] font-semibold text-[1.15rem]">Identitet</span>
        <span className="text-[#D946EF] font-semibold text-[1.12rem] ml-1">rødder</span>
      </>
    ),
    text: (
      <span>
        Styrker barnets <span className="font-semibold text-[#8B5CF6]">identitet</span>
        {" "}og tilknytning til deres <span className="font-semibold text-[#D946EF]">rødder</span> og kultur.
      </span>
    ),
  },
  {
    img: bulletImages[1],
    title: (
      <>
        <span className="text-[#0EA5E9] font-semibold text-[1.15rem]">Kommunikation</span>
        <span className="text-[#1575ad] font-semibold text-[1.12rem] ml-1">fællesskab</span>
      </>
    ),
    text: (
      <span>
        Giver mulighed for at <span className="font-semibold text-[#0EA5E9]">kommunikere</span>
        {" "}med familie og fællesskab både her og i <span className="font-semibold text-[#1575ad]">Somalia</span>.
      </span>
    ),
  },
  {
    img: bulletImages[2],
    title: (
      <>
        <span className="text-[#403E43] font-semibold text-[1.15rem]">Sproglig udvikling</span>
        <span className="text-[#6E59A5] font-semibold text-[1.12rem] ml-1">læringsevner</span>
      </>
    ),
    text: (
      <span>
        Forbedrer barnets generelle <span className="font-semibold text-[#403E43]">sproglige udvikling</span>
        {" "}og <span className="font-semibold text-[#6E59A5]">læringsevner</span>.
      </span>
    ),
  },
  {
    img: bulletImages[3],
    title: (
      <>
        <span className="text-[#9b87f5] font-semibold text-[1.15rem]">Sociale relationer</span>
        <span className="text-[#F97316] font-semibold text-[1.12rem] ml-1">samhørighed</span>
      </>
    ),
    text: (
      <span>
        Understøtter <span className="font-semibold text-[#9b87f5]">sociale relationer</span>
        {" "}og følelsen af <span className="font-semibold text-[#F97316]">samhørighed</span>.
      </span>
    ),
  },
  {
    img: bulletImages[4],
    title: (
      <>
        <span className="text-[#D946EF] font-semibold text-[1.15rem]">Flere sprog</span>
        <span className="text-[#1EAEDB] font-semibold text-[1.12rem] ml-1">muligheder</span>
      </>
    ),
    text: (
      <span>
        At kunne <span className="font-semibold text-[#D946EF]">flere sprog</span> åbner døre til{" "}
        <span className="font-semibold text-[#1EAEDB]">flere muligheder</span> i fremtiden.
      </span>
    ),
  },
];

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

        {/* Opdateret sektion med store illustrationer som punkter */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-7 text-purple-700 text-center">
            Hvorfor er det vigtigt at lære sit <span className="text-purple-600">modersmål?</span>
          </h3>
          <ul className="space-y-12">
            {howWhyBullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex flex-col items-center md:flex-row md:items-center md:space-x-7 animate-fade-in"
              >
                <div
                  className={`flex-shrink-0 ${bullet.img.bg} rounded-2xl shadow-lg w-[120px] h-[120px] flex items-center justify-center mb-4 md:mb-0`}
                >
                  <img
                    src={bullet.img.src}
                    alt={bullet.img.alt}
                    className="w-[110px] h-[110px] object-cover rounded-xl border-2 border-[#8B5CF6] shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-1 text-[1.13rem]">
                    {bullet.title}
                  </div>
                  <div className="text-gray-900 font-medium text-[1.09rem] sm:text-lg">
                    {bullet.text}
                  </div>
                </div>
              </li>
            ))}
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
