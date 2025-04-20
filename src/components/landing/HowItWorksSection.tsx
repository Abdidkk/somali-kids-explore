
import { Brain, Coffee, Play } from "lucide-react";

/**
 * Store, lokale/Unsplash illustrationsbilleder relevant for modersmål (72x72)
 */
const bulletImages = [
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&q=80",
    alt: "Identitet & kultur",
    bg: "bg-[#FDE1D3]",
  },
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&q=80",
    alt: "Kommunikation i fællesskab",
    bg: "bg-[#D3E4FD]",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&q=80",
    alt: "Sprog og læring",
    bg: "bg-[#E5DEFF]",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80",
    alt: "Sociale relationer",
    bg: "bg-[#FEF7CD]",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&q=80",
    alt: "Muligheder",
    bg: "bg-[#FFDEE2]",
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

        {/* Opdateret sektion med store billeder som punkter */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-7 text-purple-700 text-center">
            Hvorfor er det vigtigt at lære sit <span className="text-purple-600">modersmål?</span>
          </h3>
          <ul className="space-y-7">
            <ImageBullet
              img={bulletImages[0]}
              text={
                <span>
                  Styrker barnets{" "}
                  <span className="text-[#8B5CF6] font-semibold text-lg">identitet</span>
                  {" "}og tilknytning til deres{" "}
                  <span className="text-[#D946EF] font-semibold text-lg">rødder</span> og kultur.
                </span>
              }
            />
            <ImageBullet
              img={bulletImages[1]}
              text={
                <span>
                  Giver mulighed for at{" "}
                  <span className="text-[#0EA5E9] font-semibold text-lg">kommunikere</span>
                  {" "}med familie og fællesskab både her og i{" "}
                  <span className="text-[#1575ad] font-semibold text-lg">Somalia</span>.
                </span>
              }
            />
            <ImageBullet
              img={bulletImages[2]}
              text={
                <span>
                  Forbedrer barnets generelle{" "}
                  <span className="text-[#403E43] font-semibold text-lg">sproglige udvikling</span>
                  {" "}og{" "}
                  <span className="text-[#6E59A5] font-semibold text-lg">læringsevner</span>.
                </span>
              }
            />
            <ImageBullet
              img={bulletImages[3]}
              text={
                <span>
                  Understøtter{" "}
                  <span className="text-[#9b87f5] font-semibold text-lg">sociale relationer</span>
                  {" "}og følelsen af{" "}
                  <span className="text-[#F97316] font-semibold text-lg">samhørighed</span>.
                </span>
              }
            />
            <ImageBullet
              img={bulletImages[4]}
              text={
                <span>
                  At kunne{" "}
                  <span className="text-[#D946EF] font-semibold text-lg">flere sprog</span> åbner døre til{" "}
                  <span className="text-[#1EAEDB] font-semibold text-lg">flere muligheder</span> i fremtiden.
                </span>
              }
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

type ImageBulletProps = {
  img: { src: string; alt: string; bg: string };
  text: React.ReactNode;
};

const ImageBullet = ({ img, text }: ImageBulletProps) => (
  <li className="flex items-center space-x-5">
    <div className={`flex-shrink-0 ${img.bg} rounded-xl shadow-lg w-[72px] h-[72px] flex items-center justify-center`}>
      <img
        src={img.src}
        alt={img.alt}
        className="w-[64px] h-[64px] object-cover rounded-lg border-2 border-[#8B5CF6] shadow"
        loading="lazy"
      />
    </div>
    <span className="text-gray-900 font-medium text-[1.09rem] sm:text-lg">{text}</span>
  </li>
);

export default HowItWorksSection;
