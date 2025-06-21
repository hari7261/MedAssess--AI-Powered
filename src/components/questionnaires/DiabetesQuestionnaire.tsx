import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BaseFormData } from "./BaseQuestionnaire";

interface DiabetesSymptoms {
  increasedThirst: string;
  frequentUrination: string;
  blurredVision: string;
  slowHealing: string;
  weightLoss: string;
  numbness: string;
  fatigue: string;
  frequentInfections: string;
  familyHistory: string;
  prediabetes: string;
  pcos: string;
  highBloodPressure: string;
  highCholesterol: string;
  physicalActivity: string;
  diet: string;
  smokingStatus: string;
  alcoholConsumption: string;
  gestationalDiabetes: string;
  largeBaby: string;
  age: string;
  ethnicity: string;
  sleepDisorders: string;
  gender: string;
}

export const DiabetesQuestionnaire = ({ baseData, onComplete }: {
  baseData: BaseFormData;
  onComplete: (data: any) => void;
}) => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<DiabetesSymptoms>({
    increasedThirst: "no",
    frequentUrination: "no",
    blurredVision: "no",
    slowHealing: "no",
    weightLoss: "no",
    numbness: "no",
    fatigue: "no",
    frequentInfections: "no",
    familyHistory: "no",
    prediabetes: "no",
    pcos: "no",
    highBloodPressure: "no",
    highCholesterol: "no",
    physicalActivity: "no",
    diet: "healthy",
    smokingStatus: "no",
    alcoholConsumption: "no",
    gestationalDiabetes: "no",
    largeBaby: "no",
    age: "under-45",
    ethnicity: "low-risk",
    sleepDisorders: "no",
    gender: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if gender is selected
    if (!symptoms.gender) {
      toast({
        title: "Required Field",
        description: "Please select your gender.",
        variant: "destructive",
      });
      return;
    }

    // Validate only applicable fields
    const requiredFields = [
      "increasedThirst",
      "frequentUrination",
      "blurredVision",
      "slowHealing",
      "weightLoss",
      "numbness",
      "fatigue",
      "frequentInfections",
      "familyHistory",
      "prediabetes",
      "highBloodPressure",
      "highCholesterol",
      "physicalActivity",
      "diet",
      "smokingStatus",
      "alcoholConsumption",
      "age",
      "ethnicity",
      "sleepDisorders",
    ];

    // Add gender-specific fields if applicable
    if (symptoms.gender === "female") {
      requiredFields.push("pcos", "gestationalDiabetes", "largeBaby");
    }

    // Check if all required fields are filled
    const isFormValid = requiredFields.every((field) => symptoms[field as keyof DiabetesSymptoms] !== "");

    if (!isFormValid) {
      toast({
        title: "Required Fields",
        description: "Please answer all questions.",
        variant: "destructive",
      });
      return;
    }

    const riskScore = calculateDiabetesRisk(symptoms);
    onComplete({
      ...baseData,
      symptoms,
      riskLevel: riskScore,
    });
  };

  const calculateDiabetesRisk = (symptoms: DiabetesSymptoms) => {
    let score = 0;
    if (symptoms.increasedThirst === "yes") score += 2;
    if (symptoms.frequentUrination === "yes") score += 2;
    if (symptoms.blurredVision === "yes") score += 2;
    if (symptoms.slowHealing === "yes") score += 3;
    if (symptoms.weightLoss === "yes") score += 2;
    if (symptoms.numbness === "yes") score += 3;
    if (symptoms.fatigue === "yes") score += 2;
    if (symptoms.frequentInfections === "yes") score += 2;
    if (symptoms.familyHistory === "yes") score += 5;
    if (symptoms.prediabetes === "yes") score += 4;
    if (symptoms.pcos === "yes" && symptoms.gender === "female") score += 3;
    if (symptoms.highBloodPressure === "yes") score += 3;
    if (symptoms.highCholesterol === "yes") score += 3;
    if (symptoms.physicalActivity === "no") score += 2;
    if (symptoms.diet === "unhealthy") score += 2;
    if (symptoms.smokingStatus === "yes") score += 2;
    if (symptoms.alcoholConsumption === "yes") score += 2;
    if (symptoms.gestationalDiabetes === "yes" && symptoms.gender === "female") score += 4;
    if (symptoms.largeBaby === "yes" && symptoms.gender === "female") score += 3;
    if (symptoms.age === "45+") score += 3;
    if (symptoms.ethnicity === "high-risk") score += 3;
    if (symptoms.sleepDisorders === "yes") score += 2;

    if (score >= 25) return "High";
    if (score >= 15) return "Moderate";
    return "Low";
  };

  const handleRadioChange = (name: keyof DiabetesSymptoms, value: string) => {
    setSymptoms((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Gender */}
        <div>
          <Label>What is your gender?</Label>
          <p className="text-sm text-gray-500">
            This helps us tailor the assessment to your specific needs.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("gender", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="gender-male" />
              <Label htmlFor="gender-male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="gender-female" />
              <Label htmlFor="gender-female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="gender-other" />
              <Label htmlFor="gender-other">Other</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Increased Thirst */}
        <div>
          <Label>Increased thirst?</Label>
          <p className="text-sm text-gray-500">
            Excessive thirst is a common symptom of high blood sugar levels.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("increasedThirst", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="thirst-yes" />
              <Label htmlFor="thirst-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="thirst-no" />
              <Label htmlFor="thirst-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Frequent Urination */}
        <div>
          <Label>Frequent urination?</Label>
          <p className="text-sm text-gray-500">
            Frequent urination is a sign that your body is trying to remove excess sugar through urine.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("frequentUrination", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="urination-yes" />
              <Label htmlFor="urination-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="urination-no" />
              <Label htmlFor="urination-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Blurred Vision */}
        <div>
          <Label>Blurred vision?</Label>
          <p className="text-sm text-gray-500">
            High blood sugar can cause swelling in the lenses of your eyes, leading to blurred vision.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("blurredVision", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="vision-yes" />
              <Label htmlFor="vision-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="vision-no" />
              <Label htmlFor="vision-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Slow-Healing Wounds */}
        <div>
          <Label>Slow-healing wounds?</Label>
          <p className="text-sm text-gray-500">
            High blood sugar can impair circulation and slow down the healing process.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("slowHealing", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="healing-yes" />
              <Label htmlFor="healing-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="healing-no" />
              <Label htmlFor="healing-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Unexplained Weight Loss */}
        <div>
          <Label>Unexplained weight loss?</Label>
          <p className="text-sm text-gray-500">
            Unexplained weight loss can occur when your body cannot use glucose for energy and starts breaking down fat and muscle.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("weightLoss", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="weight-yes" />
              <Label htmlFor="weight-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="weight-no" />
              <Label htmlFor="weight-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Tingling/Numbness */}
        <div>
          <Label>Tingling/numbness in hands or feet?</Label>
          <p className="text-sm text-gray-500">
            Tingling or numbness can be a sign of nerve damage caused by high blood sugar levels.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("numbness", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="numbness-yes" />
              <Label htmlFor="numbness-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="numbness-no" />
              <Label htmlFor="numbness-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Fatigue */}
        <div>
          <Label>Persistent fatigue?</Label>
          <p className="text-sm text-gray-500">
            Fatigue can occur when your body cannot efficiently use glucose for energy.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("fatigue", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="fatigue-yes" />
              <Label htmlFor="fatigue-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="fatigue-no" />
              <Label htmlFor="fatigue-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Frequent Infections */}
        <div>
          <Label>Frequent infections?</Label>
          <p className="text-sm text-gray-500">
            High blood sugar can weaken the immune system, making you more prone to infections.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("frequentInfections", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="infections-yes" />
              <Label htmlFor="infections-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="infections-no" />
              <Label htmlFor="infections-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Family History */}
        <div>
          <Label>Family history of diabetes?</Label>
          <p className="text-sm text-gray-500">
            A family history of diabetes increases your risk of developing the condition.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("familyHistory", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="family-history-yes" />
              <Label htmlFor="family-history-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="family-history-no" />
              <Label htmlFor="family-history-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Prediabetes */}
        <div>
          <Label>Diagnosed with prediabetes?</Label>
          <p className="text-sm text-gray-500">
            Prediabetes is a strong risk factor for developing Type 2 diabetes.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("prediabetes", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="prediabetes-yes" />
              <Label htmlFor="prediabetes-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="prediabetes-no" />
              <Label htmlFor="prediabetes-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* PCOS (Only for Females) */}
        {symptoms.gender === "female" && (
          <div>
            <Label>If you are female, have you been diagnosed with polycystic ovary syndrome (PCOS)?</Label>
            <p className="text-sm text-gray-500">
              PCOS is associated with insulin resistance and an increased risk of diabetes.
            </p>
            <RadioGroup
              onValueChange={(value) => handleRadioChange("pcos", value)}
              className="mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="pcos-yes" />
                <Label htmlFor="pcos-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="pcos-no" />
                <Label htmlFor="pcos-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* High Blood Pressure */}
        <div>
          <Label>Diagnosed with high blood pressure?</Label>
          <p className="text-sm text-gray-500">
            High blood pressure is often associated with insulin resistance and diabetes.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("highBloodPressure", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="bp-yes" />
              <Label htmlFor="bp-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="bp-no" />
              <Label htmlFor="bp-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* High Cholesterol */}
        <div>
          <Label>Diagnosed with high cholesterol?</Label>
          <p className="text-sm text-gray-500">
            High cholesterol is a risk factor for diabetes and cardiovascular disease.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("highCholesterol", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="cholesterol-yes" />
              <Label htmlFor="cholesterol-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="cholesterol-no" />
              <Label htmlFor="cholesterol-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Physical Activity */}
        <div>
          <Label>Do you engage in regular physical activity?</Label>
          <p className="text-sm text-gray-500">
            Regular physical activity helps regulate blood sugar levels and reduces diabetes risk.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("physicalActivity", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="activity-yes" />
              <Label htmlFor="activity-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="activity-no" />
              <Label htmlFor="activity-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Diet */}
        <div>
          <Label>What is your typical diet?</Label>
          <p className="text-sm text-gray-500">
            A diet high in processed foods and low in fruits and vegetables increases diabetes risk.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("diet", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="healthy" id="diet-healthy" />
              <Label htmlFor="diet-healthy">Healthy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unhealthy" id="diet-unhealthy" />
              <Label htmlFor="diet-unhealthy">Unhealthy</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Smoking Status */}
        <div>
          <Label>Do you smoke or use tobacco products?</Label>
          <p className="text-sm text-gray-500">
            Smoking increases the risk of diabetes and its complications.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("smokingStatus", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="smoking-yes" />
              <Label htmlFor="smoking-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="smoking-no" />
              <Label htmlFor="smoking-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Alcohol Consumption */}
        <div>
          <Label>Do you drink alcohol? If yes, how many drinks per week?</Label>
          <p className="text-sm text-gray-500">
            Excessive alcohol consumption can increase diabetes risk.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("alcoholConsumption", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="alcohol-yes" />
              <Label htmlFor="alcohol-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="alcohol-no" />
              <Label htmlFor="alcohol-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Gestational Diabetes (Only for Females) */}
        {symptoms.gender === "female" && (
          <div>
            <Label>If you are female, have you been diagnosed with gestational diabetes?</Label>
            <p className="text-sm text-gray-500">
              Gestational diabetes increases the risk of developing Type 2 diabetes later in life.
            </p>
            <RadioGroup
              onValueChange={(value) => handleRadioChange("gestationalDiabetes", value)}
              className="mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="gestational-yes" />
                <Label htmlFor="gestational-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="gestational-no" />
                <Label htmlFor="gestational-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Large Baby (Only for Females) */}
        {symptoms.gender === "female" && (
          <div>
            <Label>If you are female, did you give birth to a baby weighing more than 9 pounds (4.1 kg)?</Label>
            <p className="text-sm text-gray-500">
              A large birth weight can indicate gestational diabetes during pregnancy.
            </p>
            <RadioGroup
              onValueChange={(value) => handleRadioChange("largeBaby", value)}
              className="mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="large-baby-yes" />
                <Label htmlFor="large-baby-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="large-baby-no" />
                <Label htmlFor="large-baby-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Age */}
        <div>
          <Label>Are you 45 years or older?</Label>
          <p className="text-sm text-gray-500">
            The risk of Type 2 diabetes increases with age, especially after 45.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("age", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="45+" id="age-45-plus" />
              <Label htmlFor="age-45-plus">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="under-45" id="age-under-45" />
              <Label htmlFor="age-under-45">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Ethnicity */}
        <div>
          <Label>What is your ethnicity?</Label>
          <p className="text-sm text-gray-500">
            Certain ethnic groups (e.g., African American, Hispanic, Native American, Asian American) have a higher risk of diabetes.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("ethnicity", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high-risk" id="ethnicity-high-risk" />
              <Label htmlFor="ethnicity-high-risk">High-risk group</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low-risk" id="ethnicity-low-risk" />
              <Label htmlFor="ethnicity-low-risk">Low-risk group</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Sleep Disorders */}
        <div>
          <Label>Do you have sleep apnea or other sleep disorders?</Label>
          <p className="text-sm text-gray-500">
            Sleep disorders are linked to insulin resistance and an increased risk of diabetes.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("sleepDisorders", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="sleep-yes" />
              <Label htmlFor="sleep-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="sleep-no" />
              <Label htmlFor="sleep-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Card>
  );
};