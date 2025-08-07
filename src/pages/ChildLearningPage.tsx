import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useChildren } from "@/hooks/useChildren";
import { toast } from "sonner";

interface LearningModule {
  id: string;
  name: string;
  nameEnglish: string;
  icon: string;
  description: string;
  color: string;
  difficulty: 'let' | 'medium' | 'svær';
  unlocked: boolean;
}

const learningModules: LearningModule[] = [
  {
    id: 'alfabetet',
    name: 'Alfabetet',
    nameEnglish: 'Alphabet',
    icon: '🔤',
    description: 'Lær det somaliske alfabet',
    color: 'bg-blue-500',
    difficulty: 'let',
    unlocked: true
  },
  {
    id: 'tal',
    name: 'Tal',
    nameEnglish: 'Numbers',
    icon: '🔢',
    description: 'Lær at tælle på somalisk',
    color: 'bg-green-500',
    difficulty: 'let',
    unlocked: true
  },
  {
    id: 'farver',
    name: 'Farver',
    nameEnglish: 'Colors',
    icon: '🎨',
    description: 'Lær navnene på farver',
    color: 'bg-purple-500',
    difficulty: 'let',
    unlocked: true
  },
  {
    id: 'dyr',
    name: 'Dyr',
    nameEnglish: 'Animals',
    icon: '🦁',
    description: 'Lær om forskellige dyr',
    color: 'bg-orange-500',
    difficulty: 'medium',
    unlocked: true
  },
  {
    id: 'familie',
    name: 'Familie',
    nameEnglish: 'Family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Lær familietermer',
    color: 'bg-pink-500',
    difficulty: 'medium',
    unlocked: true
  },
  {
    id: 'mad',
    name: 'Mad',
    nameEnglish: 'Food',
    icon: '🍎',
    description: 'Lær navne på mad og måltider',
    color: 'bg-red-500',
    difficulty: 'medium',
    unlocked: true
  }
];

export default function ChildLearningPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { children } = useChildren();
  const [selectedChild, setSelectedChild] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Auto-select first child if only one exists
    if (children.length === 1) {
      setSelectedChild(children[0].name);
    }
  }, [user, navigate, children]);

  const startModule = (moduleId: string) => {
    if (!selectedChild) {
      toast.error("Vælg først et barn");
      return;
    }

    // Navigate to the specific learning category
    navigate(`/laer?child=${encodeURIComponent(selectedChild)}&module=${moduleId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'let':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'svær':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Tilbage til Dashboard
              </Button>
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Læringsmoduler</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Child Selection */}
        {children.length > 1 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Vælg barn</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child.name)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedChild === child.name
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg bg-${child.avatar_color}-500`}>
                    {child.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-medium text-foreground">{child.name}</p>
                  <p className="text-sm text-muted-foreground">{child.age} år</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Child Display */}
        {selectedChild && (
          <div className="mb-8 bg-primary/10 rounded-lg p-4">
            <p className="text-primary font-medium">
              Lærer nu: <span className="font-bold">{selectedChild}</span>
            </p>
          </div>
        )}

        {/* Learning Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningModules.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`h-4 ${module.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{module.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{module.name}</h3>
                    <p className="text-sm text-muted-foreground">{module.nameEnglish}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{module.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-gray-300" />
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>

                <Button
                  onClick={() => startModule(module.id)}
                  disabled={!module.unlocked || !selectedChild}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start læring
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        {selectedChild && (
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {selectedChild}s fremskridt
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Lektioner gennemført</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">485</div>
                <div className="text-sm text-muted-foreground">Point optjent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">7</div>
                <div className="text-sm text-muted-foreground">Dages streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-muted-foreground">Badges optjent</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}