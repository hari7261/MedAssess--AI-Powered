import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";

interface GovernmentScheme {
  title: string;
  description: string;
  summary?: string;
  image_url?: string;
  eligibility?: string;
  benefits?: string;
  how_to_apply?: string;
}

interface AddGovernmentSchemeFormProps {
  onSubmit: (scheme: GovernmentScheme) => void;
  isLoading: boolean;
}

export const AddGovernmentSchemeForm = ({ onSubmit, isLoading }: AddGovernmentSchemeFormProps) => {
  const [newScheme, setNewScheme] = useState<GovernmentScheme>({
    title: "",
    description: "",
    summary: "",
    image_url: "",
    eligibility: "",
    benefits: "",
    how_to_apply: ""
  });
  const { toast } = useToast();

  const checkDuplicateScheme = async () => {
    const { data } = await supabase
      .from("government_schemes")
      .select("*")
      .eq("title", newScheme.title);

    return data && data.length > 0;
  };

  const handleSubmit = async () => {
    if (!newScheme.title || !newScheme.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const isDuplicate = await checkDuplicateScheme();
    if (isDuplicate) {
      toast({
        title: "Scheme Already Exists",
        description: "A scheme with the same title already exists.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(newScheme);
    setNewScheme({
      title: "",
      description: "",
      summary: "",
      image_url: "",
      eligibility: "",
      benefits: "",
      how_to_apply: ""
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Add New Government Scheme</h2>
      <div className="grid grid-cols-1 gap-4">
        <Input
          placeholder="Title *"
          value={newScheme.title}
          onChange={(e) => setNewScheme({ ...newScheme, title: e.target.value })}
        />
        <Textarea
          placeholder="Description *"
          value={newScheme.description}
          onChange={(e) => setNewScheme({ ...newScheme, description: e.target.value })}
        />
        <Input
          placeholder="Image URL"
          value={newScheme.image_url}
          onChange={(e) => setNewScheme({ ...newScheme, image_url: e.target.value })}
        />
        <Textarea
          placeholder="Summary"
          value={newScheme.summary}
          onChange={(e) => setNewScheme({ ...newScheme, summary: e.target.value })}
        />
        <Textarea
          placeholder="Eligibility"
          value={newScheme.eligibility}
          onChange={(e) => setNewScheme({ ...newScheme, eligibility: e.target.value })}
        />
        <Textarea
          placeholder="Benefits"
          value={newScheme.benefits}
          onChange={(e) => setNewScheme({ ...newScheme, benefits: e.target.value })}
        />
        <Textarea
          placeholder="How to Apply"
          value={newScheme.how_to_apply}
          onChange={(e) => setNewScheme({ ...newScheme, how_to_apply: e.target.value })}
        />
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isLoading ? "Adding Scheme..." : "Add Scheme"}
        </Button>
      </div>
    </div>
  );
};