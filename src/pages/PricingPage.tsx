
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingPage() {
  return <div className="bg-gradient-to-b from-blue-50 via-white to-white min-h-screen py-12 px-4 flex flex-col items-center animate-fade-in">
    <div className="w-full max-w-xl mb-8">
      <Link to="/" className="text-blue-600 hover:underline flex items-center gap-1">&larr; Til forsiden</Link>
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 flex items-center gap-2">
        Priser & Planer
      </h1>
      <p className="text-gray-700 text-base mb-3">
        Start med <b>gratis prøve i 24 timer</b> – intet kreditkort nødvendigt! Herefter kan du vælge det abonnement, der passer til dig.
      </p>
      <p className="text-gray-600 text-sm mb-6">
        Ingen binding. Opsig når som helst.
      </p>
    </div>

    <div className="flex justify-center w-full max-w-3xl">
      {/* Månedlig plan */}
      <Card className="bg-blue-50 border-0 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-2 text-blue-600">
            <CalendarCheck className="w-6 h-6" />
            <CardTitle className="text-xl font-semibold">Månedlig betaling</CardTitle>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold">45 kr</span>
            <span className="text-lg text-gray-600 ml-1">/måned</span>
          </div>
          <CardDescription className="mt-2">Fuld adgang for 1 barn. Ingen binding.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✔️ 24 timers gratis prøveperiode</li>
            <li>✔️ Ubegrænset adgang til alle fag, lektioner & aktiviteter</li>
            <li>✔️ Inkluderer 1 børneprofil</li>
            <li>➕ Ekstra børneprofil: <b>15 kr/md.</b></li>
            <li>✔️ Opsig når som helst</li>
            <li>✔️ Nye opdateringer og indhold</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Link className="text-blue-600 underline text-sm hover:font-semibold" to="/priser/mere-info">
            Læs mere
          </Link>
        </CardFooter>
      </Card>
    </div>

    <div className="mt-10 w-full max-w-2xl">
      <Card className="bg-blue-50/50 border-0 shadow-none">
        <CardContent className="py-5 px-8 text-center text-gray-700 text-sm">
          <div className="mb-1">
            <b>Bemærk:</b> Alle abonnementer starter med 24 timers gratis prøveperiode uden kreditkort.
          </div>
          <div>
            Hver ekstra børneprofil koster <b>15 kr/md.</b>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Kontakt os på kontakt@dugsi.dk hvis du har brug for at tilføje mange børn eller har særlige behov.
          </div>
        </CardContent>
      </Card>
    </div>
  </div>;
}

