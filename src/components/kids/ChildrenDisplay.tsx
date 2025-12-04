import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, HelpCircle } from "lucide-react";
import { useChildren } from "@/hooks/useChildren";
import UserGuideModal from "@/components/UserGuideModal";

interface ChildrenDisplayProps {
  onChildSelect?: (childName: string) => void;
  selectedChild?: string;
}

// AVATAR_COLORS skal være UDENFOR komponenten
const AVATAR_COLORS = [
  'bg-purple-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-teal-500'
];

// KUN ÉN export function
export function ChildrenDisplay({ onChildSelect, selectedChild }: ChildrenDisplayProps) {
  // HOOKS først
  const { children, loading } = useChildren();
  const [showGuideModal, setShowGuideModal] = useState(false);

  // HELPER FUNCTIONS
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (index: number) => {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
  };

  // LOADING STATE
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Børneprofiler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Indlæser...</div>
        </CardContent>
      </Card>
    );
  }

  // MAIN RETURN
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Børneprofiler ({children.length})
        </CardTitle>
        <CardDescription>
          Vælg et barn og administrer profiler
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Ingen børneprofiler oprettet endnu</p>
            <p className="text-sm">Administrer børneprofiler for at komme i gang</p>
          </div>
        ) : (
          <div className="space-y-3">
            {children.map((child, index) => (
              <div
                key={child.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                  selectedChild === child.name 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onChildSelect?.(child.name)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={`${getAvatarColor(index)} text-white`}>
                      {getInitials(child.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{child.name}</div>
                    {child.age && (
                      <div className="text-sm text-muted-foreground">{child.age} år</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedChild === child.name && (
                    <Badge variant="secondary">Aktiv</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NY BRUGSANVISNING KNAP - erstatter den gamle "Tilføj ekstra barn" */}
        <Button
          onClick={() => setShowGuideModal(true)}
          className="w-full"
          variant="outline"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Brugsanvisning
        </Button>

        {/* MODAL KOMPONENT */}
        <UserGuideModal 
          open={showGuideModal} 
          onClose={() => setShowGuideModal(false)} 
        />
      </CardContent>
    </Card>
  );
}

