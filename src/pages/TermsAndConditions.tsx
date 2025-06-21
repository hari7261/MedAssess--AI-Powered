import React, { useState, useEffect } from "react";
import {
    Shield,
    FileText,
    Heart,
    AlertCircle,
    BookOpen,
    MapPin,
    Users,
    MessageSquare,
    LockIcon,
    CheckIcon,
    XIcon,
    Calendar,
    Eye,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { HeroSection } from "@/components/ui/hero-section";

const TERMS_VERSION = '2.0';

const TermsAndConditions: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConsentChecked, setIsConsentChecked] = useState(false);
    const [showFloatingIcon, setShowFloatingIcon] = useState(false);
    const [lastUpdated, setLastUpdated] = useState("");
    const [profileVisitors, setProfileVisitors] = useState(0);

    // Fetch last updated date (simulated)
    useEffect(() => {
        const date = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        setLastUpdated(date);
    }, []);

    // Initialize and update profile visitors
    useEffect(() => {
        const storedVisitors = localStorage.getItem('profileVisitors');
        if (storedVisitors) {
            const visitors = parseInt(storedVisitors, 10) + 1;
            localStorage.setItem('profileVisitors', visitors.toString());
            setProfileVisitors(visitors);
        } else {
            localStorage.setItem('profileVisitors', '1');
            setProfileVisitors(1);
        }
    }, []);

    // Check if the user has already accepted the terms
    useEffect(() => {
        const hasConsented = localStorage.getItem('termsConsented');
        const consentVersion = localStorage.getItem('termsConsentVersion');

        if (!hasConsented || consentVersion !== TERMS_VERSION) {
            setIsModalOpen(true);
            setShowFloatingIcon(true);
        }
    }, []);

    // Handle terms acceptance
    const handleConsentSubmit = () => {
        if (isConsentChecked) {
            localStorage.setItem('termsConsented', 'true');
            localStorage.setItem('termsConsentVersion', TERMS_VERSION);
            setIsModalOpen(false);
            setShowFloatingIcon(false);
        }
    };

    const sections = [
        {
            icon: <Shield className="text-blue-600" />,
            title: "Platform Purpose",
            description: "**Critical Notice:** Digital health assessment platform for self-evaluation. **NOT A MEDICAL DIAGNOSIS REPLACEMENT**.",
            warningLevel: "critical",
        },
        {
            icon: <AlertCircle className="text-red-600" />,
            title: "Risk Acknowledgment",
            description: "**Mandatory User Agreement:**\n- Immediate doctor consultation for moderate/high-risk assessments\n- Platform results are **NOT 100% DIAGNOSTIC**",
            warningLevel: "warning",
        },
        {
            icon: <LockIcon className="text-purple-600" />,
            title: "Data Privacy",
            description: "**Privacy Commitment:**\n- End-to-end data encryption\n- Strict confidentiality protocols\n- No unauthorized data sharing",
            warningLevel: "normal",
        },
        {
            icon: <Heart className="text-pink-600" />,
            title: "User Responsibilities",
            description: "**User Obligations:**\n- Provide accurate information\n- Consult a doctor for serious symptoms\n- Do not misuse the platform",
            warningLevel: "warning",
        },
        {
            icon: <BookOpen className="text-green-600" />,
            title: "Health Information",
            description: "**Informational Use Only:**\n- The platform provides general health information\n- Always consult a healthcare professional for medical advice",
            warningLevel: "normal",
        },
        {
            icon: <MapPin className="text-orange-600" />,
            title: "Access to Doctors",
            description: "**Doctor Network:**\n- Connect with specialist doctors nationwide\n- Platform does not guarantee doctor availability",
            warningLevel: "normal",
        },
        {
            icon: <Users className="text-indigo-600" />,
            title: "Community Guidelines",
            description: "**Respectful Behavior:**\n- Be respectful to other users\n- Do not share harmful or misleading information",
            warningLevel: "warning",
        },
        {
            icon: <MessageSquare className="text-teal-600" />,
            title: "AI Chatbot Usage",
            description: "**AI Assistance:**\n- The chatbot provides general guidance\n- It is not a substitute for professional medical advice",
            warningLevel: "normal",
        },
        {
            icon: <CheckIcon className="text-green-600" />,
            title: "Acceptable Use",
            description: "**Permitted Activities:**\n- Use the platform for personal health assessments\n- Follow all guidelines and policies",
            warningLevel: "normal",
        },
        {
            icon: <XIcon className="text-red-600" />,
            title: "Prohibited Activities",
            description: "**Restricted Actions:**\n- Do not use the platform for illegal purposes\n- Do not attempt to hack or disrupt the platform",
            warningLevel: "critical",
        },
        {
            icon: <FileText className="text-blue-600" />,
            title: "Intellectual Property",
            description: "**Ownership:**\n- All content on the platform is protected by copyright\n- Unauthorized use is strictly prohibited",
            warningLevel: "normal",
        },
        {
            icon: <Heart className="text-pink-600" />,
            title: "Liability Disclaimer",
            description: "**No Warranty:**\n- The platform is provided 'as-is'\n- We are not liable for any damages arising from its use",
            warningLevel: "critical",
        },
    ];

    const faqs = [
        {
            question: "What is MedAssess?",
            answer: "MedAssess is a digital health platform that provides self-assessment tools and access to specialist doctors.",
        },
        {
            question: "Is MedAssess a replacement for a doctor?",
            answer: "No, MedAssess is not a replacement for professional medical advice, diagnosis, or treatment.",
        },
        {
            question: "How accurate are the assessments?",
            answer: "The assessments are based on user input and are not 100% diagnostic. Always consult a doctor for accurate diagnosis.",
        },
        {
            question: "Is my data secure?",
            answer: "Yes, we use end-to-end encryption and strict confidentiality protocols to protect your data.",
        },
        {
            question: "Can I use MedAssess for emergencies?",
            answer: "No, in case of a medical emergency, contact your local emergency services immediately.",
        },
        {
            question: "How do I find a doctor on MedAssess?",
            answer: "You can use the 'Doctors' section to search for specialist doctors near you.",
        },
        {
            question: "Is MedAssess free to use?",
            answer: "Yes, the basic features of MedAssess are free to use. Some advanced features may require a subscription.",
        },
        {
            question: "Can I trust the AI chatbot?",
            answer: "The AI chatbot provides general guidance but is not a substitute for professional medical advice.",
        },
        {
            question: "What should I do if I get a high-risk result?",
            answer: "If your assessment indicates a high risk, consult a qualified healthcare professional immediately.",
        },
        {
            question: "How often are the terms updated?",
            answer: "The terms are updated periodically. Check the 'Last Updated' date for the latest version.",
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you can delete your account from the settings page. All your data will be permanently removed.",
        },
        {
            question: "What happens if I violate the terms?",
            answer: "Violating the terms may result in suspension or termination of your account.",
        },
        {
            question: "How do I contact support?",
            answer: "You can contact support through the 'Contact Us' page or email us at support@medassess.com.",
        },
        {
            question: "Can I use MedAssess outside India?",
            answer: "Currently, MedAssess is available only in India. We plan to expand to other regions in the future.",
        },
        {
            question: "How do I update my profile information?",
            answer: "You can update your profile information from the 'Profile' section in your account settings.",
        },
    ];

    const ConsentModal = () => (
        <div
            className={`
                fixed inset-0 z-50 bg-black bg-opacity-50 
                flex items-center justify-center 
                ${isModalOpen ? 'block' : 'hidden'}
            `}
        >
            <div className="bg-white p-8 rounded-xl max-w-2xl w-full mx-4">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    Terms and Conditions Consent
                </h2>

                <div className="max-h-96 overflow-y-auto mb-6 pr-4">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="mb-4 p-4 border rounded-lg"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                {section.title}
                            </h3>
                            <p
                                className="text-gray-700"
                                dangerouslySetInnerHTML={{
                                    __html: section.description.replace(
                                        /\*\*(.*?)\*\*/g,
                                        '<strong class="text-red-500">$1</strong>'
                                    )
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="consentCheckbox"
                        checked={isConsentChecked}
                        onChange={() => setIsConsentChecked(!isConsentChecked)}
                        className="mr-2"
                    />
                    <label
                        htmlFor="consentCheckbox"
                        className="text-gray-700"
                    >
                        I have read and agree to the Terms and Conditions
                    </label>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleConsentSubmit}
                        disabled={!isConsentChecked}
                        className={`
                            px-6 py-2 rounded-lg 
                            ${isConsentChecked
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }
                        `}
                    >
                        Accept Terms
                    </button>
                </div>
            </div>
        </div>
    );

    const FloatingTermsIcon = () => (
        showFloatingIcon && (
            <div
                onClick={() => setIsModalOpen(true)}
                className="
                    fixed bottom-6 right-6 z-40 
                    bg-red-500 text-white 
                    w-16 h-16 rounded-full 
                    flex items-center justify-center 
                    shadow-2xl cursor-pointer 
                    animate-bounce hover:animate-none
                "
            >
                <FileText className="w-8 h-8" />
            </div>
        )
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <ConsentModal />
            <FloatingTermsIcon />

            <HeroSection
                title="Terms and Conditions"
                description="Comprehensive Platform Usage Guidelines"
                backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            />

            <div className="max-w-7xl mx-auto py-12 px-4">
                {/* Last Updated and Profile Visitors Section */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-2">
                        <Calendar className="text-blue-600" />
                        <p className="text-gray-700">
                            Last Updated: <span className="font-semibold">{lastUpdated}</span>
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Eye className="text-green-600" />
                        <p className="text-gray-700">
                            Profile Visitors: <span className="font-semibold">{profileVisitors}</span>
                        </p>
                    </div>
                </div>

                {/* Terms and Conditions Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {sections.map((section, index) => (
                        <Card
                            key={index}
                            className="p-6 hover:shadow-md transition-shadow duration-200 rounded-xl bg-white border"
                        >
                            <div className="flex items-center justify-center mb-4">
                                {section.icon}
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
                                {section.title}
                            </h2>
                            <p
                                className="text-gray-700 text-center whitespace-pre-line"
                                dangerouslySetInnerHTML={{
                                    __html: section.description.replace(
                                        /\*\*(.*?)\*\*/g,
                                        '<strong class="text-red-500">$1</strong>'
                                    )
                                }}
                            />
                        </Card>
                    ))}
                </div>

                {/* Frequently Asked Questions Section */}
                <div className="mt-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="p-6 hover:shadow-md transition-shadow duration-200 rounded-xl bg-white border">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-700">
                                    {faq.answer}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TermsAndConditions;