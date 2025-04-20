
import HeroSection from "@/components/landing/HeroSection";
import VideoSection from "@/components/landing/VideoSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeatureSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <VideoSection />
      <FeatureSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Index;
