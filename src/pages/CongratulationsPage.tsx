import { useEffect, useRef, useState } from "react";
import { Sparkles, Trophy, ArrowRight, Baby, BookOpen, Star } from "lucide-react";
import SomaliFlag from "@/components/landing/SomaliFlag";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { useChildren } from "@/hooks/useChildren";
import { ChildProfileWizard } from "@/components/onboarding/ChildProfileWizard";

// Define color scheme
const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))', 
  'hsl(var(--accent))',
  'rgb(239, 68, 68)', // red-500
  'rgb(245, 158, 11)', // amber-500
  'rgb(34, 197, 94)', // green-500
  'rgb(59, 130, 246)', // blue-500
  'rgb(147, 51, 234)', // purple-500
  'rgb(236, 72, 153)', // pink-500
];

const SOUND_SRC = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/success-sound-SwNVFNaHaZLuBH5W7MZz5ixPKOJpJm.mp3";

export default function CongratulationsPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { checkSubscription } = useSubscription();
  const { userState, refreshUserState } = useAuth();
  const { children, loading: childrenLoading } = useChildren();
  const [showWizard, setShowWizard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Try to play the sound when component mounts
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked by browser, that's okay
        console.log("Autoplay blocked - user can click the play button");
      });
    }
    
    // Refresh subscription and user state when this page loads
    checkSubscription();
    refreshUserState();
  }, [checkSubscription, refreshUserState]);

  // Auto-redirect to dashboard after a short celebration if a child profile exists
  useEffect(() => {
    if (children && children.length > 0) {
      const t = setTimeout(() => navigate('/dashboard'), 2000);
      return () => clearTimeout(t);
    }
  }, [children, navigate]);

  const hasChildren = children && children.length > 0;
  
  const nextSteps = [
    {
      icon: Baby,
      title: "Opret barnets profil", 
      description: "Start med at oprette en profil for dit barn",
      completed: hasChildren,
      action: () => setShowWizard(true)
    },
    {
      icon: BookOpen,
      title: "Begynd læring",
      description: "Udforsk læringsmoduler tilpasset dit barn",
      completed: false,
      disabled: !hasChildren
    },
    {
      icon: Star,
      title: "Følg fremskridt",
      description: "Se dit barns fremskridt og bedrifter",
      completed: false,
      disabled: !hasChildren
    }
  ];

  if (showWizard) {
    return <ChildProfileWizard />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-[#e5f0ff] to-[#f8fbff] animate-fade-in px-2 py-10">
      {/* Bannerbillede */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="relative rounded-xl overflow-hidden shadow-xl">
          <img 
            src="/lovable-uploads/bed57f0f-32ee-4a06-8668-fb4be176b5f1.png" 
            alt="Dugsi - Børn på vej til skole" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-center py-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold">Kaalay Dugsiga</h2>
            <p className="text-white text-lg md:text-xl mt-2">Kom ind til skolen</p>
          </div>
        </div>
      </div>
      
      <div className="relative w-full max-w-4xl mx-auto animate-fade-in">
        {/* Kort container */}
        <div className="bg-white/80 rounded-3xl shadow-[0_8px_32px_0_rgba(67,136,245,0.15)] border border-blue-200/20 px-6 md:px-12 py-10 md:py-12 ring-2 ring-blue-300/10 flex flex-col items-center">
          {/* Overskrift: Somali flag, Trophy & Sparkles */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <SomaliFlag className="w-14 h-10 drop-shadow-xl" />
              <Trophy className="w-10 h-10 text-yellow-500 drop-shadow-lg animate-bounce" />
              <span className="relative inline-block">
                <Sparkles className="absolute -top-3 -right-5 text-blue-400 animate-pulse" size={32} />
                <Sparkles className="absolute -bottom-3 -left-5 text-blue-400 animate-pulse" size={32} />
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-3 leading-snug drop-shadow-xl tracking-tight">
              Tillykke! 🎉
            </h1>
          </div>

          {/* Beskrivelse */}
          <h2 className="text-[1.25rem] md:text-2xl font-semibold text-blue-600 mb-8 text-center max-w-2xl mx-auto animate-fade-in">
            Dit barn er nu klar til at lære det somaliske sprog gennem vores side.<br className="hidden md:inline" />
            Vi glæder os til at tage jer med på eventyret sammen!
          </h2>

          {/* Next Steps */}
          <div className="w-full max-w-3xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">
              Næste skridt:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nextSteps.map((step, index) => (
                <div
                  key={index}
                  className={`bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-200/30 transition-all ${
                    step.completed 
                      ? 'bg-green-100/80 border-green-300/50' 
                      : step.disabled 
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-white/80 cursor-pointer hover:shadow-md'
                  }`}
                  onClick={step.action && !step.disabled ? step.action : undefined}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon 
                      className={`h-5 w-5 ${
                        step.completed ? 'text-green-600' : 'text-blue-600'
                      }`} 
                    />
                    <h4 className="font-semibold text-blue-800 text-sm">{step.title}</h4>
                    {step.completed && (
                      <div className="ml-auto bg-green-500 rounded-full p-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-blue-700/80 text-xs">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            {!hasChildren ? (
              <Button 
                onClick={() => setShowWizard(true)}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg shadow-lg"
              >
                <Baby className="mr-2 h-5 w-5" />
                Opret dit barns profil
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg shadow-lg"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Gå til Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/learning">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 text-lg"
                  >
                    <Star className="mr-2 h-5 w-5" />
                    Start læring nu
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Audio player */}
          <audio ref={audioRef} src={SOUND_SRC} preload="auto" className="hidden" />
          <button
            type="button"
            onClick={() => audioRef.current?.play()}
            className="px-4 py-2 rounded bg-blue-500 text-white text-sm font-bold shadow hover:bg-blue-600 transition-colors"
          >
            🔊 Afspil fest lyd
          </button>
        </div>

        {/* Background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[-1] w-full h-full pointer-events-none">
          <div className="absolute -top-20 left-1/3 w-1/2 h-40 rounded-full bg-gradient-to-r from-blue-200/40 via-blue-100/60 to-blue-50/40 blur-2xl opacity-80 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-1/3 h-32 rounded-full bg-gradient-to-br from-blue-100/70 via-blue-50/60 to-blue-200/50 blur-2xl opacity-75 animate-fade-in" />
        </div>
      </div>
    </div>
  );
}