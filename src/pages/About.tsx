import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Users,
  MapPin,
  FileText,
  MessageSquare,
  Shield,
  BookOpen,
  ChartLine,
  Award,
} from "lucide-react";
import { HeroSection } from "@/components/ui/hero-section";
import React from "react";

const About = () => {
  const sections = React.useMemo(
    () => [
      {
        icon: <Heart />,
        title: "Transforming Healthcare Through Technology",
        description:
          "We are dedicated to empowering individuals with innovative tools for early disease detection and health management.",
        image:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&auto=format&dpr=2",
      },
      {
        icon: <ChartLine />,
        title: "Comprehensive Medical Assessments",
        description:
          "Our platform offers detailed health risk assessments for various diseases, helping you stay informed about your health.",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&auto=format&dpr=2",
      },
      {
        icon: <MapPin />,
        title: "India's Largest Healthcare Network",
        description:
          "Connect with specialist doctors and hospitals nationwide for the best healthcare experience.",
        image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop&auto=format&dpr=2",
      },
      {
        icon: <FileText />,
        title: "Personalized Health Reports",
        description:
          "Get detailed reports with actionable insights for better health management.",
        image:
          "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop&auto=format&dpr=2",
      },
      {
        icon: <MessageSquare />,
        title: "AI-Powered Healthcare Chatbot",
        description:
          "24/7 support with our interactive healthcare chatbot for immediate assistance.",
        image:
          "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=250&fit=crop&auto=format&dpr=2",
      },
      {
        icon: <Shield />,
        title: "Preventive Healthcare",
        description:
          "Focus on early detection and prevention for better health outcomes.",
        image:
          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=250&fit=crop&auto=format&dpr=2",
      },
      {
        icon: <BookOpen />,
        title: "Empowering Through Information",
        description:
          "Access comprehensive health education and reliable guidance.",
        image:
          "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&h=250&fit=crop&auto=format&dpr=2",
      },
      {
        icon: <Users />,
        title: "High-Impact Healthcare",
        description:
          "Making quality healthcare accessible across India through innovation.",
        image:
          "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?w=400&h=250&fit=crop&auto=format&dpr=2",
      },
      {
        icon: <Award />,
        title: "Excellence in Healthcare",
        description:
          "Committed to delivering the highest standards of medical care and patient satisfaction.",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop&auto=format&dpr=2",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection
        title="About Us"
        description="Empowering Healthcare Through Innovation"
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
      />
      {/* About Summary Section */}
      <div className="bg-white py-12 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-medical-primary sm:text-4xl">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            At MedAssess, we aim to revolutionize healthcare by leveraging the
            power of technology to provide accessible, affordable, and
            innovative solutions. From early disease detection to preventive
            care, we empower individuals and communities with tools and
            resources to achieve better health outcomes.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-md transition-shadow duration-200 rounded-xl bg-white border"
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
                loading="lazy"
              />
              <div className="flex items-center justify-center mb-4">
                <div className="text-medical-primary">{section.icon}</div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 text-center">{section.description}</p>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
