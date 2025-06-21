import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/ui/hero-section";
import { motion } from "framer-motion";

const ChatWithAI = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-dark via-[#1A1F2C] to-medical-primary relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-medical-secondary/20 rounded-full filter blur-3xl"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-medical-accent/20 rounded-full filter blur-3xl"
          style={{ transform: 'translate(50%, 50%)' }}
        />
      </div>

      <Navbar />

      <HeroSection
        title="AI Health Assistant"
        description="Your intelligent medical companion powered by advanced artificial intelligence"
        backgroundImage="https://images.unsplash.com/photo-1584937141078-13c6f4bc1a0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose max-w-none mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-medical-secondary to-medical-accent">
            Next-Generation Healthcare Assistant
          </h2>
          <p className="text-medical-light text-center text-lg">
            Experience healthcare guidance enhanced by cutting-edge AI technology. Our system provides instant, reliable medical information while maintaining the highest standards of privacy and accuracy.
          </p>
        </motion.div>
      </div>

      {/* Chatbot Section with Enhanced Futuristic Design */}
      <div className="flex justify-center items-center py-16 px-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-medical-light/10 relative overflow-hidden">
            {/* Animated border effect */}
            <div className="absolute inset-0 border border-medical-secondary/30 rounded-2xl animate-pulse" />
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-medical-secondary to-medical-accent">
                  Medical AI Assistant
                </h2>
                <p className="text-medical-light">Available 24/7 for your health queries</p>
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-medical-secondary to-medical-accent flex items-center justify-center relative"
              >
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full animate-ping bg-medical-secondary/30" />
                <svg
                  className="w-6 h-6 text-white relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-xl overflow-hidden"
              style={{
                boxShadow: "0 0 30px rgba(72, 187, 120, 0.2)",
              }}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-medical-secondary via-medical-accent to-medical-secondary animate-pulse opacity-30" />
              
              <iframe
                src="https://www.chatbase.co/chatbot-iframe/FyxC_onseWv71CeYviSkg"
                width="100%"
                height="600"
                className="border-0 bg-white/5 backdrop-blur relative z-10"
                style={{ borderRadius: "12px" }}
              ></iframe>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-medical-light/10 hover:border-medical-secondary/50 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-medical-secondary to-medical-accent">
              Advanced AI Technology
            </h3>
            <p className="text-medical-light">
              Powered by state-of-the-art machine learning models for accurate medical guidance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-medical-light/10 hover:border-medical-secondary/50 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-medical-secondary to-medical-accent">
              24/7 Availability
            </h3>
            <p className="text-medical-light">
              Access medical information and guidance anytime, anywhere with instant responses
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-medical-light/10 hover:border-medical-secondary/50 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-medical-secondary to-medical-accent">
              Privacy Focused
            </h3>
            <p className="text-medical-light">
              Your health data is protected with enterprise-grade security measures
            </p>
          </motion.div>
        </div>
      </div>

      {/* Disclaimer Section with Enhanced Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-medical-primary/30 backdrop-blur-sm rounded-xl p-6 border border-medical-light/10">
          <h3 className="text-xl font-semibold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-medical-secondary to-medical-accent">
            Important Notice
          </h3>
          <p className="text-medical-light">
            This AI Health Assistant provides general medical information and guidance. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a healthcare provider for personalized care.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChatWithAI;
