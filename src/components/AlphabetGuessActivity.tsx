import React, { useState, useEffect } from "react";
import { HelpCircle, Volume2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { GROUPS, ALPHABET_IMAGES, SHORT_VOWELS, LONG_VOWELS, CONSONANTS } from "@/constants/alphabetData";
import { speakSomaliLetter } from "@/utils/speechUtils";
import { AUDIO_FILES } from "@/constants/alphabetData";

interface Props {
  onBack: () => void;
}

// Generate a sequence based on the selected tab
const generateSequence = (activeTab: string): { sequence: string[], answer: string } => {
  let letters: string[] = [];
  
  switch(activeTab) {
    case "korte-vokaler":
      letters = [...SHORT_VOWELS];
      break;
    case "lange-vokaler":
      letters = [...LONG_VOWELS];
      break;
    case "alfabetet":
    default:
      // Select a continuous subset of consonants (3-5 letters)
      const startIdx = Math.floor(Math.random() * (CONSONANTS.length - 5));
      letters = CONSONANTS.slice(startIdx, startIdx + Math.floor(Math.random() * 2) + 3);
      break;
  }
  
  // For the sequence, use all but the last letter
  const sequenceLength = Math.min(letters.length - 1, 3);
  const sequence = letters.slice(0, sequenceLength);
  
  // The answer is the next letter in the sequence
  const answer = letters[sequenceLength];
  
  return { sequence, answer };
};

// Generate multiple choice options based on the active tab
const generateOptions = (correctAnswer: string, activeTab: string): string[] => {
  let allOptions: string[] = [];
  
  switch(activeTab) {
    case "korte-vokaler":
      allOptions = [...SHORT_VOWELS];
      break;
    case "lange-vokaler":
      allOptions = [...LONG_VOWELS];
      break;
    case "alfabetet":
    default:
      // For consonants, include nearby letters in the alphabet
      const idx = CONSONANTS.indexOf(correctAnswer);
      const start = Math.max(0, idx - 4);
      const end = Math.min(CONSONANTS.length, idx + 5);
      allOptions = CONSONANTS.slice(start, end);
      break;
  }
  
  // Exclude the correct answer from the pool (we'll add it back later)
  allOptions = allOptions.filter(letter => letter !== correctAnswer);
  
  // Shuffle the options and take 3 (or fewer if not enough options)
  allOptions = allOptions.sort(() => Math.random() - 0.5).slice(0, 3);
  
  // Add the correct answer and shuffle again
  allOptions.push(correctAnswer);
  return allOptions.sort(() => Math.random() - 0.5);
};

export default function AlphabetGuessActivity({ onBack }: Props) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>("alfabetet");
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [inputAnswer, setInputAnswer] = useState<string>("");
  const [answerMode, setAnswerMode] = useState<"multiple" | "text">("multiple");
  const [result, setResult] = useState<null | "correct" | "wrong">(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Generate a new question based on the active tab
  const generateNewQuestion = () => {
    const { sequence, answer } = generateSequence(activeTab);
    
    setCurrentSequence(sequence);
    setCorrectAnswer(answer);
    setOptions(generateOptions(answer, activeTab));
    setSelectedAnswer("");
    setInputAnswer("");
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
    setInputAnswer("");
    setResult(null);
    setShowCelebration(false);
  };
  
  // Check the answer
  const checkAnswer = () => {
    const userAnswer = answerMode === "multiple" ? selectedAnswer : inputAnswer.trim().toUpperCase();
    
    if (userAnswer === correctAnswer) {
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
    
    // Play success sound - simple browser beep
    const audio = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2ooVoLAIFUz9JpJiqeAJzKvHQCQZzxyPT7HbzgudJbGIoPyMXnHG/QtOAVp0tQxfjTzbPnMskFygDgwAAAQRC/AAO+KbuwAAAAAA");
    audio.play().catch(e => console.error("Audio playback failed:", e));
    
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
      setInputAnswer("");
    }, 1500);
  };
  
  // Play letter sound
  const playLetterSound = (letter: string) => {
    speakSomaliLetter(letter, AUDIO_FILES);
  };
  
  // Toggle between multiple choice and text input
  const toggleAnswerMode = () => {
    setAnswerMode(prev => prev === "multiple" ? "text" : "multiple");
    setSelectedAnswer("");
    setInputAnswer("");
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-4 relative">
      {/* Score display */}
      <div className="absolute top-0 right-2 flex items-center">
        <Star className="w-5 h-5 text-yellow-500 mr-1" />
        <span className="font-semibold text-gray-700">{score}</span>
      </div>
      
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
            <div className="flex flex-col items-center">
              <HelpCircle className={`w-10 h-10 text-purple-700 ${showCelebration ? 'animate-bounce' : ''}`} />
              <div className="font-semibold text-lg text-purple-700 mb-3">
                Hvilket bogstav kommer efter:
              </div>
            </div>
            
            {/* Sequence display - letters with images */}
            <div className="flex items-center gap-2 md:gap-4 justify-center mb-2">
              {currentSequence.map((letter, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center gap-1 relative"
                  onClick={() => playLetterSound(letter)}
                >
                  {ALPHABET_IMAGES[letter] && (
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-purple-50 rounded-lg p-1 border-2 border-purple-200 hover:bg-purple-100 cursor-pointer">
                      <img
                        src={ALPHABET_IMAGES[letter].img}
                        alt={ALPHABET_IMAGES[letter].alt}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Conditionally show text label - hide for alphabet category */}
                      {activeTab !== "alfabetet" && (
                        <div className="absolute -bottom-6 left-0 right-0 text-center font-bold text-purple-700 text-xl">
                          {letter}
                        </div>
                      )}
                    </div>
                  )}
                  {!ALPHABET_IMAGES[letter] && (
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-purple-100 rounded-lg border-2 border-purple-300 hover:bg-purple-200 cursor-pointer">
                      <span className="text-3xl font-bold text-purple-700">{letter}</span>
                    </div>
                  )}
                  {/* Sound icon */}
                  <Volume2 className="w-4 h-4 text-purple-600 absolute -bottom-7 md:-bottom-8 right-0" />
                </div>
              ))}
              
              {/* Question mark for the answer */}
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-yellow-100 rounded-lg border-2 border-yellow-300 animate-pulse">
                <span className="text-3xl font-bold text-yellow-700">?</span>
              </div>
            </div>
          </div>
          
          {/* Answer mode toggle */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleAnswerMode}
            className="text-xs mb-4"
          >
            {answerMode === "multiple" ? "Skift til tekstsvar" : "Skift til multiple choice"}
          </Button>
          
          {/* Multiple choice answers */}
          {answerMode === "multiple" && (
            <div className="w-full max-w-md">
              <RadioGroup
                value={selectedAnswer}
                onValueChange={setSelectedAnswer}
                className="grid grid-cols-2 gap-4"
              >
                {options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`
                      flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer
                      ${selectedAnswer === option ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}
                      ${result === "correct" && selectedAnswer === option ? 'bg-green-100 border-green-500' : ''}
                      ${result === "wrong" && selectedAnswer === option ? 'bg-red-100 border-red-500' : ''}
                    `}
                    onClick={() => setSelectedAnswer(option)}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={option} id={`option-${idx}`} />
                      <div className="flex items-center gap-2">
                        {ALPHABET_IMAGES[option] ? (
                          <img
                            src={ALPHABET_IMAGES[option].img}
                            alt={ALPHABET_IMAGES[option].alt}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : null}
                        {/* Conditionally show text label - hide for alphabet category */}
                        {activeTab !== "alfabetet" && (
                          <span className="text-xl font-semibold">{option}</span>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      type="button"
                      className="h-8 w-8 rounded-full p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        playLetterSound(option);
                      }}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {/* Text input */}
          {answerMode === "text" && (
            <div className="w-full max-w-md">
              <Input
                className={`text-center text-2xl border-2 h-14 ${
                  result === "correct" ? 'border-green-500 bg-green-50' : 
                  result === "wrong" ? 'border-red-500 bg-red-50' : 
                  'border-purple-300'
                }`}
                placeholder="Skriv bogstav her"
                maxLength={3}
                value={inputAnswer}
                onChange={e => {
                  setInputAnswer(e.target.value);
                  setResult(null);
                }}
                autoFocus
                aria-label="Gæt bogstav"
              />
            </div>
          )}
          
          {/* Submit button */}
          <Button 
            onClick={checkAnswer} 
            disabled={
              (answerMode === "multiple" && !selectedAnswer) || 
              (answerMode === "text" && !inputAnswer) || 
              result === "correct"
            }
            className="px-5 mt-4"
          >
            Indsend svar
          </Button>
          
          {/* Result feedback */}
          {result === "correct" && (
            <div className="text-green-600 font-semibold text-xl flex items-center gap-2 mt-4">
              Korrekt! 🎉
              {showCelebration && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
                  <div className="text-7xl animate-bounce">🎉</div>
                </div>
              )}
            </div>
          )}
          {result === "wrong" && (
            <div className="text-red-500 font-semibold text-lg mt-4">
              Prøv igen!
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
