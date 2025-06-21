import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

const NewsEvents = () => {
  const news = [
    {
      title: "Patient Appointment System Launch",
      date: "2025-03-05",
      image: "https://img.freepik.com/free-photo/portrait-3d-male-doctor_23-2151106709.jpg",
      description: "We are proud to announce the launch of our integrated patient appointment system, enabling seamless scheduling with healthcare providers."
    },
    {
      title: "Advanced AI Assistant Implementation",
      date: "2025-01-25",
      image: "https://img.freepik.com/free-photo/cartoon-ai-robot-scene_23-2151675091.jpg",
      description: "Launch of our advanced AI healthcare assistant for comprehensive patient communication and support."
    },
    {
      title: "Government Healthcare Schemes Integration",
      date: "2025-02-15",
      image: "https://img.freepik.com/free-photo/medical-team-stacking-hand_587448-4731.jpg",
      description: "Comprehensive database of central and state government healthcare schemes and programs across India now available on our platform."
    },

    {
      title: "National Healthcare Database Integration",
      date: "2024-12-26",
      image: "https://img.freepik.com/free-photo/images-that-simulate-x-rays-with-neon-colors_23-2151521296.jpg",
      description: "Successfully integrated comprehensive database of doctors and hospitals across India, improving healthcare accessibility."
    },
    {
      title: "Cancer Assessment Platform Launch",
      date: "2024-12-21",
      image: "https://img.freepik.com/free-photo/care-job-scene-with-patient-being-cared_23-2151224227.jpg",
      description: "Initial launch of our innovative cancer assessment platform, marking the beginning of our journey to transform healthcare accessibility."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with Background Image */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/modern-healthcare-approach-doctors-using-tablets-records_60438-3931.jpg')" // Your background image URL
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4 py-20">
          <h1 className="text-4xl font-bold leading-tight">Events and Updates</h1>
          <p className="mt-4 text-xl">
            Track our journey and milestones as we revolutionize healthcare accessibility in India. Discover our latest achievements and upcoming initiatives.
          </p>
        </div>
      </div>

      {/* News Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Project Timeline & Milestones</h2>
          <p className="text-lg text-gray-600">
            Follow our progress as we build India's most comprehensive healthcare platform. Each update represents a step forward in our mission to transform healthcare accessibility.
          </p>
        </div>

        <div className="grid gap-8">
          {news.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(item.date), 'MMMM d, yyyy')}
                  </p>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;
