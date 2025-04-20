
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  { title: "Gratis prøve", price: "0 kr.", desc: "Adgang til udvalgte lektioner og tests." },
  { title: "Fuldt medlemskab", price: "49 kr./md.", desc: "Ubegrænset adgang til alt indhold, aktiviteter og nye opdateringer." },
];

export default function PricingPage() {
  return (
    <div className="bg-gradient-to-b from-[#E5DEFF] via-white to-white min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl mb-8">
        <Link to="/" className="text-vivid-purple hover:underline">&larr; Til forsiden</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 flex items-center gap-2">
          <DollarSign className="w-7 h-7" />
          Priser
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Vælg det medlemskab, der passer til din familie. Ingen binding. Gratis prøve.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl">
        {plans.map((plan, idx) => (
          <Card key={idx} className="bg-soft-purple/70 border-0 shadow-lg">
            <CardContent className="py-6 px-8 flex flex-col gap-4">
              <h2 className="font-semibold text-xl text-vivid-purple">{plan.title}</h2>
              <div className="text-2xl font-bold">{plan.price}</div>
              <p className="text-gray-700 text-sm">{plan.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
