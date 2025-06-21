import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const DoctorForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    specialization: initialData?.specialization || "",
    experience: initialData?.experience || "",
    location: initialData?.location || "",
    summary: initialData?.summary || ""
  });

  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.specialization || !formData.location || !formData.experience) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Name *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        placeholder="Specialization *"
        value={formData.specialization}
        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
        required
      />
      <Input
        placeholder="Experience (e.g., 4 years, four years, Senior) *"
        value={formData.experience}
        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        required
      />
      <Input
        placeholder="Location *"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />
      <Input
        placeholder="Summary (optional)"
        value={formData.summary}
        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
      />
      <Button type="submit" className="w-full">
        {initialData ? "Update Doctor" : "Add Doctor"}
      </Button>
    </form>
  );
};