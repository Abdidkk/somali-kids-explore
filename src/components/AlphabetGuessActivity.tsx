
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { AUDIO_FILES } from "@/constants/alphabetData";
import { speakSomaliLetter } from "@/utils/speechUtils";
import { generateSequence, generateOptions, playSuccessSound } from "@/utils/alphabetGuessUtils";
import ScoreDisplay from "@/components/alphabet/guess/ScoreDisplay";
import QuestionHeader from "@/components/alphabet/guess/QuestionHeader";
import SequenceDisplay from "@/components/alphabet/guess/SequenceDisplay";
import MultipleChoiceAnswer from "@/components/alphabet/guess/MultipleChoiceAnswer";
import ResultFeedback from "@/components/alphabet/guess/ResultFeedback";

interface Props {
  onBack: () => void;
}

export default function AlphabetGuessActivity({ onBack }: Props) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>("alfabetet");
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [result, setResult] = useState<null | "correct" | "wrong">(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Generate a new question based on the active tab
  const generateNewQuestion = () => {
    const { sequence, answer } = generateSequence(activeTab);
    
    setCurrentSequence(sequence);
    setCorrectAnswer(answer);
    setOptions(generateOptions(answer, activeTab));
    setSelectedAnswer("");
    setResult(null);
  };
  
  // Initialize the first question
  useEffect(() => {
    generateNewQuestion();
  }, [activeTab]);
  
  // Reset game state when tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setScore(0);
    setQuestionCount(0);
    setSelectedAnswer("");
    setResult(null);
    setShowCelebration(false);
  };
  
  // Check the answer
  const checkAnswer = () => {
    if (selectedAnswer === correctAnswer) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };
  
  // Handle correct answer
  const handleCorrectAnswer = () => {
    setResult("correct");
    setScore(prev => prev + 1);
    setShowCelebration(true);
    
    playSuccessSound();
    
    // Automatically move to the next question after a delay
    setTimeout(() => {
      setShowCelebration(false);
      setQuestionCount(prev => prev + 1);
      
      // Generate new question
      generateNewQuestion();
    }, 1800);
  };
  
  // Handle wrong answer
  const handleWrongAnswer = () => {
    setResult("wrong");
    
    // Reset after a delay
    setTimeout(() => {
      setResult(null);
      setSelectedAnswer("");
    }, 1500);
  };
  
  // Play letter sound
  const playLetterSound = (letter: string) => {
    speakSomaliLetter(letter, AUDIO_FILES);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-4 relative">
      <ScoreDisplay score={score} />
      
      {/* Tabs for letter groups */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-lg">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alfabetet">Alfabetet</TabsTrigger>
          <TabsTrigger value="korte-vokaler">Korte vokaler</TabsTrigger>
          <TabsTrigger value="lange-vokaler">Lange vokaler</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {/* Question display */}
          <div className="flex flex-col items-center gap-4">
            <QuestionHeader showCelebration={showCelebration} />
            
            <SequenceDisplay 
              sequence={currentSequence}
              activeTab={activeTab}
              onPlaySound={playLetterSound}
            />
          </div>
          
          {/* Multiple choice answers */}
          <MultipleChoiceAnswer
            options={options}
            selectedAnswer={selectedAnswer}
            activeTab={activeTab}
            result={result}
            onAnswerSelect={setSelectedAnswer}
            onPlaySound={playLetterSound}
          />
          
          {/* Submit button */}
          <Button 
            onClick={checkAnswer} 
            disabled={!selectedAnswer || result === "correct"}
            className="px-5 mt-4"
          >
            Indsend svar
          </Button>
          
          {/* Result feedback */}
          <ResultFeedback result={result} showCelebration={showCelebration} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
