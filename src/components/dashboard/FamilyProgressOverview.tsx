
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Flame, Clock } from "lucide-react";

interface ChildProgress {
  name: string;
  totalPoints: number;
  activitiesCompleted: number;
  streak: number;
  lastActivity: string | null;
  categoryProgress: Record<string, number>;
}

interface FamilyProgressOverviewProps {
  children: ChildProgress[];
  onChildSelect: (childName: string) => void;
}

export default function FamilyProgressOverview({ children, onChildSelect }: FamilyProgressOverviewProps) {
  const totalFamilyPoints = children.reduce((sum, child) => sum + child.totalPoints, 0);
  const totalActivities = children.reduce((sum, child) => sum + child.activitiesCompleted, 0);
  const maxStreak = Math.max(...children.map(child => child.streak), 0);

  return (
    <div className="space-y-6">
      {/* Family Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Familie Point</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFamilyPoints}</div>
            <p className="text-xs text-muted-foreground">Optjent samlet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktiviteter</CardTitle>
            <Star className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActivities}</div>
            <p className="text-xs text-muted-foreground">Gennemført samlet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bedste Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maxStreak}</div>
            <p className="text-xs text-muted-foreground">Dage i træk</p>
          </CardContent>
        </Card>
      </div>

      {/* Individual Child Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Børns Fremgang</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {children.map((child) => (
              <div 
                key={child.name} 
                className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onChildSelect(child.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <span className="capitalize">{child.name}</span>
                    {child.streak > 0 && (
                      <span className="inline-flex items-center bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                        <Flame className="w-3 h-3 mr-1" />
                        {child.streak}
                      </span>
                    )}
                  </h4>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <span>{child.totalPoints} point</span>
                    <Clock className="w-4 h-4" />
                    <span>{child.lastActivity || 'Ingen aktivitet'}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Fremgang</span>
                    <span>{child.activitiesCompleted} aktiviteter</span>
                  </div>
                  <Progress 
                    value={Math.min((child.totalPoints / 100) * 10, 100)} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
