
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import VideoSection from "@/components/landing/VideoSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeatureSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import LanguageSelectionModal, { useLanguageSelection } from "@/components/LanguageSelectionModal";

const Index = () => {
  const { selectedLang, showModal, selectLanguage } = useLanguageSelection();

  return (
    <div className="min-h-screen flex flex-col">
      <LanguageSelectionModal open={showModal} onSelect={selectLanguage} />
      {!showModal && (
        <>
          <HeroSection />
          <VideoSection />
          <FeatureSection />
          <HowItWorksSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
