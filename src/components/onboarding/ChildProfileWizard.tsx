import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChildren } from "@/hooks/useChildren";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Baby, ArrowRight, Check } from "lucide-react";
import { validateInput } from "@/services/auth/auth.validation";

const avatarColors = [
  'purple', 'blue', 'green', 'orange', 'pink', 'red', 'yellow', 'indigo'
];

export function ChildProfileWizard() {
  const [step, setStep] = useState(1);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [selectedColor, setSelectedColor] = useState("purple");
  const [loading, setLoading] = useState(false);
  
  const { addChild } = useChildren();
  const { refreshUserState } = useAuth();
  const navigate = useNavigate();

  const handleCreateChild = async () => {
    // Enhanced input validation
    const nameValidation = validateInput(childName, 50);
    if (!nameValidation.isValid) {
      toast({
        title: "Fejl",
        description: nameValidation.error || "Ugyldigt navn",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await addChild(
        nameValidation.sanitized, 
        childAge ? parseInt(childAge) : undefined, 
        selectedColor
      );
      
      await refreshUserState();
      
      toast({
        title: "Succes!",
        description: `${childName} er blevet tilføjet!`,
      });
      
      navigate('/congratulations');
    } catch (error) {
      console.error('Error creating child:', error);
      toast({
        title: "Fejl",
        description: "Kunne ikke oprette barnets profil. Prøv igen.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getColorClass = (color: string) => {
    const colorMap = {
      purple: 'bg-purple-500',
      blue: 'bg-blue-500', 
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      pink: 'bg-pink-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      indigo: 'bg-indigo-500'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-purple-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Baby className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Opret dit barns profil
          </h1>
          <p className="text-gray-600">
            Lad os starte med at oprette en profil for dit barn
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                1
              </span>
              Barnets information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="childName">Barnets navn</Label>
              <Input
                id="childName"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="F.eks. Anna eller Mohamed"
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="childAge">Alder (valgfrit)</Label>
              <Input
                id="childAge"
                type="number"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder="F.eks. 5"
                min="1"
                max="12"
                className="text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label>Vælg en avatar farve</Label>
              <div className="grid grid-cols-4 gap-3">
                {avatarColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-16 h-16 rounded-full ${getColorClass(color)} flex items-center justify-center transition-all ${
                      selectedColor === color
                        ? 'ring-4 ring-primary ring-offset-2 scale-110'
                        : 'hover:scale-105'
                    }`}
                  >
                    {selectedColor === color && (
                      <Check className="h-6 w-6 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleCreateChild}
                disabled={loading || !childName.trim()}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg"
              >
                {loading ? (
                  "Opretter profil..."
                ) : (
                  <>
                    Opret profil
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}