import React, { useState } from "react";
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors, useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { familyData, getFamilyByCategory } from "@/constants/familyData";
import { speakUsingSynthesis } from "@/utils/speechUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

/* ── Sub-components (udenfor main for at undgå hook re-mount) ── */

function DroppableHouse({ id, className, style, children }: { id: string; className: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${className} ${isOver ? 'ring-4 ring-blue-400 bg-blue-50/30' : ''}`} style={style}>
      {children}
    </div>
  );
}

function DraggableFamily({ id, disabled, className, children }: { id: string; disabled: boolean; className: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, disabled });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? 'opacity-50 scale-95 shadow-lg z-50' : ''}`}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}

/* ── Main component ── */

interface FamilyDragDropActivityProps {
  onBack: () => void;
}

interface DroppedMember {
  id: string;
  danish: string;
  somali: string;
  position: { x: number; y: number };
  audio?: string;
  image?: string;
}

const FamilyDragDropActivity: React.FC<FamilyDragDropActivityProps> = ({ onBack }) => {
  const [droppedMembers, setDroppedMembers] = useState<DroppedMember[]>([]);
  const isMobile = useIsMobile();

  const familyMembers = getFamilyByCategory('Familie');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const playApplauseSound = () => {
    try {
      const audio = new Audio('/feedback/qoys.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {
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
        if (fallbackText) {
          speakUsingSynthesis(fallbackText);
        }
      });
    } else if (fallbackText) {
      speakUsingSynthesis(fallbackText);
    }
  };

  const handleDragEnd = (event: any) => {
    if (!event.over) return;
    if (String(event.over.id) !== "family-house") return;

    const draggedId = String(event.active.id);
    const member = familyMembers.find(m => m.danish === draggedId);
    if (!member) return;

    const isAlreadyPlaced = droppedMembers.some(m => m.danish === member.danish);
    if (isAlreadyPlaced) return;

    // Tilfældig position inden for hus-zonen
    const memberSize = isMobile ? 40 : 60;
    const maxX = isMobile ? 200 : 400;
    const maxY = isMobile ? 180 : 300;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    const newMember: DroppedMember = {
      id: `${member.danish}-${Date.now()}`,
      danish: member.danish,
      somali: member.somali,
      audio: member.audio,
      image: member.image,
      position: {
        x: Math.max(0, Math.min(x, maxX - memberSize)),
        y: Math.max(0, Math.min(y, maxY - memberSize))
      }
    };

    setDroppedMembers(prev => [...prev, newMember]);
    playCustomAudio(member.audio, member.somali);

    toast({
      title: "Godt arbejde!",
      description: `Du tilføjede ${member.danish} til familien`,
      duration: 2000,
    });
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
    <div className="w-full max-w-6xl mx-auto p-2 sm:p-4">
      <div className="mb-4 md:mb-6">
        <h3 className={`font-bold text-center mb-4 ${isMobile ? 'text-base' : 'text-xl'}`}>
          Byg din familie - træk familiemedlemmer til huset
        </h3>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4">
          <Button
            onClick={handleClearFamily}
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 text-xs sm:text-sm"
          >
            Ryd familie
          </Button>
          <Button
            onClick={handleCompletedFamily}
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200 text-xs sm:text-sm"
          >
            Min familie er færdig!
          </Button>
        </div>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 md:gap-6">
          {/* Family Members Toolbar */}
          <div className="lg:col-span-4">
            <h4 className={`font-semibold mb-3 text-center ${isMobile ? 'text-sm' : 'text-lg'}`}>
              Familiemedlemmer
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 sm:gap-2 md:gap-3 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto">
              {familyMembers.map((member, index) => {
                const isPlaced = droppedMembers.some(m => m.danish === member.danish);
                return (
                  <DraggableFamily
                    key={index}
                    id={member.danish}
                    disabled={isPlaced}
                    className={`bg-white rounded-lg p-2 sm:p-3 md:p-4 shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-200 touch-none select-none ${
                      isPlaced ? 'opacity-30 cursor-not-allowed' : 'cursor-grab'
                    }`}
                  >
                    <div className="w-full h-12 sm:h-16 md:h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg mb-1 sm:mb-2 flex items-center justify-center overflow-hidden">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.danish}
                          className="w-24 h-24 object-fill object-center rounded-lg pointer-events-none"
                          draggable={false}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <span className={`${isMobile ? 'text-sm' : 'text-2xl'}`}>👨‍👩‍👧‍👦</span>
                      )}
                    </div>
                    <p className="text-blue-600 font-semibold text-center text-xs leading-tight">
                      {member.somali}
                    </p>
                  </DraggableFamily>
                );
              })}
            </div>
          </div>

          {/* House Drop Zone */}
          <div className="lg:col-span-8">
            <h4 className={`font-semibold mb-3 text-center ${isMobile ? 'text-sm' : 'text-lg'}`}>
              Mit hjem
            </h4>
            <DroppableHouse
              id="family-house"
              className="relative w-full h-64 sm:h-80 md:h-96 bg-gradient-to-b from-sky-200 to-green-200 rounded-xl border-4 border-dashed border-blue-300 flex items-center justify-center overflow-hidden transition-all"
              style={{
                backgroundImage: `
                  linear-gradient(to bottom, #bae6fd 0%, #bae6fd 60%, #bbf7d0 60%, #bbf7d0 100%),
                  url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 20 L180 80 L180 180 L20 180 L20 80 Z' fill='%23fbbf24' stroke='%23f59e0b' stroke-width='3'/%3E%3Cpath d='M100 20 L180 80 L160 80 L100 40 L40 80 L20 80 Z' fill='%23dc2626'/%3E%3Crect x='80' y='120' width='40' height='60' fill='%23365314'/%3E%3Ccircle cx='85' cy='150' r='3' fill='%23fbbf24'/%3E%3C/svg%3E")
                `,
                backgroundSize: isMobile ? 'contain, 120px 100px' : 'contain, 200px 150px',
                backgroundPosition: 'center, center bottom',
                backgroundRepeat: 'no-repeat, no-repeat'
              }}
            >
              {droppedMembers.length === 0 && (
                <div className="text-center text-gray-600 bg-white/80 rounded-lg p-2 sm:p-4 mx-2">
                  <p className="text-xs sm:text-sm md:text-base">
                    Træk familiemedlemmer hertil for at bygge din familie
                  </p>
                </div>
              )}

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
                  <div className={`bg-white rounded-full shadow-lg border-2 border-blue-200 flex items-center justify-center overflow-hidden ${
                    isMobile
                      ? 'w-10 h-10 p-1'
                      : 'w-12 h-12 p-2 sm:w-14 sm:h-14 md:w-16 md:h-16 md:p-3'
                  }`}>
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.danish}
                        className="w-full h-full object-fit object-center rounded-full"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <span className={`${isMobile ? 'text-xs' : 'text-sm sm:text-base md:text-lg'}`}>👨‍👩‍👧‍👦</span>
                    )}
                  </div>
                  <div className="text-center mt-1 bg-white/90 rounded px-1 max-w-16 sm:max-w-20">
                    <p className="font-bold text-gray-800 text-xs leading-tight truncate">
                      {member.somali}
                    </p>
                  </div>
                </div>
              ))}
            </DroppableHouse>

            <p className="text-center text-gray-600 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base px-2">
              Klik på familiemedlemmer i huset for at høre deres navne på somalisk
            </p>
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default FamilyDragDropActivity;
