import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { sentenceData, SentenceItem } from "@/constants/sentencesData";
import { speakUsingSynthesis } from "@/utils/speechUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recordQuizResultAuto } from "@/utils/quizRecorder";

interface SentencesCompleteActivityProps {
  onBack: () => void;
}

type DifficultyType = 'let' | 'mellem' | 'svær';

const SentencesCompleteActivity: React.FC<SentencesCompleteActivityProps> = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<DifficultyType>('let');
  const isMobile = useIsMobile();

  const currentQuestions = sentenceData.filter(item => item.difficulty === difficulty);
  const currentQuestion = currentQuestions[currentQuestionIndex];

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

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentQuestion.correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
      playCustomAudio(currentQuestion.audio, currentQuestion.somali);
      toast({
        title: "Rigtigt! 🎉",
        description: `${currentQuestion.danish} = ${currentQuestion.somali}`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Ikke helt rigtigt 😊",
        description: `Prøv igen! Det rigtige svar er: ${currentQuestion.correct}`,
        duration: 3000,
      });
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz afsluttet
      const finalCorrect = score + (selectedAnswer === currentQuestion.correct ? 1 : 0);
      await recordQuizResultAuto({
        category: "Sætninger",
        activityName: `Sætninger (${difficulty})`,
        correct: finalCorrect,
        total: currentQuestions.length,
      });

      toast({
        title: "Quiz afsluttet! 🏆",
        description: `Du fik ${finalCorrect} ud af ${currentQuestions.length} rigtige!`,
        duration: 5000,
      });
      
      // Reset quiz
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
    }
  };

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty as DifficultyType);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

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
        Fuldfør sætningen
      </h3>

      {/* Difficulty Selector */}
      <Tabs value={difficulty} onValueChange={handleDifficultyChange} className="w-full max-w-md mx-auto mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="let" className="text-xs sm:text-sm">Let</TabsTrigger>
          <TabsTrigger value="mellem" className="text-xs sm:text-sm">Mellem</TabsTrigger>
          <TabsTrigger value="svær" className="text-xs sm:text-sm">Svær</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div 
          className="bg-green-500 h-3 rounded-full transition-all duration-500"
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
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-2">Dansk:</p>
          <p className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-800">
            {currentQuestion.danish}
          </p>
        </div>

        {/* Incomplete Somali sentence */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-blue-600 text-sm sm:text-base md:text-lg mb-2">Somalisk:</p>
          <p className="font-bold text-xl sm:text-2xl md:text-3xl text-blue-700">
            {currentQuestion.incomplete}
          </p>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
              className={`p-4 md:p-6 rounded-xl border-2 transition-all text-lg md:text-xl font-semibold ${
                selectedAnswer === option
                  ? option === currentQuestion.correct
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-red-100 border-red-500 text-red-700'
                  : showResult && option === currentQuestion.correct
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Audio Button */}
        <div className="text-center mt-6">
          <Button
            onClick={() => playCustomAudio(currentQuestion.audio, currentQuestion.somali)}
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
          >
            🔊 Hør sætningen
          </Button>
        </div>

        {/* Next Button */}
        {showResult && (
          <div className="text-center mt-6">
            <Button
              onClick={handleNextQuestion}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
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

export default SentencesCompleteActivity;
