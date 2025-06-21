import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CheckCircle2, Calendar, User, MapPin, Phone } from "lucide-react";

interface PaymentSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: any;
  appointmentId: string;
  paymentMethod: string;
  totalAmount: number;
}

export function PaymentSuccessDialog({
  isOpen,
  onClose,
  appointmentData,
  appointmentId,
  paymentMethod,
  totalAmount
}: PaymentSuccessDialogProps) {
  const formatTimeSlot = (timeSlot: string) => {
    switch(timeSlot) {
      case "morning-early": return "Early Morning (8:00 AM - 10:00 AM)";
      case "morning-late": return "Late Morning (10:00 AM - 12:00 PM)";
      case "afternoon-early": return "Early Afternoon (12:00 PM - 2:00 PM)";
      case "afternoon-late": return "Late Afternoon (2:00 PM - 4:00 PM)";
      case "evening": return "Evening (4:00 PM - 6:00 PM)";
      default: return timeSlot;
    }
  };

  const doctorName = appointmentData?.doctor?.replace("-", " ").replace("dr", "Dr.") || "";
  const formattedDate = appointmentData?.preferredDate 
    ? format(new Date(appointmentData.preferredDate), "EEEE, MMMM d, yyyy")
    : "";
  const formattedTime = formatTimeSlot(appointmentData?.preferredTime || "");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-2">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl">Appointment Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Your appointment has been successfully booked and confirmed.
          </DialogDescription>
        </DialogHeader>
        
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="font-semibold mb-3 text-center text-gray-700">Appointment Details</p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-sm text-gray-600">{formattedDate}</p>
                <p className="text-sm text-gray-600">{formattedTime}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <User className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Doctor</p>
                <p className="text-sm text-gray-600">{doctorName}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-gray-600">MedAssess Clinic</p>
                <p className="text-sm text-gray-600">123 Medical Center Ave, Suite 101</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Appointment ID</p>
                <p className="text-sm text-gray-600">{appointmentId}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 border-t pt-3">
            <div className="flex justify-between">
              <span className="font-medium">Payment Status:</span>
              <span className="text-green-600 font-medium">
                {paymentMethod === "online" ? "Paid Online" : "Pay at Clinic"}
              </span>
            </div>
            {paymentMethod === "online" && (
              <div className="flex justify-between mt-1">
                <span>Amount:</span>
                <span>₹{totalAmount}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          <p>An email with these details has been sent to your registered email address.</p>
          <p className="mt-1">Please arrive 15 minutes prior to your appointment time.</p>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Return to Home
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
