import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface RegistrationCTAProps {
  delay?: number; // Delay in milliseconds before showing the popup
}

const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ delay = 2000 }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  // Show the popup after a delay
  useEffect(() => {
    // Get popup state from localStorage
    const hasSeenPopup = localStorage.getItem('hasSeenRegistrationCTA');
    
    // Only show popup once per session unless specifically reset
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Mark that user has seen the popup in this session
        localStorage.setItem('hasSeenRegistrationCTA', 'true');
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);
  
  const handleRegisterClick = () => {
    navigate('/register');
    setIsVisible(false);
  };
  
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl shadow-2xl overflow-hidden max-w-3xl relative"
          >
            {/* Close button */}
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-1 z-20"
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-2xl md:text-3xl font-bold mb-3"
                >
                  Get Access to Verified Healthcare Professionals
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-white text-opacity-90 mb-4"
                >
                  Join our network of qualified doctors, nurses, and medical staff to provide exceptional care through our platform.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm backdrop-blur-sm">
                    <span className="mr-2">✓</span> Background-checked
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm backdrop-blur-sm">
                    <span className="mr-2">✓</span> Credential-verified
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full px-4 py-1 text-sm backdrop-blur-sm">
                    <span className="mr-2">✓</span> Experienced professionals
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="md:w-1/3 flex justify-center md:justify-end"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={handleRegisterClick}
                  className="bg-white text-blue-700 hover:bg-blue-50 transition-colors px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl flex items-center"
                >
                  Register Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            </div>
            
            {/* Medical themed background elements */}
            <div className="absolute top-0 right-0 opacity-10 transform rotate-12">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/>
                <path d="M12 7v4H8v2h4v4h2v-4h4v-2h-4V7z"/>
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 opacity-10 transform -rotate-12">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                <path d="M19 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-7 2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-7 0c1.66 0 3-1.34 3-3S6.66 4 5 4 2 5.34 2 7s1.34 3 3 3zm14 10c-.99 0-1.87.4-2.53 1.03C11.61 20.4 10.36 20 9 20H5c-2.21 0-4 1.79-4 4v1h22v-1c0-2.21-1.79-4-4-4z"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationCTA;
