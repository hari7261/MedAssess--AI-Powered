import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

export interface BaseFormData {
  name: string;
  age: string;
  gender: string;
  contactNumber: string;
  medicalHistory: string;
}

interface BaseQuestionnaireProps {
  onSubmit: (baseData: BaseFormData) => void;
}

export const BaseQuestionnaire = ({ onSubmit }: BaseQuestionnaireProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BaseFormData>({
    name: "",
    age: "",
    gender: "",
    contactNumber: "",
    medicalHistory: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender || !formData.contactNumber) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card className="p-6">
      <div className="mb-4 text-red-600 font-bold">
        This tool is not a doctor and is not providing a diagnosis.
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label>Gender *</Label>
          <RadioGroup
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="contactNumber">Contact Number *</Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="medicalHistory">Medical History</Label>
          <Input
            id="medicalHistory"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="Past illnesses, allergies, family medical history"
          />
        </div>

        <Button type="submit" className="w-full">Next</Button>
      </form>
    </Card>
  );
};