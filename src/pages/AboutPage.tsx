
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Om Os</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Info className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Vores Mission</CardTitle>
              <CardDescription>Hvad vi arbejder for</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-lg">
              Vi arbejder for at skabe en bro mellem dansk og somalisk kultur gennem sprog. Vores mål er at hjælpe somaliske børn i Danmark med at bevare deres modersmål, samtidig med at de bliver integreret i det danske samfund.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Vores Team</CardTitle>
              <CardDescription>Hvem er vi</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-lg">
              Vores team består af pædagoger, lærere og sprogeksperter med dyb forståelse for både dansk og somalisk kultur. Vi kombinerer vores ekspertise for at skabe den bedste læringsoplevelse for børn.
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional content */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Vores Historie</h2>
        <p className="text-lg mb-8">
          Kaalay Dugsiga startede som et lille projekt i 2022, da en gruppe lærere og forældre så et behov for bedre somaliske læringsressourcer til børn i Danmark. I dag er vi vokset til at blive en førende platform for tosprogede familier.
        </p>
        <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
          Læs mere om vores rejse
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
