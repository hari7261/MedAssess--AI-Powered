import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  onClose: () => void;
  appointmentData?: any;
}

export function SuccessModal({ onClose, appointmentData }: SuccessModalProps) {
  const navigate = useNavigate();
  
  // Generate a random verification code (alphanumeric, 8 characters)
  const verificationCode = React.useMemo(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 transform transition-all animate-in fade-in slide-in-from-bottom-5">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Your appointment has been successfully booked!
          </h2>
          
          <p className="text-gray-600 mb-2">
            Thank You!. Our team will contact you shortly to confirm your appointment.
          </p>
          
          <p className="text-gray-600 mb-6">
            Your appointment verification code is: <span className="font-bold text-green-600">{verificationCode}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={onClose}
              variant="outline" 
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              Book Another Appointment
            </Button>
            
            <Button 
              onClick={handleHomeClick}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
