
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Volume2, Star } from "lucide-react";
import { getBodyPartsByCategory, BodyPartItem } from "@/constants/bodyPartsData";

interface KropsdeleGuessActivityProps {
  onBack: () => void;
}

const KropsdeleGuessActivity: React.FC<KropsdeleGuessActivityProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentBodyPart, setCurrentBodyPart] = useState<BodyPartItem | null>(null);
  const [options, setOptions] = useState<BodyPartItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItem, setDroppedItem] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Only use body parts from "kropsdele" category for this game
  const bodyParts = getBodyPartsByCategory("kropsdele");

  const generateQuestion = () => {
    const correctAnswer = bodyParts[Math.floor(Math.random() * bodyParts.length)];
    const wrongAnswers = bodyParts
      .filter(item => item.id !== correctAnswer.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    
    const questionOptions = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());
    
    setCurrentBodyPart(correctAnswer);
    setOptions(questionOptions);
    setDraggedItem(null);
    setDroppedItem(null);
    setShowResult(false);
    setShowSuccess(false);
  };

  const playAudio = (bodyPart: BodyPartItem) => {
    if (bodyPart.audio) {
      const audio = new Audio(bodyPart.audio);
      audio.play().catch(() => {
        // Fallback to speech synthesis
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
      // Fallback til speech synthesis hvis filen ikke findes
      const utterance = new SpeechSynthesisUtterance('Waa sax!');
      utterance.lang = 'so-SO';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    });
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      handleAnswer(draggedItem);
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (draggedItem && dropZoneRef.current) {
      const touch = e.changedTouches[0];
      const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
      
      if (
        touch.clientX >= dropZoneRect.left &&
        touch.clientX <= dropZoneRect.right &&
        touch.clientY >= dropZoneRect.top &&
        touch.clientY <= dropZoneRect.bottom
      ) {
        handleAnswer(draggedItem);
      }
    }
    setDraggedItem(null);
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
      // Auto-advance after showing success animation
      setTimeout(() => {
        generateQuestion();
      }, 2000);
    } else {
      // Show result for wrong answer, then allow retry
      setTimeout(() => {
        setShowResult(false);
        setDroppedItem(null);
      }, 1500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTotalQuestions(0);
    generateQuestion();
  };

  const replayAudio = () => {
    if (currentBodyPart) {
      playAudio(currentBodyPart);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (currentBodyPart) {
      // Auto-play the word when question loads
      const timer = setTimeout(() => {
        playAudio(currentBodyPart);
      }, 1000);
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
            <Volume2 className="w-4 h-4 mr-2" />
            Hør igen
          </Button>
          <Button onClick={resetGame} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-1" />
            Start forfra
          </Button>
        </div>
      </div>

      {currentBodyPart && (
        <div>
          <p className="text-lg mb-6 text-gray-700">
            Træk den rigtige kropsdel til den manglende plads
          </p>
          
          {/* Base Figure with Missing Body Part */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              {/* Base human figure - using a simple placeholder */}
              <div className="w-48 h-64 bg-gradient-to-b from-blue-100 to-blue-50 rounded-full relative border-4 border-blue-200 flex items-center justify-center">
                <div className="text-6xl">👤</div>
                
                {/* Drop Zone - positioned where the body part should be */}
                <div
                  ref={dropZoneRef}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`
                    absolute w-16 h-16 border-4 border-dashed rounded-full flex items-center justify-center
                    transition-all duration-300 z-10
                    ${draggedItem 
                      ? 'border-emerald-400 bg-emerald-50 scale-110' 
                      : 'border-gray-400 bg-white/80'
                    }
                    ${droppedItem 
                      ? isCorrect 
                        ? 'border-green-500 bg-green-100' 
                        : 'border-red-500 bg-red-100'
                      : ''
                    }
                    ${getDropZonePosition(currentBodyPart.id)}
                  `}
                >
                  {droppedItem && (
                    <div className={`transform transition-all duration-500 ${showSuccess ? 'animate-bounce scale-110' : ''}`}>
                      <img
                        src={currentBodyPart.image || "/billeder/placeholder.png"}
                        alt={currentBodyPart.danish}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  )}
                  {!droppedItem && (
                    <div className="text-2xl text-gray-400">?</div>
                  )}
                </div>
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
                <div
                  key={option.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, option.id)}
                  onTouchStart={() => handleTouchStart(option.id)}
                  onTouchEnd={handleTouchEnd}
                  className={`
                    p-4 rounded-lg border-2 cursor-move transition-all transform
                    ${draggedItem === option.id 
                      ? 'scale-105 border-emerald-400 bg-emerald-50 shadow-lg' 
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:scale-105'
                    }
                    ${droppedItem === option.id && !isCorrect 
                      ? 'border-red-400 bg-red-50' 
                      : ''
                    }
                    touch-manipulation select-none
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={option.image || "/billeder/placeholder.png"}
                      alt={option.danish}
                      className="w-16 h-16 object-contain pointer-events-none"
                      draggable={false}
                    />
                    <span className="font-medium text-gray-800 text-sm">
                      {option.danish}
                    </span>
                  </div>
                </div>
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
      )}
    </div>
  );
};

// Helper function to position drop zones based on body part
const getDropZonePosition = (bodyPartId: string): string => {
  const positions = {
    // Face parts
    'eye': 'top-12 left-1/2 transform -translate-x-1/2',
    'nose': 'top-16 left-1/2 transform -translate-x-1/2',
    'mouth': 'top-20 left-1/2 transform -translate-x-1/2',
    'ear': 'top-14 right-4',
    'eyebrow': 'top-10 left-1/2 transform -translate-x-1/2',
    
    // Head parts
    'head': 'top-2 left-1/2 transform -translate-x-1/2',
    'hair': 'top-0 left-1/2 transform -translate-x-1/2',
    'neck': 'top-32 left-1/2 transform -translate-x-1/2',
    
    // Body parts
    'chest': 'top-36 left-1/2 transform -translate-x-1/2',
    'stomach': 'top-44 left-1/2 transform -translate-x-1/2',
    'back': 'top-40 right-2',
    'shoulder': 'top-34 right-8',
    
    // Arms and hands
    'arm': 'top-36 right-2',
    'elbow': 'top-40 right-0',
    'finger': 'top-44 right-4',
    
    // Legs and feet
    'leg': 'bottom-8 left-1/2 transform -translate-x-1/2',
    'knee': 'bottom-16 left-1/2 transform -translate-x-1/2',
    'foot': 'bottom-2 left-1/2 transform -translate-x-1/2',
    'toe': 'bottom-0 left-1/2 transform -translate-x-1/2',
  };
  
  return positions[bodyPartId as keyof typeof positions] || 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
};

export default KropsdeleGuessActivity;
