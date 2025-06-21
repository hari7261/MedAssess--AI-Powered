import { Shield, Users, Clock, Award, Monitor, HeartPulse, Globe } from "lucide-react";

export const WhyChoose = () => {
  const features = [
    {
      icon: <Users className="w-12 h-12 text-green-500" />,
      title: "Expert Doctors",
      description: "Access to top healthcare professionals for specialized treatment",
    },
    {
      icon: <Award className="w-12 h-12 text-green-500" />,
      title: "Top Hospitals",
      description: "Network of certified hospitals for advanced medical care",
    },
    {
      icon: <Monitor className="w-12 h-12 text-green-500" />,
      title: "AI Health Query",
      description: "Get instant health-related answers with AI technology",
    },
    {
      icon: <Globe className="w-12 h-12 text-green-500" />,
      title: "Government Health Schemes",
      description: "Support for government-approved healthcare solutions",
    },
    {
      icon: <Clock className="w-12 h-12 text-green-500" />,
      title: "24/7 Availability",
      description: "Healthcare support and assistance available anytime",
    },
    {
      icon: <HeartPulse className="w-12 h-12 text-green-500" />,
      title: "Innovative Technologies",
      description: "Continuously implementing new features for your safety",
    },
    {
      icon: <Shield className="w-12 h-12 text-green-500" />,
      title: "Advanced AI ChatBot Support (New)",
      description: "Advanced AI-powered chatbot for immediate medical guidance and support 24/7",
    },
    {
      icon: <Monitor className="w-12 h-12 text-green-500" />,
      title: "Live Video Chat (Comming Soon)",
      description: "Secure video appointments with healthcare professionals from anywhere",
    },
    {
      icon: <Clock className="w-12 h-12 text-green-500" />,
      title: "Smart Scheduling (New)",
      description: "Easy online booking system for doctor appointments with instant confirmation",
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Leading the way in AI-powered healthcare solutions
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
