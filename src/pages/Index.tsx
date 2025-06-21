import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServicesSection } from "@/components/home/ServicesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Gallery } from "@/components/home/Gallery";
import { NewsEvents } from "@/components/home/NewsEvents";
import healthAlerts from "@/components/health-alert-popup";

const Index = () => {
  return (
    <>
    {healthAlerts()}
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyChoose />
      <Gallery />
      <NewsEvents />
      <Footer />
    </div></>
  );
};

export default Index;