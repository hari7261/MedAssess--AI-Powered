import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";

interface StateScheme {
  title: string;
  description: string;
  state: string;
  summary?: string;
  image_url?: string;
  eligibility?: string;
  benefits?: string;
  how_to_apply?: string;
}

interface AddStateSchemeFormProps {
  onSubmit: (scheme: StateScheme) => void;
  isLoading: boolean;
}

export const AddStateSchemeForm = ({ onSubmit, isLoading }: AddStateSchemeFormProps) => {
  const [newScheme, setNewScheme] = useState<StateScheme>({
    title: "",
    description: "",
    state: "",
    summary: "",
    image_url: "",
    eligibility: "",
    benefits: "",
    how_to_apply: ""
  });
  const { toast } = useToast();

  const checkDuplicateScheme = async () => {
    const { data } = await supabase
      .from("state_schemes")
      .select("*")
      .eq("title", newScheme.title)
      .eq("state", newScheme.state);

    return data && data.length > 0;
  };

  const handleSubmit = async () => {
    if (!newScheme.title || !newScheme.description || !newScheme.state) {
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
        description: "A scheme with the same title and state already exists.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(newScheme);
    setNewScheme({
      title: "",
      description: "",
      state: "",
      summary: "",
      image_url: "",
      eligibility: "",
      benefits: "",
      how_to_apply: ""
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Add New State Scheme</h2>
      <div className="grid grid-cols-1 gap-4">
        <Input
          placeholder="Title *"
          value={newScheme.title}
          onChange={(e) => setNewScheme({ ...newScheme, title: e.target.value })}
        />
        <Input
          placeholder="State *"
          value={newScheme.state}
          onChange={(e) => setNewScheme({ ...newScheme, state: e.target.value })}
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