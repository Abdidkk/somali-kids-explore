
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, CheckCircle, XCircle } from "lucide-react";
import { getAllAnimals, AnimalItem } from "@/constants/animalsData";

interface AnimalsGuessActivityProps {
  onBack: () => void;
}

export default function AnimalsGuessActivity({ onBack }: AnimalsGuessActivityProps) {
  const [currentQuestion, setCurrentQuestion] = useState<AnimalItem | null>(null);
  const [options, setOptions] = useState<AnimalItem[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const animals = getAllAnimals();

  const generateQuestion = () => {
    const correctAnimal = animals[Math.floor(Math.random() * animals.length)];
    const wrongAnimals = animals.filter(a => a.id !== correctAnimal.id);
    const shuffledWrong = wrongAnimals.sort(() => 0.5 - Math.random()).slice(0, 2);
    const allOptions = [correctAnimal, ...shuffledWrong].sort(() => 0.5 - Math.random());
    
    setCurrentQuestion(correctAnimal);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const speakAnimal = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "so-SO";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const handleAnswer = (animalId: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(animalId);
    const correct = animalId === currentQuestion?.id;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setQuestionCount(questionCount + 1);
  };

  const nextQuestion = () => {
    if (questionCount >= 10) {
      // Game over
      return;
    }
    generateQuestion();
  };

  const playCurrentAnimal = () => {
    if (currentQuestion) {
      speakAnimal(currentQuestion.somali);
    }
  };

  if (questionCount >= 10) {
    return (
      <div className="flex flex-col items-center space-y-6 p-6">
        <h3 className="text-2xl font-bold text-green-700 mb-4">Godt klaret!</h3>
        <div className="text-center">
          <p className="text-xl mb-4">Du fik {score} ud af 10 rigtige!</p>
          <div className="flex gap-4">
            <Button onClick={() => {
              setScore(0);
              setQuestionCount(0);
              generateQuestion();
            }} className="bg-green-600 hover:bg-green-700">
              Spil igen
            </Button>
            <Button onClick={onBack} variant="outline">
              Tilbage til menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-green-700 mb-4">Hør og vælg</h3>
      
      <div className="text-center mb-4">
        <p className="text-lg mb-2">Spørgsmål {questionCount + 1} af 10</p>
        <p className="text-sm text-gray-600 mb-4">Score: {score}/{questionCount}</p>
      </div>

      <div className="text-center mb-6">
        <p className="text-lg mb-4">Hør det somaliske ord og klik på det rigtige dyr:</p>
        <Button 
          onClick={playCurrentAnimal}
          className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
        >
          <Volume2 className="w-5 h-5" />
          Afspil igen
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {options.map((animal) => (
          <div
            key={animal.id}
            className={`relative bg-white rounded-xl border-2 shadow-lg transition-all cursor-pointer p-4 text-center ${
              selectedAnswer === animal.id
                ? isCorrect && selectedAnswer === animal.id
                  ? "border-green-500 bg-green-50"
                  : selectedAnswer === animal.id && !isCorrect
                  ? "border-red-500 bg-red-50"
                  : "border-green-200"
                : showFeedback && animal.id === currentQuestion?.id
                ? "border-green-500 bg-green-50"
                : "border-green-200 hover:border-green-300"
            }`}
            onClick={() => handleAnswer(animal.id)}
          >
            <div className="w-20 h-20 mx-auto mb-3 bg-green-50 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={animal.image} 
                alt={animal.danish}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="text-sm text-gray-700">{animal.danish}</p>
            
            {showFeedback && selectedAnswer === animal.id && (
              <div className="absolute top-2 right-2">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
            )}
            
            {showFeedback && animal.id === currentQuestion?.id && selectedAnswer !== animal.id && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      {showFeedback && (
        <div className="text-center">
          <p className="text-lg mb-4">
            {isCorrect ? "Rigtigt! 🎉" : "Ikke helt rigtigt. Prøv igen næste gang! 😊"}
          </p>
          <Button 
            onClick={nextQuestion}
            className="bg-green-600 hover:bg-green-700"
          >
            Næste spørgsmål
          </Button>
        </div>
      )}

      <Button onClick={onBack} variant="outline" className="mt-6">
        Tilbage til menu
      </Button>
    </div>
  );
}
