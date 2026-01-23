
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DEFAULT_PLAN } from "@/types/subscription";

export default function MereOmPriserPage() {
  const basePrice = DEFAULT_PLAN.basePricePerChild; // 45 kr ekskl. moms
  const extraChildPrice = DEFAULT_PLAN.extraChildFee; // 15 kr ekskl. moms

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white min-h-screen py-12 px-4 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-2xl mb-8">
        <Link to="/priser" className="text-blue-600 hover:underline flex items-center gap-1">&larr; Tilbage til priser</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 mt-2">
          Mere om priser & abonnementer
        </h1>
        <Card className="bg-blue-50 border-0 shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-blue-700">Gratis prøveperiode</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Start med <span className="font-semibold text-blue-600">24 timers gratis adgang</span> til hele platformen – du skal ikke oplyse kreditkort.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Efter prøveperioden vælger du selv, om du vil abonnere månedligt.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/60 border-0 shadow mb-6">
          <CardHeader>
            <CardTitle className="text-blue-700">Abonnementsvalg</CardTitle>
            <CardDescription>Månedlig betaling</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <span className="font-bold">Månedlig:</span> <span className="text-blue-600">{basePrice} kr/md ekskl. moms</span> (ingen binding)
              </li>
              <li>
                <span className="font-bold">Ekstra børneprofiler:</span> {extraChildPrice} kr/md ekskl. moms
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/40 border-0 shadow">
          <CardHeader>
            <CardTitle className="text-blue-700">Andre fordele</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              <li>Fuld adgang til alle fag, lektioner og aktiviteter</li>
              <li>Ingen binding – opsig når som helst</li>
              <li>Fremtidige opdateringer og indhold er inkluderet</li>
              <li>Kontakt os for institutioner eller specielle løsninger</li>
            </ul>
            <p className="mt-4 text-xs text-gray-600">
              Spørgsmål? Skriv til <a className="text-blue-600 underline" href="mailto:kontakt@dugsi.dk">kontakt@dugsii.dk</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
