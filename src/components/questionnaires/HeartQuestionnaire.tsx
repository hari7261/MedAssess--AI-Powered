import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { BaseFormData } from "./BaseQuestionnaire";

interface HeartSymptoms {
  chestPain: string;
  shortnessOfBreath: string;
  radiatingPain: string;
  nausea: string;
  coldSweats: string;
  dizziness: string;
}

interface HealthMetrics {
  systolicBP: number;
  diastolicBP: number;
  totalCholesterol: number;
  hdlCholesterol: number;
  ldlCholesterol: number;
  diabetesHistory: string;
  smokerStatus: string;
  hypertensionTreatment: string;
  statinUse: string;
  aspirinTherapy: string;
}

export const HeartQuestionnaire = ({ baseData, onComplete }: {
  baseData: BaseFormData;
  onComplete: (data: any) => void;
}) => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<HeartSymptoms>({
    chestPain: "",
    shortnessOfBreath: "",
    radiatingPain: "",
    nausea: "",
    coldSweats: "",
    dizziness: "",
  });

  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    systolicBP: 0,
    diastolicBP: 0,
    totalCholesterol: 0,
    hdlCholesterol: 0,
    ldlCholesterol: 0,
    diabetesHistory: "",
    smokerStatus: "",
    hypertensionTreatment: "",
    statinUse: "",
    aspirinTherapy: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(symptoms).some(value => !value) || Object.values(healthMetrics).some(value => !value)) {
      toast({
        title: "Required Fields",
        description: "Please answer all questions and fill all fields.",
        variant: "destructive",
      });
      return;
    }

    const riskScore = calculateHeartRisk(symptoms, healthMetrics);
    onComplete({
      ...baseData,
      symptoms,
      healthMetrics,
      riskLevel: riskScore,
    });
  };

  const calculateHeartRisk = (symptoms: HeartSymptoms, healthMetrics: HealthMetrics) => {
    let score = 0;
    if (symptoms.chestPain === "yes") score += 4;
    if (symptoms.shortnessOfBreath === "yes") score += 3;
    if (symptoms.radiatingPain === "yes") score += 3;
    if (symptoms.nausea === "yes") score += 2;
    if (symptoms.coldSweats === "yes") score += 2;
    if (symptoms.dizziness === "yes") score += 2;

    if (healthMetrics.systolicBP >= 140) score += 2;
    if (healthMetrics.diastolicBP >= 90) score += 2;
    if (healthMetrics.totalCholesterol >= 240) score += 2;
    if (healthMetrics.hdlCholesterol < 40) score += 1;
    if (healthMetrics.ldlCholesterol >= 160) score += 2;
    if (healthMetrics.diabetesHistory === "yes") score += 3;
    if (healthMetrics.smokerStatus === "current") score += 2;
    if (healthMetrics.hypertensionTreatment === "yes") score += 1;
    if (healthMetrics.statinUse === "yes") score -= 1;
    if (healthMetrics.aspirinTherapy === "yes") score -= 1;

    if (score >= 10) return "High";
    if (score >= 6) return "Moderate";
    return "Low";
  };

  const handleRadioChange = (name: keyof HeartSymptoms, value: string) => {
    setSymptoms(prev => ({ ...prev, [name]: value }));
  };

  const handleHealthMetricChange = (name: keyof HealthMetrics, value: string) => {
    setHealthMetrics(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Chest pain or discomfort?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("chestPain", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="chest-yes" />
              <Label htmlFor="chest-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="chest-no" />
              <Label htmlFor="chest-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Shortness of breath?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("shortnessOfBreath", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="breath-yes" />
              <Label htmlFor="breath-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="breath-no" />
              <Label htmlFor="breath-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Pain radiating to jaw, neck, or left arm?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("radiatingPain", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="pain-yes" />
              <Label htmlFor="pain-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="pain-no" />
              <Label htmlFor="pain-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Nausea or vomiting?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("nausea", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="nausea-yes" />
              <Label htmlFor="nausea-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="nausea-no" />
              <Label htmlFor="nausea-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Cold sweats?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("coldSweats", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="sweats-yes" />
              <Label htmlFor="sweats-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="sweats-no" />
              <Label htmlFor="sweats-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Lightheadedness or dizziness?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("dizziness", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="dizzy-yes" />
              <Label htmlFor="dizzy-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="dizzy-no" />
              <Label htmlFor="dizzy-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Systolic Blood Pressure (mm Hg)</Label>
          <Input
            type="number"
            min="90"
            max="200"
            value={healthMetrics.systolicBP}
            onChange={(e) => handleHealthMetricChange("systolicBP", e.target.value)}
            placeholder="Value must be between 90-200"
          />
        </div>

        <div>
          <Label>Diastolic Blood Pressure (mm Hg)</Label>
          <Input
            type="number"
            min="60"
            max="130"
            value={healthMetrics.diastolicBP}
            onChange={(e) => handleHealthMetricChange("diastolicBP", e.target.value)}
            placeholder="Value must be between 60-130"
          />
        </div>

        <div>
          <Label>Total Cholesterol (mg/dL)</Label>
          <Input
            type="number"
            min="130"
            max="320"
            value={healthMetrics.totalCholesterol}
            onChange={(e) => handleHealthMetricChange("totalCholesterol", e.target.value)}
            placeholder="Value must be between 130-320"
          />
        </div>

        <div>
          <Label>HDL Cholesterol (mg/dL)</Label>
          <Input
            type="number"
            min="20"
            max="100"
            value={healthMetrics.hdlCholesterol}
            onChange={(e) => handleHealthMetricChange("hdlCholesterol", e.target.value)}
            placeholder="Value must be between 20-100"
          />
        </div>

        <div>
          <Label>LDL Cholesterol (mg/dL)</Label>
          <Input
            type="number"
            min="30"
            max="300"
            value={healthMetrics.ldlCholesterol}
            onChange={(e) => handleHealthMetricChange("ldlCholesterol", e.target.value)}
            placeholder="Value must be between 30-300"
          />
        </div>

        <div>
          <Label>History of Diabetes?</Label>
          <RadioGroup
            onValueChange={(value) => handleHealthMetricChange("diabetesHistory", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="diabetes-yes" />
              <Label htmlFor="diabetes-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="diabetes-no" />
              <Label htmlFor="diabetes-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Smoker?</Label>
          <RadioGroup
            onValueChange={(value) => handleHealthMetricChange("smokerStatus", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="current" id="smoker-current" />
              <Label htmlFor="smoker-current">Current</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="former" id="smoker-former" />
              <Label htmlFor="smoker-former">Former</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="never" id="smoker-never" />
              <Label htmlFor="smoker-never">Never</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>On Hypertension Treatment?</Label>
          <RadioGroup
            onValueChange={(value) => handleHealthMetricChange("hypertensionTreatment", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hypertension-yes" />
              <Label htmlFor="hypertension-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="hypertension-no" />
              <Label htmlFor="hypertension-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>On a Statin?</Label>
          <RadioGroup
            onValueChange={(value) => handleHealthMetricChange("statinUse", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="statin-yes" />
              <Label htmlFor="statin-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="statin-no" />
              <Label htmlFor="statin-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>On Aspirin Therapy?</Label>
          <RadioGroup
            onValueChange={(value) => handleHealthMetricChange("aspirinTherapy", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="aspirin-yes" />
              <Label htmlFor="aspirin-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="aspirin-no" />
              <Label htmlFor="aspirin-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Card>
  );
};