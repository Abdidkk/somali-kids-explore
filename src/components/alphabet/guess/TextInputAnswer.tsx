
import React from "react";
import { Input } from "@/components/ui/input";

interface TextInputAnswerProps {
  inputAnswer: string;
  result: null | "correct" | "wrong";
  onInputChange: (value: string) => void;
}

export default function TextInputAnswer({ inputAnswer, result, onInputChange }: TextInputAnswerProps) {
  return (
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
          onInputChange(e.target.value);
        }}
        autoFocus
        aria-label="Gæt bogstav"
      />
    </div>
  );
}
