/* eslint-disable react-refresh/only-export-components */
import { Navbar } from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const faqs = {
    doctor: [
      {
        question: "How do I find a doctor?",
        answer: "You can use our Doctor Search tool to find qualified professionals in your area."
      },
      {
        question: "What qualifications do the doctors have?",
        answer: "All doctors in our network are certified and have extensive experience in their respective fields."
      },
      {
        question: "Can I consult a doctor online?",
        answer: "Yes, you can schedule a virtual consultation with a doctor through our platform."
      },
      {
        question: "Do I need a referral to see a specialist?",
        answer: "A referral is not required to see most specialists, but it may help with insurance coverage."
      },
      {
        question: "What should I bring to my doctor’s appointment?",
        answer: "Bring your medical history, any relevant test results, and a list of medications you're currently taking."
      },
      {
        question: "Can I book a doctor appointment online?",
        answer: "Yes, you can book an appointment with any doctor via our website or app."
      },
      {
        question: "Are there emergency doctors available?",
        answer: "Yes, we have a network of emergency doctors available 24/7 for urgent care needs."
      },
      {
        question: "How do I cancel or reschedule an appointment?",
        answer: "You can cancel or reschedule your appointment via our platform or by contacting our support team."
      },
      {
        question: "Can I get a second opinion from a doctor?",
        answer: "Yes, you can request a second opinion from one of our specialists."
      },
      {
        question: "What if I have a medical emergency?",
        answer: "In case of a medical emergency, please dial emergency services immediately."
      }
    ],
    hospital: [
      {
        question: "How do I find nearby hospitals?",
        answer: "You can search for hospitals in your area using our Hospital Search tool."
      },
      {
        question: "Are the hospitals partnered with your service?",
        answer: "Yes, we partner with leading hospitals to ensure quality care."
      },
      {
        question: "How can I book a hospital appointment?",
        answer: "You can book an appointment directly with the hospital via our platform."
      },
      {
        question: "What hospitals accept my insurance?",
        answer: "You can filter hospitals by insurance coverage using our platform."
      },
      {
        question: "Can I visit the hospital without an appointment?",
        answer: "For routine visits, an appointment is recommended, but some hospitals accept walk-ins for urgent care."
      },
      {
        question: "What should I bring when visiting a hospital?",
        answer: "Bring your identification, insurance information, and any medical records relevant to your visit."
      },
      {
        question: "How do I know if a hospital is accredited?",
        answer: "We provide information about hospital accreditation on each hospital’s profile page."
      },
      {
        question: "Can I get a second opinion from a hospital?",
        answer: "Yes, you can request a second opinion at any of our partnered hospitals."
      },
      {
        question: "What services do the hospitals provide?",
        answer: "Hospitals provide a variety of services, including emergency care, surgery, diagnostics, and specialist consultations."
      },
      {
        question: "Are there any financial aid options at hospitals?",
        answer: "Some hospitals offer financial assistance programs for qualifying patients. Please contact the hospital directly for more details."
      }
    ],
    assessment: [
      {
        question: "How accurate are the risk assessments?",
        answer: "Our assessments are based on established medical criteria and provide an indicative risk level. However, they should not replace professional medical advice."
      },
      {
        question: "Is my medical information secure?",
        answer: "Yes, we implement strict security measures and comply with healthcare data protection standards to ensure your information is safe."
      },
      {
        question: "How often should I take these assessments?",
        answer: "We recommend periodic assessments, typically every 3-6 months, or when you notice significant changes in your health."
      },
      {
        question: "Can I share my assessment results with my doctor?",
        answer: "Yes, you can download and share your assessment reports with healthcare professionals."
      },
      {
        question: "How do I know if I need an assessment?",
        answer: "If you have concerns about your health or risk factors for specific conditions, it’s a good idea to take an assessment."
      },
      {
        question: "Are the assessments covered by insurance?",
        answer: "Some assessments may be covered by insurance. Please check with your insurance provider for more information."
      },
      {
        question: "What happens if I get a high-risk result?",
        answer: "If you receive a high-risk result, it’s important to consult with a healthcare professional for further evaluation."
      },
      {
        question: "Are the assessments available for children?",
        answer: "Yes, we offer assessments tailored to children’s health needs in certain areas."
      },
      {
        question: "How do I interpret my assessment results?",
        answer: "Results are provided with an explanation of what each score means. If needed, you can consult with a doctor for further clarification."
      },
      {
        question: "Are the assessments anonymous?",
        answer: "Yes, your personal information is kept private. The assessments focus on your health data, not identifying information."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div
        className="relative w-full h-96 bg-cover bg-center rounded-md"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-photo/modern-healthcare-approach-doctors-using-tablets-records_60438-3931.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center leading-tight px-4">Frequently Asked Questions</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600">Select a category to find answers to your questions</p>
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center space-x-6 mb-8">
          <button
            className={`px-6 py-3 text-lg text-white rounded-full transition-all duration-300 ease-in-out ${selectedCategory === "doctor" ? "bg-medical-primary shadow-lg" : "bg-gray-500"
              }`}
            onClick={() => setSelectedCategory("doctor")}
          >
            Doctor
          </button>
          <button
            className={`px-6 py-3 text-lg text-white rounded-full transition-all duration-300 ease-in-out ${selectedCategory === "hospital" ? "bg-medical-primary shadow-lg" : "bg-gray-500"
              }`}
            onClick={() => setSelectedCategory("hospital")}
          >
            Hospital
          </button>
          <button
            className={`px-6 py-3 text-lg text-white rounded-full transition-all duration-300 ease-in-out ${selectedCategory === "assessment" ? "bg-medical-primary shadow-lg" : "bg-gray-500"
              }`}
            onClick={() => setSelectedCategory("assessment")}
          >
            Assessment
          </button>
        </div>

        {/* FAQ Accordion Based on Selected Category */}
        <div className="w-full">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs[selectedCategory]?.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-medical-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
