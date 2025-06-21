import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HOSPITAL_TYPES = [
  'General',
  'Specialty',
  'Teaching',
  'Community',
  'Private',
  'Government'
] as const;

interface Hospital {
  name: string;
  location: string;
  state: string;
  type: string;
  treatments: string;
  summary?: string;
}

interface AddHospitalFormProps {
  onSubmit: (hospital: Hospital) => void;
  isLoading: boolean;
}

export const AddHospitalForm = ({ onSubmit, isLoading }: AddHospitalFormProps) => {
  const [newHospital, setNewHospital] = useState<Hospital>({
    name: "",
    location: "",
    state: "",
    type: "",
    treatments: "",
    summary: ""
  });
  const { toast } = useToast();

  const checkDuplicateHospital = async () => {
    // Check for duplicates by name, location, and state
    const { data } = await supabase
      .from("hospitals")
      .select("*")
      .eq("name", newHospital.name)
      .eq("location", newHospital.location)
      .eq("state", newHospital.state);

    return data && data.length > 0;
  };

  const handleSubmit = async () => {
    if (!newHospital.name || !newHospital.location || !newHospital.state || !newHospital.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const isDuplicate = await checkDuplicateHospital();
    if (isDuplicate) {
      toast({
        title: "Hospital Already Exists",
        description: "A hospital with the same name and location already exists.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(newHospital);
    setNewHospital({
      name: "",
      location: "",
      state: "",
      type: "",
      treatments: "",
      summary: ""
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Add New Hospital</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Name"
          value={newHospital.name}
          onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
        />
        <Input
          placeholder="Location"
          value={newHospital.location}
          onChange={(e) => setNewHospital({ ...newHospital, location: e.target.value })}
        />
        <Input
          placeholder="State"
          value={newHospital.state}
          onChange={(e) => setNewHospital({ ...newHospital, state: e.target.value })}
        />
        <Select
          value={newHospital.type}
          onValueChange={(value) => setNewHospital({ ...newHospital, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select hospital type" />
          </SelectTrigger>
          <SelectContent>
            {HOSPITAL_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Treatments (comma-separated)"
          value={newHospital.treatments}
          onChange={(e) => setNewHospital({ ...newHospital, treatments: e.target.value })}
          className="md:col-span-2"
        />
        <Input
          placeholder="Summary (optional)"
          value={newHospital.summary}
          onChange={(e) => setNewHospital({ ...newHospital, summary: e.target.value })}
          className="md:col-span-2"
        />
        <Button
          onClick={handleSubmit}
          className="md:col-span-2"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isLoading ? "Adding Hospital..." : "Add Hospital"}
        </Button>
      </div>
    </div>
  );
};
