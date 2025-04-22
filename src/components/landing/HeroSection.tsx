
import { Button } from "@/components/ui/button";
import SomaliFlag from "./SomaliFlag";
const HERO_BLUE = "#4CA6FE";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-purple-100 to-white py-16 px-4 md:px-8 lg:px-16 relative">
      {/* Somalisk flag oppe i venstre hjørne */}
      <div className="absolute left-0 top-0 mt-6 ml-6 z-10">
        <SomaliFlag />
      </div>
      
      {/* Stort bannerbillede */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="relative rounded-xl overflow-hidden shadow-xl">
          <img 
            src="/lovable-uploads/bed57f0f-32ee-4a06-8668-fb4be176b5f1.png" 
            alt="Dugsi - Børn på vej til skole" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-center py-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold">Kaalay Dugsiga</h2>
            <p className="text-white text-lg md:text-xl mt-2">Kom ind til skolen</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-left md:text-5xl px-0 py-px my-0">
              <span style={{ color: "#ea384c" }}>Dansk</span>
              <span style={{ color: HERO_BLUE }}> Somaliske </span>
              <span style={{ color: "#000000" }}>Læring</span>
            </h1>
            <p className="text-xl text-gray-700">
              En sjov og interaktiv måde for børn at lære somalisk sprog gennem dansk. Perfekt til tosprogede familier og kulturel læring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Start Gratis Prøve
              </Button>
              <Button variant="outline" size="lg">
                Lær Mere
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              24-timers gratis prøveperiode. Intet kreditkort påkrævet.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-orange-200 rounded-lg"></div>
              <div className="relative bg-white p-3 border-2 border-purple-300 rounded-lg shadow-lg">
                <img alt="Dugsi børn" className="w-full h-auto rounded" src="/lovable-uploads/39e62fa6-99c4-4bf1-996f-19577f56a318.png" />
                {/* Overlay text */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#4CA6FE]/80 text-white text-2xl md:text-3xl px-6 py-1 rounded shadow animate-fade-in font-bold tracking-wide pointer-events-none">
                  Dugsi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
