
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SomaliFlag from "./SomaliFlag";
import { ROUTES } from "@/utils/constants";
import { PageContainer } from "@/components/ui/page-container";
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 md:px-8 lg:px-16 relative">
      {/* Somalisk flag oppe i venstre hjørne */}
      <div className="absolute left-0 top-0 mt-6 ml-6 z-10">
        <SomaliFlag />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl font-bold text-left md:text-5xl">
              <span className="text-somali-red">Dansk</span>
              <span className="text-hero-blue"> Somaliske </span>
              <span className="text-foreground">Læring</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              En sjov og interaktiv måde for børn at lære somalisk sprog gennem dansk. Perfekt til tosprogede familier og kulturel læring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-hero-blue hover:bg-hero-blue/90 w-full sm:w-auto">
                <Link to={ROUTES.CHOOSE_PLAN}>
                  Start 24-Timers Gratis Prøve
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-hero-blue text-hero-blue hover:bg-hero-blue/10 w-full sm:w-auto">
                <Link to={ROUTES.PRICING}>
                  Lær Mere
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              24 timer gratis, derefter normal pris. Kreditkort påkrævet.
            </p>
          </div>
          <div className="lg:w-1/2 animate-slide-up">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-yellow-100 rounded-lg opacity-50"></div>
              <div className="relative bg-card p-3 border-2 border-hero-blue/30 rounded-lg shadow-lg">
                <img 
                  alt="Dugsi børn" 
                  className="w-full h-auto rounded" 
                  src="/billeder/skole.png"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
