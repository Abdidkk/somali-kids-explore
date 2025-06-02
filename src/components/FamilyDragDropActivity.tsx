
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { familyData } from "@/constants/familyData";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

interface FamilyDragDropActivityProps {
  onBack: () => void;
}

interface DroppedItem {
  id: string;
  item: typeof familyData[0];
  x: number;
  y: number;
}

const FamilyDragDropActivity: React.FC<FamilyDragDropActivityProps> = ({ onBack }) => {
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<typeof familyData[0] | null>(null);
  const isMobile = useIsMobile();

  const familyMembers = familyData.filter(item => item.category === 'family');

  const playApplauseSound = () => {
    const audio = new Audio('/lovable-uploads/2e500a3e-3baa-45e1-a7ba-07e14b919f79.mp3');
    audio.play().catch(error => {
      console.log("Applause sound not available:", error);
    });
  };

  const handleDragStart = (item: typeof familyData[0]) => {
    setDraggedItem(item);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (!draggedItem) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newItem: DroppedItem = {
      id: `${draggedItem.danish}-${Date.now()}`,
      item: draggedItem,
      x: Math.max(0, Math.min(x - 30, rect.width - 60)),
      y: Math.max(0, Math.min(y - 30, rect.height - 60))
    };

    setDroppedItems(prev => [...prev, newItem]);
    setDraggedItem(null);

    // Play applause and show toast when family member is added
    playApplauseSound();
    toast({
      title: "Godt klaret!",
      description: `Du tilføjede ${draggedItem.danish} til din familie!`,
    });
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setDroppedItems([]);
    toast({
      title: "Familie nulstillet",
      description: "Nu kan du bygge din familie igen!",
    });
  };

  const removeItem = (id: string) => {
    setDroppedItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Tilbage
          </Button>
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-pink-700`}>
            Lav din familie
          </h3>
        </div>
        <Button 
          onClick={handleReset} 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 border-pink-300 text-pink-600 hover:bg-pink-50"
        >
          <RotateCcw className="w-4 h-4" />
          Nulstil
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Family Members to Drag */}
        <div className="space-y-4">
          <h4 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-700 mb-3`}>
            Træk familiemedlemmer til huset:
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {familyMembers.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="bg-pink-50 border-2 border-pink-200 rounded-lg p-3 cursor-grab hover:shadow-md transition-all hover:bg-pink-100 active:cursor-grabbing"
              >
                <div className="aspect-square bg-white rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.danish}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className={`text-center font-medium text-gray-800 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {item.danish}
                </p>
                <p className={`text-center text-pink-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {item.somali}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* House Drop Zone */}
        <div className="space-y-4">
          <h4 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-700 mb-3`}>
            Mit hus:
          </h4>
          <div
            className="relative bg-gradient-to-b from-blue-100 to-green-100 border-4 border-dashed border-pink-300 rounded-xl min-h-96 flex items-center justify-center overflow-hidden"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {/* House Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-48 bg-yellow-200 relative">
                {/* House shape */}
                <div className="absolute -top-12 left-0 right-0 h-0 w-0 mx-auto border-l-32 border-r-32 border-b-24 border-l-transparent border-r-transparent border-b-red-500"></div>
                {/* Door */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-20 bg-brown-600 rounded-t-lg"></div>
                {/* Windows */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-blue-300 border-2 border-blue-600"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-300 border-2 border-blue-600"></div>
              </div>
            </div>

            {/* Dropped family members */}
            {droppedItems.map((droppedItem) => (
              <div
                key={droppedItem.id}
                className="absolute cursor-pointer hover:scale-110 transition-transform"
                style={{ left: droppedItem.x, top: droppedItem.y }}
                onClick={() => removeItem(droppedItem.id)}
                title="Klik for at fjerne"
              >
                <div className="w-12 h-12 bg-white rounded-full border-2 border-pink-300 flex items-center justify-center overflow-hidden shadow-lg">
                  <img 
                    src={droppedItem.item.image} 
                    alt={droppedItem.item.danish}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-center text-gray-700 mt-1 bg-white rounded px-1">
                  {droppedItem.item.danish}
                </p>
              </div>
            ))}

            {droppedItems.length === 0 && (
              <div className="text-center text-gray-500 z-10">
                <p className={`${isMobile ? 'text-sm' : 'text-base'} mb-2`}>
                  Træk familiemedlemmer hertil
                </p>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                  for at bygge din familie!
                </p>
              </div>
            )}
          </div>
          
          {droppedItems.length > 0 && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Du har {droppedItems.length} familiemedlem{droppedItems.length !== 1 ? 'mer' : ''} i dit hus!
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Klik på et familiemedlem for at fjerne det
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyDragDropActivity;
