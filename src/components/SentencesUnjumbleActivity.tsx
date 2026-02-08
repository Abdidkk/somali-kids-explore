import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { unjumbleData, UnjumbleItem } from "@/constants/sentencesData";
import { speakUsingSynthesis } from "@/utils/speechUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recordQuizResultAuto } from "@/utils/quizRecorder";

interface SentencesUnjumbleActivityProps {
  onBack: () => void;
  selectedChild?: string;
}

type DifficultyType = 'let' | 'mellem' | 'svær';

const SentencesUnjumbleActivity: React.FC<SentencesUnjumbleActivityProps> = ({ onBack, selectedChild }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<DifficultyType>('let');
  const isMobile = useIsMobile();
  const savedRef = useRef(false);

  const currentQuestions = unjumbleData.filter(item => item.difficulty === difficulty);
  const currentQuestion = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      // Shuffle the words array
      const shuffled = [...currentQuestion.words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSelectedWords([]);
      setShowResult(false);
    }
  }, [currentQuestion]);

  const playCustomAudio = (audioPath?: string, fallbackText?: string) => {
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch((error) => {
        console.error("Custom audio failed:", error);
        if (fallbackText) {
          speakUsingSynthesis(fallbackText);
        }
      });
    } else if (fallbackText) {
      speakUsingSynthesis(fallbackText);
    }
  };

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (showResult) return;

    if (fromAvailable) {
      // Move from available to selected
      setAvailableWords(prev => prev.filter(w => w !== word));
      setSelectedWords(prev => [...prev, word]);
    } else {
      // Move from selected back to available
      setSelectedWords(prev => prev.filter(w => w !== word));
      setAvailableWords(prev => [...prev, word]);
    }
  };

  const handleCheckAnswer = () => {
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(currentQuestion.correct);
    setShowResult(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      playCustomAudio(currentQuestion.audio, currentQuestion.somali);
      toast({
        title: "Perfekt! 🎉",
        description: `${currentQuestion.danish} = ${currentQuestion.somali}`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Ikke helt rigtigt 😊",
        description: "Prøv at arrangere ordene i en anden rækkefølge",
        duration: 3000,
      });
    }
  };

  const handleShowAnswer = () => {
    setSelectedWords([...currentQuestion.correct]);
    setAvailableWords([]);
    setShowResult(true);
    playCustomAudio(currentQuestion.audio, currentQuestion.somali);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz afsluttet
      toast({
        title: "Quiz afsluttet! 🏆",
        description: `Du fik ${score} ud af ${currentQuestions.length} rigtige!`,
        duration: 5000,
      });
      
      // Reset quiz
      setCurrentQuestionIndex(0);
      setScore(0);
      savedRef.current = false;
    }
  };

  // Record quiz result when completed
  useEffect(() => {
    if (currentQuestionIndex >= currentQuestions.length - 1 && showResult && !savedRef.current) {
      savedRef.current = true;
      recordQuizResultAuto({
        category: "Sætninger",
        activityName: `Sætningsarrangering (${difficulty})`,
        correct: score,
        total: currentQuestions.length,
        selectedChild,
      });
    }
  }, [currentQuestionIndex, currentQuestions.length, showResult, score, difficulty, selectedChild]);

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty as DifficultyType);
    setCurrentQuestionIndex(0);
    setScore(0);
    savedRef.current = false;
  };

  const handleReset = () => {
    setSelectedWords([]);
    const shuffled = [...currentQuestion.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setShowResult(false);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  const isComplete = selectedWords.length === currentQuestion?.correct.length;
  const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(currentQuestion?.correct);

  if (!currentQuestion) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Ingen spørgsmål tilgængelige for dette niveau.</p>
        <Button onClick={onBack} variant="outline">Tilbage til menu</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className={`font-bold text-center mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>
        Arranger ordene
      </h3>

      {/* Difficulty Selector */}
      <Tabs value={difficulty} onValueChange={handleDifficultyChange} className="w-full max-w-md mx-auto mb-6">
      <TabsList className="grid w-full grid-cols-3 bg-blue-100 rounded-xl p-1 h-auto">
  <TabsTrigger 
    value="let"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    🟢 Let
  </TabsTrigger>
  <TabsTrigger 
    value="mellem"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    🟡 Mellem
  </TabsTrigger>
  <TabsTrigger 
    value="svær"
    className="rounded-lg py-2.5 px-2 text-sm font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
  >
    🔴 Svær
  </TabsTrigger>
</TabsList>
      </Tabs>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div 
          className="bg-purple-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Question Counter */}
      <p className="text-center text-gray-600 mb-4 text-sm sm:text-base">
        Spørgsmål {currentQuestionIndex + 1} af {currentQuestions.length}
      </p>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-6">
        {/* Image */}
        {currentQuestion.image && (
          <div className="text-center mb-4 md:mb-6">
            <img 
              src={currentQuestion.image} 
              alt={currentQuestion.danish}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto object-cover rounded-lg"
            />
          </div>
        )}

        {/* Danish sentence */}
        <div className="text-center mb-4 md:mb-6">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-2">Oversæt til somalisk:</p>
          <p className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-800">
            {currentQuestion.danish}
          </p>
        </div>

        {/* Selected Words Area */}
        <div className="mb-6">
          <p className="text-purple-600 text-sm sm:text-base md:text-lg mb-3">Din sætning:</p>
          <div className="min-h-16 sm:min-h-20 md:min-h-24 bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl p-3 md:p-4 flex flex-wrap gap-2 items-center">
            {selectedWords.length === 0 ? (
              <p className="text-gray-400 text-center w-full">Træk ord hertil for at bygge sætningen</p>
            ) : (
              selectedWords.map((word, index) => (
                <button
                  key={`selected-${index}`}
                  onClick={() => handleWordClick(word, false)}
                  disabled={showResult}
                  className="bg-purple-200 hover:bg-purple-300 text-purple-800 px-3 py-2 md:px-4 md:py-3 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-colors"
                >
                  {word}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Words */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-3">Tilgængelige ord:</p>
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {availableWords.map((word, index) => (
              <button
                key={`available-${index}`}
                onClick={() => handleWordClick(word, true)}
                disabled={showResult}
                className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-2 md:px-4 md:py-3 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-colors border-2 border-transparent hover:border-blue-300"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-4">
          <Button
            onClick={handleCheckAnswer}
            disabled={!isComplete || showResult}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 md:px-6 md:py-3"
          >
            Tjek svar
          </Button>
          
          <Button
            onClick={handleReset}
            disabled={showResult}
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-50 px-4 py-2 md:px-6 md:py-3"
          >
            Nulstil
          </Button>
          
          <Button
            onClick={handleShowAnswer}
            disabled={showResult}
            variant="outline"
            className="border-orange-300 text-orange-600 hover:bg-orange-50 px-4 py-2 md:px-6 md:py-3"
          >
            Vis svar
          </Button>

          <Button
            onClick={() => playCustomAudio(currentQuestion.audio, currentQuestion.somali)}
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
          >
            🔊 Hør sætningen
          </Button>
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className={`text-center p-4 md:p-6 rounded-xl mb-4 ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {isCorrect ? (
              <div>
                <p className="font-bold text-lg md:text-xl mb-2">Perfekt! 🎉</p>
                <p className="text-sm md:text-base">
                  Korrekt sætning: {currentQuestion.correct.join(' ')}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-lg md:text-xl mb-2">Godt forsøg! 💪</p>
                <p className="text-sm md:text-base">
                  Korrekt sætning: {currentQuestion.correct.join(' ')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        {showResult && (
          <div className="text-center">
            <Button
              onClick={handleNextQuestion}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
            >
              {currentQuestionIndex < currentQuestions.length - 1 ? "Næste spørgsmål" : "Afslut quiz"}
            </Button>
          </div>
        )}
      </div>

      {/* Score Display */}
      <div className="text-center">
        <p className="text-gray-600 text-sm sm:text-base">
          Score: {score} / {currentQuestions.length}
        </p>
      </div>
    </div>
  );
};

export default SentencesUnjumbleActivity;
