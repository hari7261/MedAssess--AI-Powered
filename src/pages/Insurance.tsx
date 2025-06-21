import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HeroSection } from "@/components/ui/hero-section";
import { ClipLoader } from "react-spinners";
import { Card, CardContent } from "@/components/ui/card";
import { InsuranceDetailsDialog } from "@/components/insurance/InsuranceDetailsDialog";
import RegistrationCTA from "@/components/RegistrationCTA"; // Add this import

interface Policy {
  id?: string;
  policy_name: string;
  insurer: string;
  premium: number;
  coverage: string;
  eligibility: string;
  benefits: string;
  exclusions: string;
  redirect_link: string;
}

const InsurancePage = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Fetching policies...");
      
      // First check if the table exists
      const { error: tableCheckError } = await supabase
        .from('policies')
        .select('id', { count: 'exact', head: true });
      
      if (tableCheckError) {
        console.error("Table check error:", tableCheckError);
        setError(`Table check error: ${tableCheckError.message}`);
        toast({
          title: "Table Error",
          description: `Policies table might not exist: ${tableCheckError.message}`,
          variant: "destructive"
        });
        return;
      }
      
      // Now fetch the actual data
      const { data, error } = await supabase
        .from('policies')
        .select('*');

      if (error) {
        console.error("Fetch error:", error);
        setError(`Fetch error: ${error.message}`);
        toast({
          title: "Error",
          description: `Failed to fetch policies: ${error.message}`,
          variant: "destructive"
        });
        return;
      }

      console.log("Policies fetched:", data);
      setPolicies(data || []);
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
        title="Insurance Policies"
        description="Find the perfect insurance policy for your needs"
        backgroundImage="https://images.unsplash.com/photo-1538108149393-fbbd81895907"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Insurance Policies</h1>
          <button 
            onClick={fetchPolicies} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            Refresh Data
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center mt-16">
            <ClipLoader color="#0EA5E9" size={50} />
          </div>
        ) : policies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {policies.map((policy) => (
              <Card
                key={policy.id}
                onClick={() => setSelectedPolicy(policy)}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{policy.policy_name}</h3>
                  <p className="text-gray-600 mb-2">{policy.insurer}</p>
                  <p className="text-gray-600 mb-2">Premium: ₹{policy.premium}</p>
                  <p className="text-gray-600 line-clamp-2">{policy.coverage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-xl">No insurance policies found.</p>
            <p className="text-gray-400 mt-2">
              Please make sure you've created the policies table and added some data.
            </p>
          </div>
        )}

        <InsuranceDetailsDialog
          policy={selectedPolicy}
          isOpen={!!selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default InsurancePage;