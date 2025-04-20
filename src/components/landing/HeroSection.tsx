
import { Button } from "@/components/ui/button";
import SomaliFlag from "./SomaliFlag";

const HERO_BLUE = "#4CA6FE";

const HeroSection = () => {
  return (
    <section
      className="relative py-16 px-4 md:px-8 lg:px-16"
      style={{
        background: "linear-gradient(90deg, #E5DEFF 0%, #D3E4FD 100%)",
        borderBottomLeftRadius: "36px",
        borderBottomRightRadius: "36px",
        boxShadow: "0 8px 32px 0 rgba(76,166,254,0.05)"
      }}
    >
      {/* Somalisk flag oppe i venstre hjørne */}
      <div className="absolute left-0 top-0 mt-6 ml-6 z-10 animate-fade-in">
        <SomaliFlag size={40} />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1
              className="text-4xl font-bold text-left md:text-5xl px-0 py-px my-0 bg-gradient-to-r from-[#4CA6FE] via-[#FEF7CD] to-[#FEDEE2] bg-clip-text text-transparent drop-shadow-xl"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: 1,
                lineHeight: 1.13
              }}
            >
              Dansk-Somaliske Læring
            </h1>
            <p className="text-xl text-purple-700 font-medium bg-white/80 rounded-lg p-4 shadow md:max-w-md animate-fade-in">
              En sjov og interaktiv måde for børn at lære somalisk sprog gennem dansk.<br />
              Perfekt til tosprogede familier og kulturel læring!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#FEC6A1] text-purple-900 font-bold hover:bg-[#FFA99F] shadow hover-scale rounded-xl transition-all">
                Start Gratis Prøve
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-[#FFD7F1] text-purple-700 font-semibold hover:bg-[#FDE1D3] hover:border-[#FFC2DD] rounded-xl transition-all">
                Lær Mere
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              24-timers gratis prøveperiode. Intet kreditkort påkrævet.
            </p>
          </div>
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-[410px] mx-auto group animate-scale-in">
              <div className="absolute -top-5 -left-5 w-full h-full rounded-3xl bg-[#FEDEE2] opacity-80 pointer-events-none z-0 animate-fade-in"></div>
              <div className="relative bg-white p-3 border-4 border-[#E5DEFF] rounded-xl shadow-xl z-10 animate-scale-in">
                <img
                  alt="Dugsi Learning lille familie"
                  className="w-full h-auto rounded-xl border-2 border-[#FFD7F1] shadow group-hover:scale-105 transition-transform animate-fade-in"
                  src="/lovable-uploads/39e62fa6-99c4-4bf1-996f-19577f56a318.png"
                />
              </div>
              <div className="absolute -bottom-4 right-4 bg-[#FEF7CD] text-[#1575ad] px-4 py-2 rounded-full shadow-md font-bold text-sm tracking-wide border-2 border-[#4CA6FE] animate-fade-in">
                Leg & Læring!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
