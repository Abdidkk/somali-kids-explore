import { useState } from "react";
import { ArrowRight, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChildren } from "@/hooks/useChildren";

interface SelectActiveChildProps {
  onSelect: (childName: string) => void;
  onSkip?: () => void;
}

export function SelectActiveChild({ onSelect, onSkip }: SelectActiveChildProps) {
  const { children } = useChildren();
  const [selectedChild, setSelectedChild] = useState<string>('');

  const handleContinue = () => {
    if (selectedChild) {
      onSelect(selectedChild);
    }
  };

  if (children.length <= 1) {
    // Auto-select if only one child or none
    if (children.length === 1) {
      onSelect(children[0].name);
    } else if (onSkip) {
      onSkip();
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Vælg aktivt barn
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Vælg hvilket barn der skal lære nu. Du kan altid skifte senere.
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.name)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedChild === child.name
                    ? 'border-primary bg-primary/10 shadow-md'
                    : 'border-border hover:border-primary/50 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl bg-${child.avatar_color}-500`}>
                    {child.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{child.name}</h3>
                    <p className="text-muted-foreground">{child.age} år gammel</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-muted-foreground">Begynder niveau</span>
                    </div>
                  </div>
                  {selectedChild === child.name && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {onSkip && (
              <Button
                variant="outline"
                onClick={onSkip}
                className="flex-1"
              >
                Spring over for nu
              </Button>
            )}
            <Button
              onClick={handleContinue}
              disabled={!selectedChild}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <div className="flex items-center gap-2">
                Fortsæt med {selectedChild || 'valgte barn'}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}