import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DollarSign, CalendarCheck, BadgePercent } from "lucide-react";
import { Link } from "react-router-dom";
export default function PricingPage() {
  return <div className="bg-gradient-to-b from-[#E5DEFF] via-white to-white min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl mb-8">
        <Link to="/" className="text-vivid-purple hover:underline">&larr; Til forsiden</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 flex items-center gap-2">
          
          Priser & Planer
        </h1>
        <p className="text-gray-700 text-base mb-3">
          Start med <b>gratis prøve i 24 timer</b> – intet kreditkort nødvendigt! Herefter kan du vælge det abonnement, der passer til dig.
        </p>
        <p className="text-gray-600 text-sm mb-6">
          Ingen binding. Opsig når som helst.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full max-w-3xl">
        {/* Månedlig plan */}
        <Card className="bg-soft-purple/70 border-0 shadow-lg flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center gap-2 text-vivid-purple">
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
        </Card>

        {/* Årlig plan */}
        <Card className="bg-[#9b87f511] border-2 border-vivid-purple shadow-xl flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center gap-2 text-orange-500 font-semibold uppercase tracking-wide">
              <BadgePercent className="w-5 h-5" />
              Spar 25%
            </div>
            <div className="flex items-center gap-2 mt-2">
              <CardTitle className="text-xl font-semibold text-vivid-purple">Årlig betaling</CardTitle>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-bold">405 kr</span>
              <span className="text-lg text-gray-600 ml-1">/år</span>
            </div>
            <CardDescription className="mt-2">Tilsvarende 33,75 kr/md. Samme fulde adgang som månedlig.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✔️ 24 timers gratis prøveperiode</li>
              <li>✔️ Alle fordele fra månedlig plan</li>
              <li>✔️ Bedste værdi – spar 25%</li>
              <li>✔️ Inkluderer 1 børneprofil</li>
              <li>➕ Ekstra børneprofil: <b>135 kr/år</b></li>
              <li>✔️ Opsig når som helst</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 w-full max-w-2xl">
        <Card className="bg-purple-50/50 border-0 shadow-none">
          <CardContent className="py-5 px-8 text-center text-gray-700 text-sm">
            <div className="mb-1">
              <b>Bemærk:</b> Alle abonnementer starter med 24 timers gratis prøveperiode uden kreditkort.
            </div>
            <div>
              Hver ekstra børneprofil koster <b>15 kr/md.</b> (eller <b>135 kr/år</b> ved årlig betaling).
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Kontakt os på kontakt@dugsi.dk hvis du har brug for at tilføje mange børn eller har særlige behov.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}