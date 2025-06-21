import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, 
  Activity, 
  Heart, 
  Microscope, 
  Database, 
  Shield, 
  Users, 
  Hospital, 
  Stethoscope,
  Bot,
  Code,
  Server
} from "lucide-react";

const Overview = () => {
  const mlFeatures = [
    {
      title: "TensorFlow.js Integration",
      description: "Client-side ML processing for real-time health assessments using converted Python models",
      icon: <Brain className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Advanced Data Processing",
      description: "Sophisticated preprocessing pipeline for medical data analysis",
      icon: <Database className="w-8 h-8 text-green-500" />
    },
    {
      title: "Neural Networks",
      description: "Deep learning models for accurate disease prediction and risk assessment",
      icon: <Activity className="w-8 h-8 text-purple-500" />
    },
    {
      title: "Biomarker Analysis",
      description: "Advanced pattern recognition in medical indicators and symptoms",
      icon: <Microscope className="w-8 h-8 text-red-500" />
    }
  ];

  const technicalFeatures = [
    {
      title: "Real-time Processing",
      description: "Instant health assessments using TensorFlow.js",
      icon: <Server className="w-8 h-8 text-indigo-500" />
    },
    {
      title: "Secure Data Handling",
      description: "End-to-end encryption for sensitive medical information",
      icon: <Shield className="w-8 h-8 text-yellow-500" />
    },
    {
      title: "AI-Powered Chat",
      description: "Intelligent chatbot for medical guidance and support",
      icon: <Bot className="w-8 h-8 text-cyan-500" />
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive health data visualization and tracking",
      icon: <Code className="w-8 h-8 text-pink-500" />
    }
  ];

  const healthcareFeatures = [
    {
      title: "Expert Network",
      description: "Access to 100+ specialized healthcare professionals",
      icon: <Stethoscope className="w-8 h-8 text-emerald-500" />
    },
    {
      title: "Hospital Integration",
      description: "Connected with 500+ hospitals across India",
      icon: <Hospital className="w-8 h-8 text-orange-500" />
    },
    {
      title: "Community Impact",
      description: "Serving millions of users across rural and urban India",
      icon: <Users className="w-8 h-8 text-rose-500" />
    },
    {
      title: "Heart Health",
      description: "Advanced cardiovascular risk assessment",
      icon: <Heart className="w-8 h-8 text-red-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section with improved contrast */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/futuristic-technological-wallpaper_79603-1093.jpg?w=1380&t=st=1709984554~exp=1709985154~hmac=9c3b337c9c20c1d47e7707f0c0c6e7f9b4b751f4a89433c8d2d8c6bb0ae6f0f8')] bg-cover bg-center opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-medical-primary to-medical-secondary">
              MedAssess: The Future of Healthcare
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              An AI-powered healthcare platform revolutionizing medical assessments and healthcare access across India
            </p>
          </div>

          {/* Tech Stack Badges with improved visibility */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["React", "TypeScript", "TensorFlow.js", "Python ML", "Supabase", "Tailwind CSS"].map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="px-4 py-2 bg-medical-primary/10 text-medical-primary dark:bg-medical-primary/20 dark:text-medical-light"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Machine Learning Features Section with improved contrast */}
      <div className="py-16 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-medical-primary dark:text-medical-light">
            Advanced ML Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mlFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-medical-primary dark:text-medical-light">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Features Section with improved visibility */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-medical-primary dark:text-medical-light">
            Technical Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technicalFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-medical-primary dark:text-medical-light">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Healthcare Impact Section with better contrast */}
      <div className="py-16 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-medical-primary dark:text-medical-light">
            Healthcare Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {healthcareFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-medical-primary dark:text-medical-light">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section with improved visibility */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-medical-primary dark:text-medical-light">
            Our Dedicated Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Hariom Pandit",
                role: "Team Leader & Full Stack Developer",
                image: "https://advanced-weather-five.vercel.app/static/media/avatar.d63a68590ed8d24a886c.png",
                contribution: "Led the entire project development and implementation"
              },
              {
                name: "Himanshu Kumar Vishwakarma",
                role: "Web Developer",
                image: "https://advanced-weather-five.vercel.app/static/media/image.7ceac898249423b9e903.png",
                contribution: "Developed core web functionalities and features"
              },
              {
                name: "Devanand Upadhyay",
                role: "UI/UX Designer",
                image: "https://avatars.githubusercontent.com/u/147581129?v=4",
                contribution: "Designed the intuitive user interface and experience"
              },
              {
                name: "Ashwin Sundar",
                role: "Full Stack Developer",
                image: "https://advanced-weather-five.vercel.app/static/media/sketch1730797342392%20(1).jpeg.79230bade1d188ceb2ff.jpg",
                contribution: "Implemented backend services and ML integration"
              }
            ].map((member, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-medical-primary dark:text-medical-light">
                    {member.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.contribution}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Project Stats with better contrast */}
      <div className="py-16 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Disease Assessments", value: "8+" },
              { label: "ML Models", value: "10+" },
              { label: "Connected Hospitals", value: "500+" },
              { label: "Expert Doctors", value: "100+" }
            ].map((stat, index) => (
              <Card 
                key={index} 
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <span className="text-4xl font-bold text-medical-primary dark:text-medical-light">
                    {stat.value}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Overview;