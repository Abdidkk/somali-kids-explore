
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-600">Om Os</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="border-blue-100 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center gap-4">
            <Info className="h-8 w-8 text-blue-500" />
            <div>
              <CardTitle>Min Mission</CardTitle>
              <CardDescription>Hvad jeg arbejder for</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-lg">
            Jeg arbejder for at bygge en bro mellem dansk og somalisk kultur gennem sproget. Mit mål er at hjælpe somaliske børn i Danmark med at bevare deres modersmål og få en stærk kulturel identitet. Som forældre har vi ofte travlt i hverdagen og kan have svært ved at finde tid og materiale til at lære børnene somalisk. Derfor har jeg skabt Dugsi en platform, hvor børn kan lære sproget på en sjov, visuel og enkel måde, uanset hvor man er.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-blue-100 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center gap-4">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <CardTitle>Om mig</CardTitle>
              <CardDescription>Hvem jeg er</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-lg">
            Jeg står selv bag Dugsi og med passion for sprog, læring og kultur. Som somalier i Danmark ved jeg, hvor vigtigt det er, at børn lærer deres rødder at kende, samtidig med at de bliver integreret. Jeg udvikler alt indhold selv og bygger platformen med børnenes læring i fokus.
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional content */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Min Historie</h2>
        <p className="text-lg mb-8">
        Dugsi startede som en idé i 2022, da jeg så, hvor svært det var for somaliske børn at lære deres sprog gennem sjove og tilgængelige metoder. Jeg besluttede at skabe noget selv – en platform, hvor børn kan lære somalisk på en måde, der er legende, visuel og tilpasset deres hverdag i Danmark.        </p>
        <Button size="lg" className="bg-blue-500 hover:bg-blue-600 transition-colors">
          Læs mere om vores rejse
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
