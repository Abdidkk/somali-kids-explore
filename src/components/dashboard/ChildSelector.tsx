
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";

interface Child {
  name: string;
  totalPoints: number;
  activitiesCompleted: number;
  streak: number;
}

interface ChildSelectorProps {
  children: Child[];
  selectedChild: string;
  onChildSelect: (childName: string) => void;
}

export default function ChildSelector({ children, selectedChild, onChildSelect }: ChildSelectorProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getDisplayName = (name: string) => {
    return name;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">Vælg Barn</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {children.map((child) => (
            <div
              key={child.name}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                selectedChild === child.name 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onChildSelect(child.name)}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    {getInitials(child.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {getDisplayName(child.name)}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {child.streak > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        <Flame className="w-3 h-3 mr-1" />
                        {child.streak}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
