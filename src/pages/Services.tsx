import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { HospitalIcon, Stethoscope, ClipboardCheck, Activity, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      title: "Medical Assessments",
      description:
        "Our comprehensive health risk evaluations offer a thorough analysis of your current health status, enabling early detection of potential issues and personalized health planning.",
      icon: <ClipboardCheck className="w-8 h-8 text-medical-primary" />,
    },
    {
      title: "Doctor Consultations",
      description:
        "Connect with our experienced healthcare professionals who provide expert advice, diagnosis, and treatment options tailored to your unique health needs.",
      icon: <Stethoscope className="w-8 h-8 text-medical-primary" />,
    },
    {
      title: "Hospital Referrals",
      description:
        "We connect you with top-tier medical facilities for specialized treatments, ensuring you receive the highest level of care when needed.",
      icon: <HospitalIcon className="w-8 h-8 text-medical-primary" />,
    },
    {
      title: "Health Monitoring",
      description:
        "Track your health metrics and progress over time with our health monitoring services, empowering you to take charge of your wellness journey.",
      icon: <Activity className="w-8 h-8 text-medical-primary" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "The medical assessment was thorough and professional. I felt well taken care of throughout the entire process.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content: "The doctor consultation was excellent. The physician was knowledgeable and took time to explain everything clearly.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Patient",
      content: "The health monitoring service has helped me stay on track with my wellness goals. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-cover bg-center h-[500px]"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/modern-healthcare-approach-doctors-using-tablets-records_60438-3931.jpg?t=st=1735369497~exp=1735373097~hmac=c2bbd897402b1bbd12a12a62c5e83a438d83639e92001a9005bdf8b967e99985&w=1380')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 py-32">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold leading-tight"
          >
            Our Healthcare Services
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xl max-w-3xl mx-auto"
          >
            We offer a range of professional healthcare services designed to meet your needs. Discover how we can support your health and well-being.
          </motion.p>
        </div>
      </motion.div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the services we offer to help you maintain your health and wellness. Each service is designed to meet your unique healthcare needs.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 * index }}
            >
              <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-50 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied patients about their experiences with our healthcare services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
              >
                <Card className="p-8 h-full">
                  <div className="flex flex-col h-full">
                    <Quote className="w-8 h-8 text-blue-500 mb-4" />
                    <p className="text-gray-600 mb-6 flex-grow">{testimonial.content}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact/Consultation Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Start Your Health Journey?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Take the first step towards better health. Schedule a consultation with our healthcare professionals today.
            </p>
            <Link to="/contact">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl">
                Book a Consultation
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
