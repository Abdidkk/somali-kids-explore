import React, { useState } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { USER_GUIDE_DATA, GuideItem } from "@/constants/userGuideData";


interface UserGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const UserGuideModal: React.FC<UserGuideModalProps> = ({ open, onClose }) => {
    const [selectedVideo, setSelectedVideo] = useState<GuideItem | null>(null);
  const isMobile = useIsMobile();

  if (!open) return null;

  const handleBackToMenu = () => {
    setSelectedVideo(null);
  };

  return (
    // SAMME overlay som andre modals
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto py-6 md:py-10">
      {/* SAMME modal container styling */}
      <div className={`bg-white rounded-xl shadow-xl ${isMobile ? 'px-4 py-5' : 'px-7 py-6'} w-full max-w-2xl relative animate-in fade-in-50 my-auto mx-2 md:mx-4`}>
        
        {/* SAMME tilbage-knap styling */}
        <div className="absolute left-2 md:left-4 top-2 md:top-3 z-20">
          <Button 
            onClick={selectedVideo ? handleBackToMenu : onClose} 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-1 ${isMobile ? 'text-xs' : ''}`}
          >
            <ArrowLeft className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            Tilbage
          </Button>
        </div>
        
        {/* SAMME titel styling */}
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-blue-700 mb-3 md:mb-5 text-center pt-3`}>
          📚 Brugsanvisning
        </h2>
        
        {selectedVideo === null ? (
          // Video liste - SAMME knap styling som andre modals
          <div className="flex flex-col gap-4 md:gap-6 py-4 md:py-6 px-3 md:px-4">
            {USER_GUIDE_DATA.map((guide) => (
              <button 
                key={guide.id}
                onClick={() => setSelectedVideo(guide)}
                className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl p-4 md:p-6 transition-all text-left flex items-center gap-4 md:gap-5 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <div className="bg-blue-600 text-white p-3 md:p-4 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <p className={`font-medium text-blue-700 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                  {guide.description}
                </p>
              </button>
            ))}
          </div>
        ) : (
          // Video afspiller
          <div className="py-4">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
            <video
  src={selectedVideo.video}
  className="w-full h-full"
  controls
  autoPlay
/>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Video kommer snart...
                </div>
              )
            </div>
            <p className={`text-center font-medium text-gray-700 ${isMobile ? 'text-lg' : 'text-xl'}`}>
              {selectedVideo.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserGuideModal;


