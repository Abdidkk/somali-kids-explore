
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function MereOmPriserPage() {
  return (
    <div className="bg-gradient-to-b from-[#E5DEFF] via-white to-white min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl mb-8">
        <Link to="/priser" className="text-vivid-purple hover:underline">&larr; Tilbage til priser</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 mt-2">
          Mere om priser & abonnementer
        </h1>
        <Card className="bg-soft-purple/30 border-0 shadow-md mb-6">
          <CardHeader>
            <CardTitle>Gratis prøveperiode</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Start med <span className="font-semibold text-vivid-purple">24 timers gratis adgang</span> til hele platformen – du skal ikke oplyse kreditkort.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Efter prøveperioden vælger du selv, om du vil abonnere månedligt eller årligt.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/60 border-0 shadow mb-6">
          <CardHeader>
            <CardTitle>Abonnementsvalg</CardTitle>
            <CardDescription>Vælg mellem månedlig eller årlig betaling</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <span className="font-bold">Månedlig:</span> <span className="text-vivid-purple">45 kr/md</span> (ingen binding)
              </li>
              <li>
                <span className="font-bold">Årlig:</span> <span className="text-vivid-purple">405 kr/år</span> (svarende til 33,75 kr/md) - du sparer 25%
              </li>
              <li>
                <span className="font-bold">Ekstra børneprofiler:</span> 15 kr/md. eller 135 kr/år for hver ekstra barn.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/40 border-0 shadow">
          <CardHeader>
            <CardTitle>Andre fordele</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              <li>Fuld adgang til alle fag, lektioner og aktiviteter</li>
              <li>Ingen binding – opsig når som helst</li>
              <li>Fremtidige opdateringer og indhold er inkluderet</li>
              <li>Kontakt os for institutioner eller specielle løsninger</li>
            </ul>
            <p className="mt-4 text-xs text-gray-600">
              Spørgsmål? Skriv til <a className="text-vivid-purple underline" href="mailto:kontakt@dugsi.dk">kontakt@dugsi.dk</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
