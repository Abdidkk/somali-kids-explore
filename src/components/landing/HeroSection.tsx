
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-purple-100 to-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900">
              <span className="text-orange-500">Dugsi</span> Danish-Somali Learning
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
                <img 
                  src="/placeholder.svg" 
                  alt="Dugsi Learning" 
                  className="w-full h-auto rounded"
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
