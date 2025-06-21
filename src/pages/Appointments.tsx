import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import { SuccessModal } from "@/components/appointments/SuccessModal";
import RegistrationCTA from "@/components/RegistrationCTA";

const Appointments = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);

    const handleFormSuccess = (data) => {
        setAppointmentData(data);
        setShowSuccessModal(true);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Book an Appointment</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Fill out the form below to schedule an appointment with one of our healthcare professionals. We'll confirm your appointment details via email.
                        </p>
                    </div>
                    
                    <AppointmentForm onSuccess={handleFormSuccess} />
                </div>
            </div>
            
            {/* Add RegistrationCTA as a popup component */}
            <RegistrationCTA />
            
            <Footer />
            
            {showSuccessModal && (
                <SuccessModal 
                    onClose={handleCloseModal} 
                    appointmentData={appointmentData}
                />
            )}
        </div>
    );
};

export default Appointments;
