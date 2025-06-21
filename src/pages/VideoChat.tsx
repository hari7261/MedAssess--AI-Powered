import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const VideoChat = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
                    <p className="text-gray-600">Our Video Chat feature is under development.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default VideoChat;
