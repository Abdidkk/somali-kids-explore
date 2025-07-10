import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpen, Star } from "lucide-react";
import { BOOKS_DATA, getBooksByCategory } from "@/constants/booksData";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReadBooksActivityProps {
  onBack: () => void;
}

const ReadBooksActivity: React.FC<ReadBooksActivityProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("alle");
  const isMobile = useIsMobile();

  const categories = [
    { id: "alle", name: "Alle bøger", color: "bg-gray-100" },
    { id: "sprog", name: "Sprog", color: "bg-blue-100" },
    { id: "eventyr", name: "Eventyr", color: "bg-purple-100" },
    { id: "læring", name: "Læring", color: "bg-green-100" },
    { id: "historie", name: "Historie", color: "bg-orange-100" }
  ];

  const filteredBooks = selectedCategory === "alle" 
    ? BOOKS_DATA 
    : getBooksByCategory(selectedCategory);

  const handleOpenBook = (fliphtml5Url: string) => {
    window.open(fliphtml5Url, '_blank', 'noopener,noreferrer');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'let': return 'text-green-600 bg-green-100';
      case 'mellem': return 'text-yellow-600 bg-yellow-100';
      case 'svær': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`${isMobile ? 'px-2 py-4' : 'px-6 py-6'} max-w-6xl mx-auto`}>
      <div className="text-center mb-6 md:mb-8">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-blue-700 mb-2`}>
          Læse bøger
        </h2>
        <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600`}>
          Udforsk vores samling af interaktive somaliske bøger
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`${isMobile ? 'text-sm px-3 py-2' : 'px-4 py-2'} ${
              selectedCategory === category.id ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Books Grid */}
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 lg:grid-cols-3 gap-6'}`}>
        {filteredBooks.map((book) => (
          <Card key={book.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader className={`${isMobile ? 'p-4' : 'p-6'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(book.difficulty)}`}>
                  {book.difficulty.charAt(0).toUpperCase() + book.difficulty.slice(1)}
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
              
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-blue-200">
                <BookOpen className="w-12 h-12 text-blue-400" />
              </div>
              
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-blue-700 mb-2`}>
                {book.title}
              </CardTitle>
              <CardDescription className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 mb-2`}>
                {book.description}
              </CardDescription>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Alder:</span> {book.ageGroup}
              </div>
            </CardHeader>
            
            <CardContent className={`${isMobile ? 'px-4 pb-4' : 'px-6 pb-6'} pt-0`}>
              <Button 
                onClick={() => handleOpenBook(book.fliphtml5Url)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Læs bog
                <ExternalLink className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">Ingen bøger fundet</h3>
          <p className="text-gray-500">Prøv at vælge en anden kategori</p>
        </div>
      )}
    </div>
  );
};

export default ReadBooksActivity;
