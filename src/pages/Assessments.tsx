import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/ui/hero-section";

const assessments = [
  {
    title: "Breast Cancer Assessment",
    description: "Early detection and risk evaluation for breast cancer",
    image: "https://images.unsplash.com/photo-1550792355-6f33effb25c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/cancer-assessment"
  },
  {
    title: "Heart Disease Assessment",
    description: "Evaluate cardiovascular health and risk factors",
    image: "https://images.unsplash.com/photo-1512070800540-0a3a5be6c8a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/heart-assessment"
  },
  {
    title: "Diabetes Assessment",
    description: "Check your risk factors for diabetes",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/diabetes-assessment"
  },
  {
    title: "Malaria Assessment",
    description: "Check for malaria symptoms and risk factors",
    image: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/malaria-assessment"
  },
  {
    title: "Dengue Assessment",
    description: "Evaluate dengue fever symptoms and risks",
    image: "https://images.unsplash.com/photo-1584118624012-df056829fbd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/dengue-assessment"
  },
  {
    title: "COVID-19 Assessment",
    description: "Check COVID-19 symptoms and exposure risk",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/covid-assessment"
  },
  {
    title: "Common Cold Assessment",
    description: "Evaluate cold symptoms and severity",
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/cold-assessment"
  }
];

const Assessments = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection
        title="Health Assessments"
        description="Take our comprehensive health assessments to understand your risk factors and get personalized recommendations."
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2850&q=80"
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">About Our Assessments</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our medical assessments are designed by healthcare professionals to help you understand your health risks.
            Each assessment uses validated medical criteria and provides personalized recommendations based on your responses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment, index) => (
            <Link key={index} to={assessment.link}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 p-6">
                <img
                  src={assessment.image}
                  alt={assessment.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{assessment.title}</h3>
                <p className="text-gray-600">{assessment.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessments;
