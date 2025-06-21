import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CardPaymentForm } from "@/components/payments/CardPaymentForm";
import { PaymentSuccessDialog } from "@/components/payments/PaymentSuccessDialog";
import { format } from "date-fns";

export function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentData = location.state?.appointmentData;
  
  const [paymentMethod, setPaymentMethod] = useState<string>("online");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<string>("");
  
  if (!appointmentData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">No appointment data found</h1>
        <p className="mb-6">Please complete the appointment form first.</p>
        <Button onClick={() => navigate("/appointments")}>Back to Appointments</Button>
      </div>
    );
  }

  const doctor = appointmentData.doctor?.replace("-", " ").replace("dr", "Dr.");
  const doctorDetails = appointmentData.doctorDetails;
  const consultationFee = doctorDetails?.fee || "₹500";
  const convenienceFee = "₹50";
  const totalAmount = parseInt(consultationFee.replace("₹", "")) + parseInt(convenienceFee.replace("₹", ""));

  const handlePayAtClinic = () => {
    // Generate a random appointment ID
    const generatedId = "APT" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    setAppointmentId(generatedId);
    setIsPaymentSuccessful(true);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    // Generate a random appointment ID with transaction prefix
    const generatedId = "APT" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    setAppointmentId(generatedId);
    setIsPaymentSuccessful(true);
  };

  const handleCloseSuccessDialog = () => {
    navigate("/");
  };

  const formattedDate = appointmentData.preferredDate 
    ? format(new Date(appointmentData.preferredDate), "PPP")
    : "Not specified";

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

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">Complete Your Appointment Payment</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="online" onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="online">Pay Online</TabsTrigger>
              <TabsTrigger value="clinic">Pay at Clinic</TabsTrigger>
            </TabsList>
            
            <TabsContent value="online" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Credit/Debit Card Payment</CardTitle>
                  <CardDescription>
                    Pay securely using your credit or debit card
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardPaymentForm 
                    totalAmount={totalAmount} 
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="clinic">
              <Card>
                <CardHeader>
                  <CardTitle>Pay at Doctor's Office</CardTitle>
                  <CardDescription>
                    Make payment during your visit to the clinic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border border-dashed border-yellow-300 p-4 bg-yellow-50">
                      <p className="text-sm text-yellow-800">
                        <strong>Please Note:</strong> You will need to arrive 15 minutes before your appointment 
                        time to complete registration and payment. Payment options at the clinic include cash, 
                        credit/debit cards, and UPI.
                      </p>
                    </div>
                    
                    <RadioGroup defaultValue="agree" className="mt-4">
                      <div className="flex items-top space-x-2">
                        <RadioGroupItem value="agree" id="agree" />
                        <Label htmlFor="agree" className="font-normal text-sm">
                          I understand that my appointment will not be confirmed until I make the payment at the clinic. 
                          If I do not arrive on time, my slot may be given to another patient.
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    <div className="mt-8">
                      <Button 
                        onClick={handlePayAtClinic} 
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Confirm Pay at Clinic Option
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Appointment Summary */}
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Patient Details</h3>
                  <p className="text-sm text-gray-600">{appointmentData.firstName} {appointmentData.lastName}</p>
                  <p className="text-sm text-gray-600">{appointmentData.phone}</p>
                  <p className="text-sm text-gray-600">{appointmentData.email}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Doctor</h3>
                  <p className="text-sm text-gray-600">{doctor}</p>
                  <p className="text-sm text-gray-600">{doctorDetails?.specialty || "Specialist"}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Appointment Details</h3>
                  <p className="text-sm text-gray-600">
                    Date: {formattedDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    Time: {formatTimeSlot(appointmentData.preferredTime)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Type: {appointmentData.appointmentType?.replace(/-/g, " ")}
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Consultation Fee:</span>
                    <span className="font-medium">{consultationFee}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Convenience Fee:</span>
                    <span>{convenienceFee}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t font-bold">
                    <span>Total:</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline" onClick={() => navigate(-1)} className="w-full">
                Back to Appointment Form
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Success Dialog */}
      <PaymentSuccessDialog
        isOpen={isPaymentSuccessful}
        onClose={handleCloseSuccessDialog}
        appointmentData={appointmentData}
        appointmentId={appointmentId}
        paymentMethod={paymentMethod}
        totalAmount={totalAmount}
      />
    </div>
  );
}
