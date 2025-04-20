
import React from "react";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsOfServicePage() {
  return (
    <div className="bg-gradient-to-b from-[#E5DEFF] via-white to-white min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl mb-8">
        <Link to="/" className="text-vivid-purple hover:underline">&larr; Til forsiden</Link>
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2 text-primary mb-4">
          <Shield className="w-7 h-7" />
          Servicevilkår
        </h1>
        <p className="text-gray-700 text-base mb-6">
          For at bruge Dugsi Læring accepterer du følgende vilkår. Platformen er kun til privat brug og børn under 18 år skal have forældre-/værges samtykke.
        </p>
        <div className="bg-soft-purple/40 rounded shadow px-6 py-4 text-gray-700 text-sm">
          <strong>1. Adgang:</strong> Misbrug af tjenesten kan føre til lukning af brugerprofil.<br /><br />
          <strong>2. Ansvar:</strong> Dugsi Læring påtager sig ikke ansvar for indirekte tab.<br /><br />
          <strong>3. Ændringer:</strong> Vilkår kan opdateres. Brugere informeres ved væsentlige ændringer.<br /><br />
          Se flere detaljer i vores politik og kontakt os for spørgsmål.
        </div>
      </div>
    </div>
  );
}
