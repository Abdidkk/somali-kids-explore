
import React from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white min-h-screen py-12 px-4 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-2xl mb-8">
        <Link to="/" className="text-blue-600 hover:underline flex items-center gap-1">&larr; Til forsiden</Link>
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2 text-blue-700 mb-4">
          <FileText className="w-7 h-7 text-blue-600" />
          Privatlivspolitik
        </h1>
        <p className="text-gray-700 text-base mb-6">
          Vi passer godt på dine data. Læs mere om, hvordan vi indsamler, bruger og beskytter oplysninger om vores brugere.
        </p>
        <div className="bg-blue-50 rounded shadow px-6 py-4 text-gray-700 text-sm">
          <strong>1. Dataansvarlig:</strong> Dugsi Læring.<br /><br />
          <strong>2. Hvilke data?</strong> Vi indsamler kun nødvendige oplysninger til oprettelse af konto, brug af platformen og løbende forbedringer.<br /><br />
          <strong>3. Brug:</strong> Data bruges kun til interne formål og deles aldrig med tredjepart.<br /><br />
          <strong>4. Sletning:</strong> Kontakt os for sletning af dine oplysninger.<br /><br />
          For spørgsmål eller indsigt i dine data – skriv til: kontakt@dugsi.dk
        </div>
      </div>
    </div>
  );
}
