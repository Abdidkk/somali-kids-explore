
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

const subjects = [
  { title: "Alfabetet", desc: "Lær de somaliske bogstaver og udtale." },
  { title: "Tal", desc: "Bliv fortrolig med somaliske tal og talemåder." },
  { title: "Dagligdags ord", desc: "Opbyg ordforråd relevant for hverdag og familie." },
  { title: "Dialoger", desc: "Øv dig på simple sætninger og hilsener." },
  { title: "Kultur & Samfund", desc: "Forstå somalisk kultur og værdier." },
];

export default function SubjectsPage() {
  return (
    <div className="bg-gradient-to-b from-[#E5DEFF] via-white to-white min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl mb-8">
        <Link to="/" className="text-vivid-purple hover:underline">&larr; Til forsiden</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 flex items-center gap-2">
          <span><Book className="w-7 h-7" /></span>
          Fag / Områder
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Her får du et overblik over de vigtigste fag og læringsområder hos Dugsi.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-4xl">
        {subjects.map((s, idx) => (
          <Card key={idx} className="bg-soft-purple/70 border-0 shadow-lg">
            <CardContent className="py-5 px-6">
              <h2 className="font-semibold text-lg text-vivid-purple mb-2">{s.title}</h2>
              <p className="text-gray-700">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
