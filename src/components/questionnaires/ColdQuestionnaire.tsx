import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BaseFormData } from "./BaseQuestionnaire";

interface ColdSymptoms {
  runnyNose: string;
  sneezing: string;
  soreThroat: string;
  cough: string;
  mildFever: string;
  discomfort: string;
}

export const ColdQuestionnaire = ({ baseData, onComplete }: {
  baseData: BaseFormData;
  onComplete: (data: any) => void;
}) => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<ColdSymptoms>({
    runnyNose: "",
    sneezing: "",
    soreThroat: "",
    cough: "",
    mildFever: "",
    discomfort: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(symptoms).some(value => !value)) {
      toast({
        title: "Required Fields",
        description: "Please answer all questions.",
        variant: "destructive",
      });
      return;
    }
    
    const riskScore = calculateColdRisk(symptoms);
    onComplete({
      ...baseData,
      symptoms,
      riskLevel: riskScore,
    });
  };

  const calculateColdRisk = (symptoms: ColdSymptoms) => {
    let score = 0;
    if (symptoms.runnyNose === "yes") score += 2;
    if (symptoms.sneezing === "yes") score += 2;
    if (symptoms.soreThroat === "yes") score += 2;
    if (symptoms.cough === "yes") score += 2;
    if (symptoms.mildFever === "yes") score += 3;
    if (symptoms.discomfort === "yes") score += 1;
    
    
    if (score >= 9) return "High";
    if (score >= 6) return "Moderate";
    return "Low";
  };

  const handleRadioChange = (name: keyof ColdSymptoms, value: string) => {
    setSymptoms(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Runny or stuffy nose?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("runnyNose", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="nose-yes" />
              <Label htmlFor="nose-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="nose-no" />
              <Label htmlFor="nose-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Frequent sneezing?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("sneezing", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="sneeze-yes" />
              <Label htmlFor="sneeze-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="sneeze-no" />
              <Label htmlFor="sneeze-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Sore throat?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("soreThroat", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="throat-yes" />
              <Label htmlFor="throat-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="throat-no" />
              <Label htmlFor="throat-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Cough?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("cough", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="cough-yes" />
              <Label htmlFor="cough-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="cough-no" />
              <Label htmlFor="cough-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Mild fever?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("mildFever", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="fever-yes" />
              <Label htmlFor="fever-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="fever-no" />
              <Label htmlFor="fever-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>General discomfort?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("discomfort", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="discomfort-yes" />
              <Label htmlFor="discomfort-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="discomfort-no" />
              <Label htmlFor="discomfort-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Card>
  );
};