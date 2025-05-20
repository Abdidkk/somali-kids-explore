import { Brain, Coffee, Play } from "lucide-react";

// Nye, mere illustrative billeder - midlertidigt brugt Unsplash
const bulletImages = [
  {
    src: "/lovable-uploads/b4199833-0e7b-4459-b668-e1703860ecf1.png",
    alt: "Stamtræ – Identitet & rødder",
    bg: "bg-[#FDE1D3]",
  },
  {
    src: "/lovable-uploads/6ec9d492-46d1-4558-9e1d-92abc8dc7ebc.png",
    alt: "Gruppe børn i dialog – Kommunikation & Fællesskab",
    bg: "bg-[#D3E4FD]",
  },
  {
    src: "/lovable-uploads/5e2d4de9-8aa0-4544-b550-6b99911c87ba.png",
    alt: "Barn, bøger og læring – Sprog og læring",
    bg: "bg-[#E5DEFF]",
  },
  {
    src: "/lovable-uploads/bcb95cb7-3bd4-4b2c-8945-81adaca28f80.png",
    alt: "Illustration af flere sprogmuligheder med børn foran skærm med flag – Flere sprogmuligheder",
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
          <h3 className="text-2xl font-bold mb-7 text-black text-center">
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
