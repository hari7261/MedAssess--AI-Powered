import { Building2, Stethoscope, Activity, ShieldAlert, Users, MessageCircle, Bot, CalendarHeart, Video} from "lucide-react"; // Add new icons for the new services
import { ServiceCard } from "./ServiceCard";

export const ServicesSection = () => {
  const services = [
    {
      title: "Expert Doctors",
      description: "Connect with over 100+ specialist doctors across India",
      icon: <Stethoscope className="w-8 h-8 text-green-600" />,
      link: "/doctors",
      stats: "100+ Specialists"
    },
    {
      title: "Top Hospitals",
      description: "Access 500+ hospitals nationwide for quality healthcare",
      icon: <Building2 className="w-8 h-8 text-green-600" />,
      link: "/hospitals",
      stats: "500+ Hospitals"
    },
    {
      title: "Health Assessments",
      description: "Comprehensive disease risk assessments and analysis",
      icon: <Activity className="w-8 h-8 text-green-600" />,
      link: "/assessments",
      stats: "8+ Diseases"
    },
    {
      title: "Indian Government Medical Health Schemes",
      description: "Access various government health schemes for affordable medical care.",
      icon: <ShieldAlert className="w-8 h-8 text-green-600" />,
      link: "/GovtHealthSchemes",
      stats: "Multiple Schemes"
    },
    {
      title: "State Government Medical Schemes & Yojna",
      description: "Explore state-specific healthcare schemes and yojnas for better access.",
      icon: <Users className="w-8 h-8 text-green-600" />,
      link: "/StateSchemes",
      stats: "State-Specific Schemes"
    },
    {
      title: "Chat with AI on Your Disease",
      description: "Get instant medical advice with AI-powered disease chat assistant.",
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      link: "/ChatWithAI",
      stats: "24/7 AI Assistance"
    },
    {
      title: "Advanced AI Medical Assistant",
      description: "Comprehensive AI chatbot for all medical queries and information",
      icon: <Bot className="w-8 h-8 text-green-600" />,
      link: "/AdvancedGPT",
      stats: "Smart Medical AI"
    },
    {
      title: "Doctor Appointments (New)",
      description: "Schedule appointments with specialist doctors online",
      icon: <CalendarHeart className="w-8 h-8 text-green-600" />,
      link: "/appointments",
      stats: "Book Appointments"
    },
    {
      title: "Get Insurance",
      description: "Get easily insurance from various insurance provider",
      icon: <Video className="w-8 h-8 text-green-600" />,
      link: "/insurance",
      stats: "New"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-green-50 to-green-100"> {/* Updated background for a medical look */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12"> {/* Updated text color for medical theme */}
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};
