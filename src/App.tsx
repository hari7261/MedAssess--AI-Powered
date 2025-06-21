import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Doctors from "./pages/Doctors";
import Hospitals from "./pages/Hospitals";
import Assessments from "./pages/Assessments";
import CancerAssessment from "./pages/assessments/CancerAssessment";
import DiabetesAssessment from "./pages/assessments/DiabetesAssessment";
import HeartAssessment from "./pages/assessments/HeartAssessment";
import MalariaAssessment from "./pages/assessments/MalariaAssessment";
import DengueAssessment from "./pages/assessments/DengueAssessment";
import CovidAssessment from "./pages/assessments/CovidAssessment";
import ColdAssessment from "./pages/assessments/ColdAssessment";
import DiseaseInfo from "./pages/info/DiseaseInfo";
import About from "./pages/About";
import Overview from "./pages/Overview";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import NewsEvents from "./pages/NewsEvents";
import GovtHealthSchemes from "./pages/GovtHealthSchemes";
import StateSchemes from "./pages/StateSchemes";
import ChatWithAI from "./pages/ChatWithAI";
import TermsAndConditions from "./pages/TermsAndConditions";
import AdvancedGPT from './pages/AdvancedGPT';
import Appointments from "./pages/Appointments";
import VideoChat from "./pages/VideoChat";
import ExcelChatBot from "./pages/ClgGPT";
import Register from "./pages/Register";
import InsurancePage from "./pages/Insurance";
import { PaymentPage } from "./pages/PaymentPage";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospitals"
            element={
              <ProtectedRoute>
                <Hospitals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessments"
            element={
              <ProtectedRoute>
                <Assessments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/overview"
            element={
              <ProtectedRoute>
                <Overview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FAQ />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news-events"
            element={
              <ProtectedRoute>
                <NewsEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/GovtHealthSchemes"
            element={
              <ProtectedRoute>
                <GovtHealthSchemes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/StateSchemes"
            element={
              <ProtectedRoute>
                <StateSchemes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ChatWithAI"
            element={
              <ProtectedRoute>
                <ChatWithAI />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdvancedGPT"
            element={
              <ProtectedRoute>
                <AdvancedGPT />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/VideoChat"
            element={
              <ProtectedRoute>
                <VideoChat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ExcelChatBot"
            element={
              <ProtectedRoute>
                <ExcelChatBot />
              </ProtectedRoute>
            }
          />

          <Route 
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
          />

          <Route
            path="/insurance"
            element={
              <ProtectedRoute>
                <InsurancePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/payment" element={<PaymentPage />} />

          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/cancer-assessment" element={<CancerAssessment />} />
          <Route path="/diabetes-assessment" element={<DiabetesAssessment />} />
          <Route path="/heart-assessment" element={<HeartAssessment />} />
          <Route path="/malaria-assessment" element={<MalariaAssessment />} />
          <Route path="/dengue-assessment" element={<DengueAssessment />} />
          <Route path="/covid-assessment" element={<CovidAssessment />} />
          <Route path="/cold-assessment" element={<ColdAssessment />} />
          <Route
            path="/disease-info"
            element={
              <ProtectedRoute>
                <DiseaseInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
const Chatbot = () => {
  const location = useLocation();
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/sign-up";
  if (isAuthPage) {
    return null;
  }
  return (
    <>
      <div style={chatIconContainerStyle}>
        <button onClick={toggleChatbot} style={chatIconStyle}>
          💬
        </button>
      </div>
      <div
        style={{
          ...iframeContainerStyle,
          transform: isChatbotVisible ? "scale(1)" : "scale(0)",
          opacity: isChatbotVisible ? 1 : 0,
        }}
      >
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/FyxC_onseWv71CeYviSkg"
          width="100%"
          style={iframeStyle}
          frameBorder="0"
        ></iframe>
      </div>
    </>
  );
};

// Styling for the chatbot iframe
const iframeContainerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "300px",
  height: "400px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  borderRadius: "10px",
  overflow: "hidden",
  backgroundColor: "#fff",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  transform: "scale(0)", // Default hidden state
  opacity: 0, // Default hidden state
};
// Styling for the circular chat icon
const chatIconContainerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 1001,
};
const chatIconStyle: React.CSSProperties = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "#007BFF",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  border: "none",
  cursor: "pointer",
  fontSize: "24px",
};
const iframeStyle = {
  height: "100%",
  width: "100%",
  border: "none",
};
export default App;