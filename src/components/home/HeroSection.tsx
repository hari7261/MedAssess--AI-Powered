import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Pill } from "lucide-react";
import { HeartPulse, Stethoscope, Tablet, Syringe, Shield, Thermometer } from "lucide-react";  // Importing relevant medical icons

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleViewAssessments = () => {
    navigate("/assessments");
  };

  const handleScrollDown = () => {
    // Smooth scroll to next section
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="relative bg-gradient-to-r from-medical-primary to-medical-dark text-white py-40">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] opacity-30 bg-cover bg-center" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-extrabold sm:text-6xl md:text-7xl mb-6">
          Your Health, Our Priority
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Providing comprehensive healthcare solutions with advanced medical assessments, expert doctors, AI-integrated chatbots, and a network of top hospitals and specialists Health Schemes— all in one place.
        </p>
        <div className="space-x-4 mb-6">
          <Button
            onClick={handleViewAssessments}
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            View Assessments
          </Button>
        </div>
      </div>

      {/* Scroll Down Button */}
      <Button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-medical-accent text-white hover:bg-medical-accent/90 p-4 rounded-full flex items-center justify-center shadow-lg transition-colors"
      >
        <ChevronDown className="w-6 h-6" />
      </Button>

      {/* Medical Icons Moving on the Bottom Right */}
      <div className="absolute bottom-0 right-0 overflow-hidden w-full">
        <div className="flex animate-scroll-icons">
          {/* Duplicating the icons to create seamless continuous scroll */}
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex space-x-12">
              <HeartPulse className="w-10 h-8 text-green-500" />
              <Stethoscope className="w-8 h-8 text-green-500" />
              <HeartPulse className="w-8 h-8 text-green-500" />
              <Pill className="w-8 h-8 text-green-500" />
              <Stethoscope className="w-8 h-8 text-green-500" />
              <HeartPulse className="w-8 h-8 text-green-500" />
              <Tablet className="w-8 h-8 text-green-500" />
              <Syringe className="w-8 h-8 text-green-500" />
              <Shield className="w-8 h-8 text-green-500" />
              <Thermometer className="w-8 h-8 text-green-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Medical Icons Moving on the Top Left (Opposite Direction) */}
      <div className="absolute top-0 left-0 overflow-hidden w-full">
        <div className="flex animate-scroll-icons-reverse">
          {/* Duplicating the icons to create seamless continuous scroll */}
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex space-x-12">
              <HeartPulse className="w-10 h-8 text-green-500" />
              <Stethoscope className="w-8 h-8 text-green-500" />
              <HeartPulse className="w-8 h-8 text-green-500" />
              <Pill className="w-8 h-8 text-green-500" />
              <Stethoscope className="w-8 h-8 text-green-500" />
              <HeartPulse className="w-8 h-8 text-green-500" />
              <Tablet className="w-8 h-8 text-green-500" />
              <Syringe className="w-8 h-8 text-green-500" />
              <Shield className="w-8 h-8 text-green-500" />
              <Thermometer className="w-8 h-8 text-green-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Inline Styles for Animation */}
      <style>{`
        @keyframes scrollIcons {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes scrollIconsReverse {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-scroll-icons {
          display: flex;
          animation: scrollIcons 20s linear infinite;
        }

        .animate-scroll-icons-reverse {
          display: flex;
          animation: scrollIconsReverse 20s linear infinite;
        }

        .animate-scroll-icons > div,
        .animate-scroll-icons-reverse > div {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

