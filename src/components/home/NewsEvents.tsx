import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
];

export const NewsEvents = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 bg-gradient-to-r from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">News & Events</h2>
        <div className="relative">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 z-10 bg-white hover:bg-green-200"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4 text-green-700" />
            </Button>
            <div className="overflow-hidden mx-8">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {news.map((item, index) => (
                  <Card key={index} className="flex-none w-full p-4 bg-white shadow-md">
                    <div className="grid md:grid-cols-2 gap-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="flex flex-col justify-center">
                        <p className="text-sm text-green-600 mb-2">{item.date}</p>
                        <h3 className="text-xl font-bold text-green-900 mb-4">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 z-10 bg-white hover:bg-green-200"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4 text-green-700" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
