import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HeroSection } from "@/components/ui/hero-section";
import { HospitalsList } from "@/components/hospitals/HospitalsList";
import { AddHospitalForm } from "@/components/hospitals/AddHospitalForm";
import { ClipLoader } from "react-spinners";
import RegistrationCTA from "@/components/RegistrationCTA";

interface Hospital {
  id: string;
  name: string;
  location: string;
  state: string;
  type: string;
  treatments?: string[];
  summary?: string;
}

const Hospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [hospitalCount, setHospitalCount] = useState<number>(0); // New state for hospital count
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      // Search across multiple fields: name, location, state, type, treatments
      const { data, error } = await supabase
        .from("hospitals")
        .select("*")
        .or(
          `name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,state.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%,treatments.cs.{${searchTerm}}`
        );

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch hospitals",
          variant: "destructive",
        });
        return;
      }

      setHospitals(data || []);
      setHospitalCount(data ? data.length : 0); // Update hospital count
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHospital = async (newHospital: any) => {
    try {
      setIsLoading(true);

      const treatments = newHospital.treatments
        .split(",")
        .map((treatment: string) => treatment.trim())
        .filter((treatment: string) => treatment);

      const { error } = await supabase.from("hospitals").insert([
        {
          ...newHospital,
          treatments,
        },
      ]);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Hospital added successfully",
      });

      setShowAddForm(false);
      handleSearch();
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
        title="Find Top Hospitals"
        description="Discover India's leading healthcare facilities"
        backgroundImage="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Hospitals</h1>
          <Button onClick={() => setShowAddForm(!showAddForm)} disabled={isLoading}>
            {showAddForm ? "Hide Form" : "Add Hospital"}
          </Button>
        </div>

        {/* Display the count of hospitals */}
        <p className="text-lg text-gray-700 mb-4">Total Hospitals: {hospitalCount}</p>

        {showAddForm && (
          <AddHospitalForm onSubmit={handleAddHospital} isLoading={isLoading} />
        )}

        <div className="flex gap-4 mb-8 items-center">
          <Input
            placeholder="Search by name, location, state, type, or treatment..."
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
          <HospitalsList hospitals={hospitals} />
        )}
      </div>
      
      {/* Add RegistrationCTA component before the Footer */}
      <RegistrationCTA />
      
      <Footer />
    </div>
  );
};

export default Hospitals;