import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Doctor {
  name: string;
  specialization: string;
  experience: string;
  location: string;
  summary?: string;
  budget?: number | null;
}

interface AddDoctorFormProps {
  onSubmit: (doctor: Doctor) => void;
  isLoading: boolean;
}

export const AddDoctorForm = ({ onSubmit, isLoading }: AddDoctorFormProps) => {
  const [newDoctor, setNewDoctor] = useState<Doctor>({
    name: "",
    specialization: "",
    experience: "",
    location: "",
    summary: "",
    budget: null
  });
  const { toast } = useToast();

  const checkDuplicateDoctor = async () => {
    // Check for duplicates by name only
    const { data } = await supabase
      .from("doctors")
      .select("*")
      .eq("name", newDoctor.name);

    return data && data.length > 0;
  };

  const handleSubmit = async () => {
    if (!newDoctor.name || !newDoctor.specialization || !newDoctor.location || !newDoctor.experience) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const isDuplicate = await checkDuplicateDoctor();
    if (isDuplicate) {
      toast({
        title: "Doctor Already Exists",
        description: "A doctor with the same name already exists.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(newDoctor);
    setNewDoctor({
      name: "",
      specialization: "",
      experience: "",
      location: "",
      summary: "",
      budget: null
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Add New Doctor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Name *"
          value={newDoctor.name}
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
        />
        <Input
          placeholder="Specialization *"
          value={newDoctor.specialization}
          onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
        />
        <Input
          placeholder="Experience (e.g., 5 years, Senior) *"
          value={newDoctor.experience}
          onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
        />
        <Input
          placeholder="Location *"
          value={newDoctor.location}
          onChange={(e) => setNewDoctor({ ...newDoctor, location: e.target.value })}
        />
        <Input
          placeholder="Consultation Fee (₹)"
          type="number"
          value={newDoctor.budget?.toString() || ""}
          onChange={(e) => setNewDoctor({ ...newDoctor, budget: e.target.value ? Number(e.target.value) : null })}
        />
        <Input
          placeholder="Summary (optional)"
          value={newDoctor.summary}
          onChange={(e) => setNewDoctor({ ...newDoctor, summary: e.target.value })}
          className="md:col-span-2"
        />
        <Button
          onClick={handleSubmit}
          className="md:col-span-2"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isLoading ? "Adding Doctor..." : "Add Doctor"}
        </Button>
      </div>
    </div>
  );
};
