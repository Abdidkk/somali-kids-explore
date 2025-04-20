
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { users, info } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-[#E5DEFF] via-white to-white min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl mb-8">
        <Link to="/" className="text-vivid-purple hover:underline">&larr; Til forsiden</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          <span className="inline-flex align-middle mr-2"><info className="w-7 h-7" /></span>
          Om Dugsi Læring
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Dugsi Læring er dedikeret til at gøre somalisk sproglæring sjov, motiverende og lettilgængelig for børn i Danmark. 
          Vi tror på legende læring og på at styrke børns sproglige rødder samt selvtillid igennem digital undervisning skræddersyet til danske-somaliske familier.
        </p>
      </div>
      <Card className="bg-soft-purple/70 border-0 shadow-lg w-full max-w-2xl">
        <CardContent className="flex flex-col gap-8 py-8 px-8">
          <div className="flex items-center gap-3">
            <users className="text-vivid-purple w-6 h-6" />
            <span className="text-base text-gray-700">
              Vores team består af erfarne lærere, sprogpædagoger og teknologientusiaster.
            </span>
          </div>
          <div>
            <span className="font-semibold text-vivid-purple">Vores mission:&nbsp;</span>
            At skabe bro mellem kulturer gennem sproglig og kulturel læring, der engagerer både børn og forældre!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
