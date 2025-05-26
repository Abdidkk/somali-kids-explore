
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { COLORS_DATA } from "@/constants/colorsData";

interface ColorsMemoryGameProps {
  onBack: () => void;
}

interface Card {
  id: number;
  colorData: typeof COLORS_DATA[0];
  isFlipped: boolean;
  isMatched: boolean;
}

export default function ColorsMemoryGame({ onBack }: ColorsMemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    // Create pairs of cards (6 colors, 12 cards total)
    const selectedColors = COLORS_DATA.slice(0, 6);
    const cardPairs = selectedColors.flatMap((color, index) => [
      { id: index * 2, colorData: color, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, colorData: color, isFlipped: false, isMatched: false },
    ]);
    
    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const flipCard = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find(c => c.id === cardId)?.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlippedCards;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard?.colorData.name === secondCard?.colorData.name) {
        // Match found
        setCards(prev => prev.map(card => 
          card.id === first || card.id === second 
            ? { ...card, isMatched: true }
            : card
        ));
        setMatches(matches + 1);
        setFlippedCards([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const selectedColors = COLORS_DATA.slice(0, 6);
    const cardPairs = selectedColors.flatMap((color, index) => [
      { id: index * 2, colorData: color, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, colorData: color, isFlipped: false, isMatched: false },
    ]);
    
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
  };

  const isGameComplete = matches === 6;

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-pink-700 mb-4">Farve Hukommelsesspil</h3>
      
      <div className="flex gap-4 text-lg">
        <span>Træk: {moves}</span>
        <span>Matches: {matches}/6</span>
      </div>

      {isGameComplete && (
        <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
          <h4 className="text-xl font-bold text-green-700 mb-2">Tillykke! 🎉</h4>
          <p>Du klarede spillet på {moves} træk!</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 max-w-md">
        {cards.map((card) => {
          const isFlipped = flippedCards.includes(card.id) || card.isMatched;
          
          return (
            <button
              key={card.id}
              onClick={() => flipCard(card.id)}
              className="w-16 h-16 rounded-lg border-2 border-pink-300 transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: isFlipped ? card.colorData.hex : '#fce7f3',
                opacity: card.isMatched ? 0.7 : 1,
              }}
              disabled={isGameComplete}
            >
              {isFlipped && (
                <span className="text-xs font-bold text-white drop-shadow-lg">
                  {card.colorData.danish}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <Button onClick={resetGame} variant="outline" className="border-pink-300 text-pink-700">
          Nyt spil
        </Button>
        <Button onClick={onBack} className="bg-pink-600 hover:bg-pink-700">
          Tilbage til menu
        </Button>
      </div>
    </div>
  );
}
