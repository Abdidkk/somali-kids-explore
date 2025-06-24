import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { familyData, getFamilyByCategory } from "@/constants/familyData";
import { speakUsingSynthesis } from "@/utils/speechUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

interface FamilyDragDropActivityProps {
  onBack: () => void;
}

interface DroppedMember {
  id: string;
  danish: string;
  somali: string;
  position: { x: number; y: number };
  audio?: string;
}

const FamilyDragDropActivity: React.FC<FamilyDragDropActivityProps> = ({ onBack }) => {
  const [droppedMembers, setDroppedMembers] = useState<DroppedMember[]>([]);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const isMobile = useIsMobile();

  const familyMembers = getFamilyByCategory('Familie');

  const playApplauseSound = () => {
    try {
      const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Fallback if audio fails to load
        console.log("Applause sound played!");
      });
    } catch (error) {
      console.log("Applause sound played!");
    }
  };

  const playCustomAudio = (audioPath?: string, fallbackText?: string) => {
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch((error) => {
        console.error("Custom audio failed:", error);
        // Fallback to speech synthesis
        if (fallbackText) {
          speakUsingSynthesis(fallbackText);
        }
      });
    } else if (fallbackText) {
      speakUsingSynthesis(fallbackText);
    }
  };

  const handleDragStart = (item: any) => {
    setDraggedItem(item);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (!draggedItem) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if this family member is already placed
    const isAlreadyPlaced = droppedMembers.some(member => member.danish === draggedItem.danish);
    
    if (!isAlreadyPlaced) {
      const newMember: DroppedMember = {
        id: `${draggedItem.danish}-${Date.now()}`,
        danish: draggedItem.danish,
        somali: draggedItem.somali,
        audio: draggedItem.audio,
        position: { x: Math.max(0, Math.min(x - 30, rect.width - 60)), y: Math.max(0, Math.min(y - 30, rect.height - 60)) }
      };

      setDroppedMembers(prev => [...prev, newMember]);
      playCustomAudio(draggedItem.audio, draggedItem.somali);
      
      toast({
        title: "Godt arbejde!",
        description: `Du tilføjede ${draggedItem.danish} til familien`,
        duration: 2000,
      });
    }

    setDraggedItem(null);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleMemberClick = (member: DroppedMember) => {
    playCustomAudio(member.audio, member.somali);
  };

  const handleClearFamily = () => {
    setDroppedMembers([]);
    toast({
      title: "Familie ryddet",
      description: "Du kan nu bygge en ny familie",
      duration: 2000,
    });
  };

  const handleCompletedFamily = () => {
    if (droppedMembers.length >= 3) {
      playApplauseSound();
      toast({
        title: "Fantastisk!",
        description: "Du har bygget en smuk familie!",
        duration: 3000,
      });
    } else {
      toast({
        title: "Tilføj flere medlemmer",
        description: "Prøv at tilføje flere familiemedlemmer",
        duration: 2000,
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-4 md:mb-6">
        <h3 className={`font-bold text-center mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>
          Byg din familie - træk familiemedlemmer til huset
        </h3>
        
        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4">
          <Button 
            onClick={handleClearFamily} 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
          >
            Ryd familie
          </Button>
          <Button 
            onClick={handleCompletedFamily} 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
          >
            Min familie er færdig!
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Family Members Toolbar */}
        <div className="lg:col-span-4">
          <h4 className={`font-semibold mb-3 text-center ${isMobile ? 'text-base' : 'text-lg'}`}>
            Familiemedlemmer
          </h4>
          <div className="grid grid-cols-2 gap-2 md:gap-3 max-h-96 overflow-y-auto">
            {familyMembers.map((member, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(member)}
                className="bg-white rounded-lg p-3 md:p-4 shadow-md hover:shadow-lg transition-all cursor-move border-2 border-transparent hover:border-blue-200"
              >
                <div className="w-full h-16 md:h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg mb-2 flex items-center justify-center">
                  <span className={`${isMobile ? 'text-lg' : 'text-2xl'}`}>👨‍👩‍👧‍👦</span>
                </div>
                <h5 className={`font-bold text-gray-800 text-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {member.danish}
                </h5>
                <p className={`text-blue-600 font-semibold text-center ${isMobile ? 'text-xs' : 'text-xs'}`}>
                  {member.somali}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* House Drop Zone */}
        <div className="lg:col-span-8">
          <h4 className={`font-semibold mb-3 text-center ${isMobile ? 'text-base' : 'text-lg'}`}>
            Mit hjem
          </h4>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="relative w-full h-80 md:h-96 bg-gradient-to-b from-sky-200 to-green-200 rounded-xl border-4 border-dashed border-blue-300 flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `
                linear-gradient(to bottom, #bae6fd 0%, #bae6fd 60%, #bbf7d0 60%, #bbf7d0 100%),
                url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 20 L180 80 L180 180 L20 180 L20 80 Z' fill='%23fbbf24' stroke='%23f59e0b' stroke-width='3'/%3E%3Cpath d='M100 20 L180 80 L160 80 L100 40 L40 80 L20 80 Z' fill='%23dc2626'/%3E%3Crect x='80' y='120' width='40' height='60' fill='%23365314'/%3E%3Ccircle cx='85' cy='150' r='3' fill='%23fbbf24'/%3E%3C/svg%3E")
              `,
              backgroundSize: 'contain, 200px 150px',
              backgroundPosition: 'center, center bottom',
              backgroundRepeat: 'no-repeat, no-repeat'
            }}
          >
            {droppedMembers.length === 0 && (
              <div className="text-center text-gray-600 bg-white/80 rounded-lg p-4">
                <p className={`${isMobile ? 'text-sm' : 'text-base'}`}>
                  Træk familiemedlemmer hertil for at bygge din familie
                </p>
              </div>
            )}

            {/* Dropped family members */}
            {droppedMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => handleMemberClick(member)}
                className="absolute cursor-pointer transform hover:scale-110 transition-transform"
                style={{
                  left: member.position.x,
                  top: member.position.y,
                }}
              >
                <div className="bg-white rounded-full p-2 md:p-3 shadow-lg border-2 border-blue-200">
                  <span className={`${isMobile ? 'text-lg' : 'text-2xl'}`}>👨‍👩‍👧‍👦</span>
                </div>
                <div className="text-center mt-1 bg-white/90 rounded px-1">
                  <p className={`font-bold text-gray-800 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                    {member.danish}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <p className={`text-center text-gray-600 mt-3 ${isMobile ? 'text-sm' : 'text-base'}`}>
            Klik på familiemedlemmer i huset for at høre deres navne på somalisk
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilyDragDropActivity;
