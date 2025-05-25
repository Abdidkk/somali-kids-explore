
import React from "react";
import { Volume2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ALPHABET_IMAGES } from "@/constants/alphabetData";

interface MultipleChoiceAnswerProps {
  options: string[];
  selectedAnswer: string;
  activeTab: string;
  result: null | "correct" | "wrong";
  onAnswerSelect: (answer: string) => void;
  onPlaySound: (letter: string) => void;
}

export default function MultipleChoiceAnswer({ 
  options, 
  selectedAnswer, 
  activeTab, 
  result, 
  onAnswerSelect, 
  onPlaySound 
}: MultipleChoiceAnswerProps) {
  return (
    <div className="w-full max-w-md">
      <RadioGroup
        value={selectedAnswer}
        onValueChange={onAnswerSelect}
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
            onClick={() => onAnswerSelect(option)}
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
                onPlaySound(option);
              }}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
