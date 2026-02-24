import React, { useState, useEffect } from "react";
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors, useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { RotateCcw, Volume2, Star } from "lucide-react";
import { getBodyPartsByCategory, BodyPartItem } from "@/constants/bodyPartsData";

/* ── Sub-components ── */

function DroppableZone({ id, className, children }: { id: string; className: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${className} ${isOver ? 'border-emerald-400 bg-emerald-50 scale-110' : ''}`}>
      {children}
    </div>
  );
}

function DraggableOption({ id, disabled, className, children }: { id: string; disabled: boolean; className: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, disabled });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? 'opacity-50 scale-105 shadow-lg' : ''}`}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}

/* ── Main component ── */

interface KropsdeleGuessActivityProps {
  onBack: () => void;
}

const KropsdeleGuessActivity: React.FC<KropsdeleGuessActivityProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentBodyPart, setCurrentBodyPart] = useState<BodyPartItem | null>(null);
  const [options, setOptions] = useState<BodyPartItem[]>([]);
  const [droppedItem, setDroppedItem] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const bodyParts = getBodyPartsByCategory("kropsdele");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const generateQuestion = () => {
    const correctAnswer = bodyParts[Math.floor(Math.random() * bodyParts.length)];
    const wrongAnswers = bodyParts
      .filter(item => item.id !== correctAnswer.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    const questionOptions = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());
    setCurrentBodyPart(correctAnswer);
    setOptions(questionOptions);
    setDroppedItem(null);
    setShowResult(false);
    setShowSuccess(false);
  };

  const playAudio = (bodyPart: BodyPartItem) => {
    if (bodyPart.audio) {
      const audio = new Audio(bodyPart.audio);
      audio.play().catch(() => {
        const utterance = new SpeechSynthesisUtterance(bodyPart.somali);
        utterance.lang = "so-SO";
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
      });
    } else {
      const utterance = new SpeechSynthesisUtterance(bodyPart.somali);
      utterance.lang = "so-SO";
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const playSuccessSound = () => {
    const audio = new Audio('/feedback/waa-sax.mp3');
    audio.play().catch(() => {
      const utterance = new SpeechSynthesisUtterance('Waa sax!');
      utterance.lang = 'so-SO';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    });
  };

  const playErrorSound = () => {
    const audio = new Audio('/feedback/waa-qalad.mp3');
    audio.play().catch(() => {
      const utterance = new SpeechSynthesisUtterance('Waa qalad!');
      utterance.lang = 'so-SO';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    });
  };

  const handleAnswer = (selectedId: string) => {
    if (showResult || !currentBodyPart) return;
    setDroppedItem(selectedId);
    setShowResult(true);
    setTotalQuestions(prev => prev + 1);
    const correct = selectedId === currentBodyPart.id;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
      setShowSuccess(true);
      playSuccessSound();
      setTimeout(() => generateQuestion(), 2000);
    } else {
      playErrorSound();
      setTimeout(() => {
        setShowResult(false);
        setDroppedItem(null);
      }, 1500);
    }
  };

  const handleDragEnd = (event: { active: { id: string | number }; over: { id: string | number } | null }) => {
    if (!event.over) return;
    if (String(event.over.id) === "body-drop-zone") {
      handleAnswer(String(event.active.id));
    }
  };

  const resetGame = () => {
    setScore(0);
    setTotalQuestions(0);
    generateQuestion();
  };

  const replayAudio = () => {
    if (currentBodyPart) playAudio(currentBodyPart);
  };

  useEffect(() => { generateQuestion(); }, []);

  useEffect(() => {
    if (currentBodyPart) {
      const timer = setTimeout(() => playAudio(currentBodyPart), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentBodyPart]);

  return (
    <div className="max-w-4xl mx-auto p-4 text-center">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-700 mb-2">Manglende kropsdel</h3>
        <p className="text-gray-600 mb-4">Score: {score} / {totalQuestions}</p>
        <div className="flex justify-center gap-4 mb-4">
          <Button onClick={replayAudio} className="bg-emerald-600 hover:bg-emerald-700">
            <Volume2 className="w-4 h-4 mr-2" /> Hør igen
          </Button>
          <Button onClick={resetGame} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-1" /> Start forfra
          </Button>
        </div>
      </div>

      {currentBodyPart && (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div>
            <p className="text-lg mb-6 text-gray-700">
              Træk den rigtige kropsdel til den manglende plads
            </p>

            {/* Base Figure with Drop Zone */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-48 h-64 bg-gradient-to-b from-blue-100 to-blue-50 rounded-full relative border-4 border-blue-200 flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                  <DroppableZone
                    id="body-drop-zone"
                    className={`
                      absolute w-16 h-16 border-4 border-dashed rounded-full flex items-center justify-center
                      transition-all duration-300 z-10
                      ${!droppedItem ? 'border-gray-400 bg-white/80' : ''}
                      ${droppedItem
                        ? isCorrect
                          ? 'border-green-500 bg-green-100'
                          : 'border-red-500 bg-red-100'
                        : ''
                      }
                      ${getDropZonePosition(currentBodyPart.id)}
                    `}
                  >
                    {droppedItem ? (
                      <div className={`transform transition-all duration-500 ${showSuccess ? 'animate-bounce scale-110' : ''}`}>
                        <img
                          src={currentBodyPart.image || "/billeder/placeholder.png"}
                          alt={currentBodyPart.danish}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-2xl text-gray-400">?</div>
                    )}
                  </DroppableZone>
                </div>
              </div>
            </div>

            {/* Success Animation */}
            {showSuccess && (
              <div className="mb-6 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-600 mb-2">
                  <Star className="w-8 h-8 animate-spin" />
                  Waa sax! (Det er rigtigt!)
                  <Star className="w-8 h-8 animate-spin" />
                </div>
                <div className="text-lg text-gray-600">
                  <strong>{currentBodyPart.danish}</strong> = <strong>{currentBodyPart.somali}</strong>
                </div>
              </div>
            )}

            {/* Options - Draggable Body Parts */}
            {!showSuccess && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
                {options.map((option) => (
                  <DraggableOption
                    key={option.id}
                    id={option.id}
                    disabled={showResult}
                    className={`
                      p-4 rounded-lg border-2 cursor-grab transition-all transform touch-none select-none
                      ${droppedItem === option.id && !isCorrect
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:scale-105'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={option.image || "/billeder/placeholder.png"}
                        alt={option.danish}
                        className="w-16 h-16 object-contain pointer-events-none"
                        draggable={false}
                      />
                      <span className="font-medium text-gray-800 text-sm">{option.danish}</span>
                    </div>
                  </DraggableOption>
                ))}
              </div>
            )}

            {/* Wrong Answer Feedback */}
            {showResult && !isCorrect && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
                <p className="text-red-600 font-semibold mb-2">Prøv igen! 😔</p>
                <p className="text-gray-600">
                  Det rigtige svar er: <strong>{currentBodyPart.danish}</strong> ({currentBodyPart.somali})
                </p>
              </div>
            )}
          </div>
        </DndContext>
      )}
    </div>
  );
};

const getDropZonePosition = (bodyPartId: string): string => {
  const positions: Record<string, string> = {
    'eye': 'top-12 left-1/2 transform -translate-x-1/2',
    'nose': 'top-16 left-1/2 transform -translate-x-1/2',
    'mouth': 'top-20 left-1/2 transform -translate-x-1/2',
    'ear': 'top-14 right-4',
    'eyebrow': 'top-10 left-1/2 transform -translate-x-1/2',
    'head': 'top-2 left-1/2 transform -translate-x-1/2',
    'hair': 'top-0 left-1/2 transform -translate-x-1/2',
    'neck': 'top-32 left-1/2 transform -translate-x-1/2',
    'chest': 'top-36 left-1/2 transform -translate-x-1/2',
    'stomach': 'top-44 left-1/2 transform -translate-x-1/2',
    'back': 'top-40 right-2',
    'shoulder': 'top-34 right-8',
    'arm': 'top-36 right-2',
    'elbow': 'top-40 right-0',
    'finger': 'top-44 right-4',
    'leg': 'bottom-8 left-1/2 transform -translate-x-1/2',
    'knee': 'bottom-16 left-1/2 transform -translate-x-1/2',
    'foot': 'bottom-2 left-1/2 transform -translate-x-1/2',
    'toe': 'bottom-0 left-1/2 transform -translate-x-1/2',
  };
  return positions[bodyPartId] || 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
};

export default KropsdeleGuessActivity;

