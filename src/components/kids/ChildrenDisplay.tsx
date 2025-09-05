import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChildren } from "@/hooks/useChildren";
import { useSubscription } from "@/hooks/useSubscription";

interface ChildrenDisplayProps {
  onChildSelect?: (childName: string) => void;
  selectedChild?: string;
}

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

export function ChildrenDisplay({ onChildSelect, selectedChild }: ChildrenDisplayProps) {
  const { children, loading } = useChildren();
  const { subscribed, billingInterval } = useSubscription();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (index: number) => {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
  };

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

        <Button
          onClick={() => navigate('/add-children')}
          className="w-full"
          variant="outline"
        >
          <Settings className="h-4 w-4 mr-2" />
          Administrer børneprofiler
          {subscribed && billingInterval && (
            <span className="text-xs text-muted-foreground ml-1">
              (Tilføj 1 barn - {billingInterval === 'year' ? '135 kr./årligt' : '15 kr/måned'})
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}