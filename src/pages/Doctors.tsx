import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HeroSection } from "@/components/ui/hero-section";
import { DoctorsList } from "@/components/doctors/DoctorsList";
import { AddDoctorForm } from "@/components/doctors/AddDoctorForm";
import { ClipLoader } from "react-spinners"; // React Spinners
import RegistrationCTA from "@/components/RegistrationCTA"; // Add this import

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  location: string;
  summary?: string;
  budget?: number | null;
}

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorCount, setDoctorCount] = useState<number>(0); // New state for doctor count
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    fetchDoctors();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
      return;
    }
  };

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("doctors")
        .select("*");

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch doctors",
          variant: "destructive"
        });
        return;
      }

      setDoctors(data || []);
      setDoctorCount(data ? data.length : 0); // Update doctor count

    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      // Search by name, location, or specialization (disease)
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .or(`name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,specialization.ilike.%${searchTerm}%`);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to search doctors",
          variant: "destructive"
        });
        return;
      }

      setDoctors(data || []);
      setDoctorCount(data ? data.length : 0); // Update doctor count after search

    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDoctor = async (newDoctor: Omit<Doctor, "id">) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.from("doctors").insert([newDoctor]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add doctor",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Doctor added successfully"
      });

      setShowAddForm(false);
      fetchDoctors();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Add the popup component */}
      <RegistrationCTA />
      
      <HeroSection
        title="Find Expert Doctors"
        description="Connect with India's leading healthcare professionals"
        backgroundImage="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Doctors</h1>
          <Button onClick={() => setShowAddForm(!showAddForm)} disabled={isLoading}>
            {showAddForm ? "Hide Form" : "Add Doctor"}
          </Button>
        </div>

        {/* Display the count of doctors */}
        <p className="text-lg text-gray-700 mb-4">Total Doctors: {doctorCount}</p>

        {showAddForm && (
          <AddDoctorForm onSubmit={handleAddDoctor} isLoading={isLoading} />
        )}

        <div className="flex gap-4 mb-8 items-center">
          <Input
            placeholder="Search by doctor name, location, or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <ClipLoader color="#ffffff" size={20} className="mr-2" />
                Searching...
              </div>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center mt-16">
            <ClipLoader color="#0EA5E9" size={50} />
          </div>
        ) : (
          <DoctorsList doctors={doctors} />
        )}
      </div>
      
      {/* Add RegistrationCTA before the Footer */}
      <RegistrationCTA />
      
      <Footer />
    </div>
  );
};

export default Doctors;