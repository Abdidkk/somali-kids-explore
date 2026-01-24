
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PricingSection = () => {
  return (
    <section className="py-16 px-4 bg-white md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Abonnementsplaner</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vælg den plan der passer bedst til din familie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-2 hover:border-purple-300 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">Månedlig Plan</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">79 kr</span>
                <span className="text-gray-500 ml-2">/måned</span>
              </div>
              <CardDescription className="mt-2">Perfekt til kortvarig læring</CardDescription>
            </CardHeader>
            <CardContent>
              <PlanFeatures />
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Abonnér Nu</Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-300 shadow-lg">
            <CardHeader>
              <div className="bg-orange-500 text-white text-sm font-semibold py-1 px-3 rounded-full w-fit mb-2">
                BEDSTE VÆRDI
              </div>
              <CardTitle className="text-2xl">Årlig Plan</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">699 kr</span>
                <span className="text-gray-500 ml-2">/år</span>
              </div>
              <CardDescription className="mt-2">Spar 25% i forhold til månedlig</CardDescription>
            </CardHeader>
            <CardContent>
              <PlanFeatures isYearly />
              <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Abonnér Nu</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p>Alle planer starter med en 24-timers gratis prøveperiode. Intet kreditkort påkrævet.</p>
        </div>
      </div>
    </section>
  );
};

const PlanFeatures = ({ isYearly = false }) => {
  const features = isYearly
    ? ["Alle månedlige planfunktioner", "Prioriteret kundesupport", "Tidlig adgang til nyt indhold", "25% besparelse på årlig plan"]
    : ["Fuld adgang til alt læringsindhold", "Interaktive spil og quizzer", "Fremskridtssporing", "Opsig når som helst"];

  return (
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <div className="mr-2 h-5 w-5 text-green-500">✓</div>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default PricingSection;
