import React, { useState, useEffect } from "react";
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors, useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { Volume2, Star, X } from "lucide-react";
import { getAllAnimals, AnimalItem } from "@/constants/animalsData";
import { toast } from "sonner";

/* ── Sub-components (udenfor main for at undgå hook re-mount) ── */

function DroppableAnimal({ id, className, children }: { id: string; className: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${className} ${isOver ? 'ring-2 ring-blue-400 scale-[1.02]' : ''}`}>
      {children}
    </div>
  );
}

function DraggableWord({ id, className, children }: { id: string; className: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? 'opacity-50 scale-95 shadow-lg z-50' : ''}`}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}

/* ── Main component ── */

interface AnimalsGuessActivityProps {
  onBack: () => void;
}

interface Match {
  animalId: string;
  wordId: string;
  isCorrect: boolean;
}

export default function AnimalsGuessActivity({ onBack }: AnimalsGuessActivityProps) {
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalItem[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const animals = getAllAnimals();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  useEffect(() => {
    const shuffled = [...animals].sort(() => 0.5 - Math.random()).slice(0, 8);
    setSelectedAnimals(shuffled);
    setMatches([]);
    setShowResults(false);
    setScore(0);
    setGameComplete(false);
  }, []);

  const speakAnimal = (audioPath?: string, fallbackText?: string) => {
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch(() => {
        if (fallbackText) {
          const utterance = new SpeechSynthesisUtterance(fallbackText);
          utterance.lang = "so-SO";
          utterance.rate = 0.7;
          speechSynthesis.speak(utterance);
        }
      });
    } else if (fallbackText) {
      const utterance = new SpeechSynthesisUtterance(fallbackText);
      utterance.lang = "so-SO";
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const isAlreadyMatched = (animalId: string): boolean => {
    return matches.some(match => match.animalId === animalId);
  };

  const getMatchedWord = (animalId: string): Match | undefined => {
    return matches.find(match => match.animalId === animalId);
  };

  const createMatch = (wordId: string, animalId: string) => {
    const filteredMatches = matches.filter(
      match => match.wordId !== wordId && match.animalId !== animalId
    );
    const isCorrect = wordId === animalId;
    const newMatch: Match = { animalId, wordId, isCorrect };
    setMatches([...filteredMatches, newMatch]);
  };

  const removeMatch = (animalId: string) => {
    if (showResults) return;
    setMatches(prevMatches =>
      prevMatches.filter(match => match.animalId !== animalId)
    );
    toast.info("Ordet er returneret til listen");
  };

  /* ── @dnd-kit handler ── */
  const handleDragEnd = (event: { active: { id: string | number }; over: { id: string | number } | null }) => {
    if (!event.over) return;
    const wordId = String(event.active.id);
    const animalId = String(event.over.id);
    if (!isAlreadyMatched(animalId)) {
      createMatch(wordId, animalId);
    }
  };

  const checkAnswers = () => {
    if (matches.length !== 8) {
      toast.error("Match alle dyr med deres somaliske navne først!");
      return;
    }
    setShowResults(true);
    const correctMatches = matches.filter(match => match.isCorrect).length;
    setScore(correctMatches);
    if (correctMatches === 8) {
      setGameComplete(true);
      toast.success("🎉 Fantastisk! Alle svar er rigtige!");
      setTimeout(() => {
        const audio = new Audio('/feedback/sifiicanayuusamaysay.mp3');
        audio.play().catch(() => {
          const utterance = new SpeechSynthesisUtterance("Godt klaret!");
          utterance.lang = "da-DK";
          speechSynthesis.speak(utterance);
        });
      }, 500);
    } else {
      toast.info(`Du fik ${correctMatches} ud af 8 rigtige. Prøv igen!`);
    }
  };

  const resetGame = () => {
    const shuffled = [...animals].sort(() => 0.5 - Math.random()).slice(0, 8);
    setSelectedAnimals(shuffled);
    setMatches([]);
    setShowResults(false);
    setScore(0);
    setGameComplete(false);
  };

  const getAvailableWords = () => {
    return selectedAnimals.filter(animal =>
      !matches.some(match => match.wordId === animal.id)
    );
  };

  if (gameComplete) {
    return (
      <div className="flex flex-col items-center space-y-6 p-4 md:p-6">
        <div className="text-center">
          <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
            Perfekt! 🎉
          </h3>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Du matchede alle 8 dyr korrekt!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700 px-6 py-3">
            Spil igen
          </Button>
          <Button onClick={onBack} variant="outline" className="px-6 py-3">
            Tilbage til menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 md:space-y-6 p-2 md:p-4 max-w-6xl mx-auto">
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-2">
          Match dyr med somaliske navne
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          Træk de somaliske ord hen til det rigtige dyr
        </p>
        <p className="text-xs md:text-sm text-gray-500 mb-2">
          Matches: {matches.length}/8
        </p>
        {!showResults && matches.length > 0 && (
          <p className="text-xs text-blue-600">
            💡 Klik på matchede ord for at fjerne dem
          </p>
        )}
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {/* Dyr billeder grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {selectedAnimals.map((animal) => {
            const match = getMatchedWord(animal.id);
            const isMatched = !!match;
            const isCorrect = match?.isCorrect;

            return (
              <DroppableAnimal
                key={animal.id}
                id={animal.id}
                className={`
                  relative bg-white rounded-xl border-2 p-3 md:p-4 text-center transition-all
                  min-h-[120px] md:min-h-[140px] flex flex-col items-center justify-center
                  ${!isMatched ? 'border-gray-200' : ''}
                  ${isMatched && showResults
                    ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                    : ''
                  }
                  ${isMatched && !showResults ? 'border-blue-500 bg-blue-50' : ''}
                `}
              >
                <img
                  src={animal.image}
                  alt={animal.danish}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2 pointer-events-none"
                  draggable={false}
                />
                <p className="text-xs md:text-sm font-medium text-gray-700 mb-1">
                  {animal.danish}
                </p>

                {isMatched && (
                  <div
                    className={`
                      relative text-xs md:text-sm font-bold px-2 py-1 rounded transition-all
                      ${showResults && isCorrect ? 'text-green-700' : ''}
                      ${showResults && !isCorrect ? 'text-red-700' : 'text-blue-700'}
                      ${!showResults ? 'cursor-pointer hover:bg-blue-200 hover:scale-105 group' : ''}
                    `}
                    onClick={() => !showResults && removeMatch(animal.id)}
                    title={!showResults ? "Klik for at fjerne match" : ""}
                  >
                    {selectedAnimals.find(a => a.id === match.wordId)?.somali}
                    {!showResults && (
                      <button
                        className="ml-1 p-0.5 rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMatch(animal.id);
                        }}
                      >
                        <X className="w-3 h-3 text-red-600" />
                      </button>
                    )}
                    {showResults && (
                      <span className="ml-1">{isCorrect ? '✓' : '✗'}</span>
                    )}
                  </div>
                )}

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => speakAnimal(animal.audio, animal.somali)}
                  className="absolute top-1 right-1 w-6 h-6 p-1"
                >
                  <Volume2 className="w-3 h-3" />
                </Button>
              </DroppableAnimal>
            );
          })}
        </div>

        {/* Tilgængelige ord */}
        {!showResults && (
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm md:text-base font-semibold text-gray-700 mb-3 text-center">
              Somaliske navne (træk til det rigtige dyr):
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {getAvailableWords().map((animal) => (
                <DraggableWord
                  key={`word-${animal.id}`}
                  id={animal.id}
                  className="bg-green-100 border-2 border-green-300 rounded-lg px-3 py-2
                    cursor-grab select-none touch-none transition-all
                    text-sm md:text-base font-medium text-green-800
                    hover:bg-green-200 hover:scale-105 active:scale-95"
                >
                  {animal.somali}
                </DraggableWord>
              ))}
            </div>
          </div>
        )}
      </DndContext>

      {/* Tjek svar knap */}
      <div className="text-center space-y-4">
        {!showResults ? (
          <Button
            onClick={checkAnswers}
            disabled={matches.length !== 8}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-base"
          >
            Tjek svar ({matches.length}/8)
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-lg md:text-xl font-semibold mb-2">
                Resultat: {score}/8 rigtige
              </p>
              {score === 8 ? (
                <p className="text-green-600 font-medium">🎉 Perfekt!</p>
              ) : (
                <p className="text-orange-600 font-medium">Prøv igen for at få alle rigtige!</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700 px-6 py-2">
                Spil igen
              </Button>
              <Button onClick={onBack} variant="outline" className="px-6 py-2">
                Tilbage til menu
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
