import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, User } from "lucide-react";
import { useChildren, type Child } from "@/hooks/useChildren";
import { toast } from "sonner";

interface ChildrenManagerProps {
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

export function ChildrenManager({ onChildSelect, selectedChild }: ChildrenManagerProps) {
  const { children, loading, addChild, deleteChild } = useChildren();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newChildAge, setNewChildAge] = useState("");

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (index: number) => {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
  };

  const handleAddChild = async () => {
    if (!newChildName.trim()) {
      toast.error("Venligst indtast et navn");
      return;
    }

    try {
      const avatarColor = AVATAR_COLORS[children.length % AVATAR_COLORS.length];
      await addChild(
        newChildName.trim(), 
        newChildAge ? parseInt(newChildAge) : undefined,
        avatarColor
      );
      
      setNewChildName("");
      setNewChildAge("");
      setShowAddForm(false);
      toast.success(`${newChildName} er tilføjet!`);
    } catch (error) {
      toast.error("Kunne ikke tilføje barnet");
      console.error('Error adding child:', error);
    }
  };

  const handleDeleteChild = async (child: Child) => {
    try {
      await deleteChild(child.id);
      toast.success(`${child.name} er fjernet`);
    } catch (error) {
      toast.error("Kunne ikke fjerne barnet");
      console.error('Error deleting child:', error);
    }
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
          Administrer dine børns profiler og se deres fremgang
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Ingen børneprofiler oprettet endnu</p>
            <p className="text-sm">Tilføj dit første barn for at komme i gang</p>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChild(child);
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showAddForm ? (
          <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Barnets navn"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => e.key === 'Enter' && handleAddChild()}
              />
              <input
                type="number"
                placeholder="Alder (valgfrit)"
                value={newChildAge}
                onChange={(e) => setNewChildAge(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
                max="18"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddChild} className="flex-1">
                Tilføj barn
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Annuller
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tilføj nyt barn
          </Button>
        )}
      </CardContent>
    </Card>
  );
}