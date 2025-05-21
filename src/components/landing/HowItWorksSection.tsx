import { Brain, Coffee, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Nye, mere illustrative billeder - midlertidigt brugt Unsplash
const bulletImages = [{
  src: "/lovable-uploads/c14144b9-9843-4d08-ac21-d439ebef2ad0.png",
  alt: "Stamtræ – Identitet & rødder",
  bg: "bg-[#FDE1D3]"
}, {
  src: "/lovable-uploads/c7a740c6-588d-44dc-ba26-f1f0a1d10531.png",
  alt: "Gruppe børn i dialog – Kommunikation & Fællesskab",
  bg: "bg-[#D3E4FD]"
}, {
  src: "/lovable-uploads/85f38696-d894-4781-a2e8-210a91796896.png",
  alt: "Barn, bøger og læring – Sprog og læring",
  bg: "bg-[#E5DEFF]"
}, {
  src: "/lovable-uploads/e07592ff-5948-45cb-a7a5-de1ab3075b22.png",
  alt: "Illustration af flere sprogmuligheder med børn foran skærm med flag – Flere sprogmuligheder",
  bg: "bg-[#FFDEE2]"
}];
const howWhyBullets = [{
  img: bulletImages[0],
  title: <>
        <span className="text-[#8B5CF6] font-semibold text-[1.15rem]">Identitet</span>
        <span className="text-[#D946EF] font-semibold text-[1.12rem] ml-1">rødder</span>
      </>,
  text: <span>
        Styrker barnets <span className="font-semibold text-[#8B5CF6]">identitet</span>
        {" "}og tilknytning til deres <span className="font-semibold text-[#D946EF]">rødder</span> og kultur.
      </span>
}, {
  img: bulletImages[1],
  title: <>
        <span className="text-[#0EA5E9] font-semibold text-[1.15rem]">Kommunikation</span>
        <span className="text-[#1575ad] font-semibold text-[1.12rem] ml-1">fællesskab</span>
      </>,
  text: <span>
        Giver mulighed for at <span className="font-semibold text-[#0EA5E9]">kommunikere</span>
        {" "}med familie og fællesskab både her og i <span className="font-semibold text-[#1575ad]">Somalia</span>.
      </span>
}, {
  img: bulletImages[2],
  title: <>
        <span className="text-[#403E43] font-semibold text-[1.15rem]">Sproglig udvikling</span>
        <span className="text-[#6E59A5] font-semibold text-[1.12rem] ml-1">læringsevner</span>
      </>,
  text: <span>
        Forbedrer barnets generelle <span className="font-semibold text-[#403E43]">sproglige udvikling</span>
        {" "}og <span className="font-semibold text-[#6E59A5]">læringsevner</span>.
      </span>
}, {
  img: bulletImages[3],
  title: <>
        <span className="text-[#D946EF] font-semibold text-[1.15rem]">Flere sprog</span>
        <span className="text-[#1EAEDB] font-semibold text-[1.12rem] ml-1">muligheder</span>
      </>,
  text: <span>
        At kunne <span className="font-semibold text-[#D946EF]">flere sprog</span> åbner døre til{" "}
        <span className="font-semibold text-[#1EAEDB]">flere muligheder</span> i fremtiden.
      </span>
}];
const HowItWorksSection = () => {
  return <section className="py-16 px-4 bg-purple-50 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sådan Fungerer Det
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StepCard icon={<Coffee className="h-10 w-10" />} title="1. Opret en Konto" description="Tilmeld dig og opret forældre- og børneprofiler" bgColor="bg-orange-100" textColor="text-orange-500" />
          <StepCard icon={<Play className="h-10 w-10" />} title="2. Start Læring" description="Få adgang til interaktive lektioner og quizzer" bgColor="bg-purple-100" textColor="text-purple-500" />
          <StepCard icon={<Brain className="h-10 w-10" />} title="3. Følg Fremskridt" description="Overvåg præstationer og læringsmål" bgColor="bg-blue-100" textColor="text-blue-500" />
        </div>

        {/* Redesigned section with better expandability and enhanced images */}
        <Card className="bg-white rounded-lg shadow-xl p-6 md:p-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-black text-center">
            Hvorfor er det vigtigt at lære sit <span className="text-purple-600">modersmål?</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {howWhyBullets.map((bullet, idx) => <ModersmaalCard key={idx} image={bullet.img} title={bullet.title} text={bullet.text} index={idx} />)}
          </div>
          <div className="mt-8 text-center">
            
          </div>
        </Card>
      </div>
    </section>;
};
const StepCard = ({
  icon,
  title,
  description,
  bgColor,
  textColor
}) => {
  return <div className="text-center">
      <div className={`flex justify-center items-center w-20 h-20 mx-auto mb-4 rounded-full ${bgColor} ${textColor}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
};

// New component for better reusability and expandability
const ModersmaalCard = ({
  image,
  title,
  text,
  index
}) => {
  return <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in" style={{
    animationDelay: `${index * 150}ms`
  }}>
      <div className="flex flex-col h-full">
        <div className={`${image.bg} p-4 flex justify-center`}>
          <div className="relative w-full aspect-square max-w-[200px] mx-auto">
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-xl border-2 border-[#8B5CF6] shadow-md transition-transform duration-300 hover:scale-105" loading="lazy" />
          </div>
        </div>
        <CardContent className="flex-1 p-5">
          <div className="mb-2 text-[1.13rem]">
            {title}
          </div>
          <div className="text-gray-900 font-medium text-[1.09rem]">
            {text}
          </div>
        </CardContent>
      </div>
    </Card>;
};
export default HowItWorksSection;