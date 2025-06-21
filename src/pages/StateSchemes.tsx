import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HeroSection } from "@/components/ui/hero-section";
import { AddStateSchemeForm } from "@/components/schemes/AddStateSchemeForm";
import { ClipLoader } from "react-spinners";
import { SchemeDetailsDialog } from "@/components/schemes/SchemeDetailsDialog";
import { Card, CardContent } from "@/components/ui/card";

interface StateScheme {
  id: string;
  title: string;
  description: string;
  state: string;
  summary?: string;
  image_url?: string;
  eligibility?: string;
  benefits?: string;
  how_to_apply?: string;
}

const StateSchemes = () => {
  const [schemes, setSchemes] = useState<StateScheme[]>([]);
  const [schemeCount, setSchemeCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [selectedScheme, setSelectedScheme] = useState<StateScheme | null>(null);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("state_schemes")
        .select("*");

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch schemes",
          variant: "destructive"
        });
        return;
      }

      setSchemes(data || []);
      setSchemeCount(data ? data.length : 0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("state_schemes")
        .select("*")
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,state.ilike.%${searchTerm}%`);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to search schemes",
          variant: "destructive"
        });
        return;
      }

      setSchemes(data || []);
      setSchemeCount(data ? data.length : 0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddScheme = async (newScheme: Omit<StateScheme, "id">) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("state_schemes")
        .insert([newScheme]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add scheme",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Scheme added successfully"
      });

      setShowAddForm(false);
      fetchSchemes();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection
        title="State Health Schemes"
        description="Explore healthcare initiatives and medical schemes offered by different states across India"
        backgroundImage="https://images.unsplash.com/photo-1538108149393-fbbd81895907"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">State Schemes</h1>
          <Button onClick={() => setShowAddForm(!showAddForm)} disabled={isLoading}>
            {showAddForm ? "Hide Form" : "Add Scheme"}
          </Button>
        </div>

        <p className="text-lg text-gray-700 mb-4">Total Schemes: {schemeCount}</p>

        {showAddForm && (
          <AddStateSchemeForm onSubmit={handleAddScheme} isLoading={isLoading} />
        )}

        <div className="flex gap-4 mb-8 items-center">
          <Input
            placeholder="Search schemes by title, description, or state..."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {schemes.map((scheme) => (
              <Card
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme)}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden h-[280px]"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={scheme.image_url || 'https://placehold.co/600x400?text=No+Image'}
                    alt={scheme.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2 text-center">
                    {scheme.title}
                  </h3>
                  <p className="text-sm text-gray-500 text-center mt-1">
                    {scheme.state}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <SchemeDetailsDialog
          scheme={selectedScheme}
          isOpen={!!selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      </div>
      <Footer />
    </div>
  );
};

export default StateSchemes;