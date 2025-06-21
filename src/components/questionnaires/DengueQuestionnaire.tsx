import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BaseFormData } from "./BaseQuestionnaire";

interface DengueSymptoms {
  highFever: string;
  severeHeadache: string;
  eyePain: string;
  jointPains: string;
  rash: string;
  bleeding: string;
  nausea: string;
  fatigue: string;
  abdominalPain: string;
  persistentVomiting: string;
  coldClammySkin: string;
  restlessness: string;
  swollenGlands: string;
  recentTravel: string;
  durationOfStay: string;
  mosquitoExposure: string;
  standingWater: string;
  mosquitoNetUse: string;
  insectRepellentUse: string;
  previousDengue: string;
  contactWithDenguePatient: string;
  chronicConditions: string;
  pregnancy: string;
}

export const DengueQuestionnaire = ({ baseData, onComplete }: {
  baseData: BaseFormData;
  onComplete: (data: any) => void;
}) => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<DengueSymptoms>({
    highFever: "",
    severeHeadache: "",
    eyePain: "",
    jointPains: "",
    rash: "",
    bleeding: "",
    nausea: "",
    fatigue: "",
    abdominalPain: "",
    persistentVomiting: "",
    coldClammySkin: "",
    restlessness: "",
    swollenGlands: "",
    recentTravel: "",
    durationOfStay: "",
    mosquitoExposure: "",
    standingWater: "",
    mosquitoNetUse: "",
    insectRepellentUse: "",
    previousDengue: "",
    contactWithDenguePatient: "",
    chronicConditions: "",
    pregnancy: "",
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

    const riskScore = calculateDengueRisk(symptoms);
    onComplete({
      ...baseData,
      symptoms,
      riskLevel: riskScore,
    });
  };

  const calculateDengueRisk = (symptoms: DengueSymptoms) => {
    let score = 0;
    if (symptoms.highFever === "yes") score += 3;
    if (symptoms.severeHeadache === "yes") score += 2;
    if (symptoms.eyePain === "yes") score += 2;
    if (symptoms.jointPains === "yes") score += 3;
    if (symptoms.rash === "yes") score += 2;
    if (symptoms.bleeding === "yes") score += 4;
    if (symptoms.nausea === "yes") score += 1;
    if (symptoms.fatigue === "yes") score += 1;
    if (symptoms.abdominalPain === "yes") score += 2;
    if (symptoms.persistentVomiting === "yes") score += 3;
    if (symptoms.coldClammySkin === "yes") score += 3;
    if (symptoms.restlessness === "yes") score += 2;
    if (symptoms.swollenGlands === "yes") score += 1;
    if (symptoms.recentTravel === "yes") score += 4;
    if (symptoms.mosquitoExposure === "yes") score += 2;
    if (symptoms.standingWater === "yes") score += 1;
    if (symptoms.previousDengue === "yes") score += 3;
    if (symptoms.contactWithDenguePatient === "yes") score += 2;
    if (symptoms.chronicConditions === "yes") score += 2;
    if (symptoms.pregnancy === "yes") score += 3;

    if (score >= 15) return "High";
    if (score >= 8) return "Moderate";
    return "Low";
  };

  const handleRadioChange = (name: keyof DengueSymptoms, value: string) => {
    setSymptoms(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* High Fever */}
        <div>
          <Label>High fever?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("highFever", value)}
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
          <p className="text-sm text-gray-500 mt-1">
            Why? High fever (often above 104°F or 40°C) is one of the most common and early symptoms of dengue.
          </p>
        </div>

        {/* Severe Headache */}
        <div>
          <Label>Severe headache?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("severeHeadache", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="headache-yes" />
              <Label htmlFor="headache-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="headache-no" />
              <Label htmlFor="headache-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Severe headaches, especially behind the eyes, are a hallmark symptom of dengue.
          </p>
        </div>

        {/* Pain Behind the Eyes */}
        <div>
          <Label>Pain behind the eyes?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("eyePain", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="eye-yes" />
              <Label htmlFor="eye-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="eye-no" />
              <Label htmlFor="eye-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Pain behind the eyes (retro-orbital pain) is a classic symptom of dengue and helps differentiate it from other illnesses.
          </p>
        </div>

        {/* Severe Muscle and Joint Pains */}
        <div>
          <Label>Severe muscle and joint pains?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("jointPains", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="joint-yes" />
              <Label htmlFor="joint-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="joint-no" />
              <Label htmlFor="joint-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Severe muscle and joint pains (often called "breakbone fever") are a key symptom of dengue.
          </p>
        </div>

        {/* Skin Rash */}
        <div>
          <Label>Skin rash?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("rash", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="rash-yes" />
              <Label htmlFor="rash-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="rash-no" />
              <Label htmlFor="rash-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? A rash may appear 2–5 days after the fever starts and is often maculopapular (flat and raised spots).
          </p>
        </div>

        {/* Bleeding */}
        <div>
          <Label>Bleeding (nose, gums) or easy bruising?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("bleeding", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="bleeding-yes" />
              <Label htmlFor="bleeding-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="bleeding-no" />
              <Label htmlFor="bleeding-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Bleeding tendencies (e.g., nosebleeds, gum bleeding) can occur due to low platelet counts in dengue.
          </p>
        </div>

        {/* Nausea */}
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
          <p className="text-sm text-gray-500 mt-1">
            Why? Nausea and vomiting are common in dengue and can lead to dehydration.
          </p>
        </div>

        {/* Fatigue */}
        <div>
          <Label>Fatigue or weakness?</Label>
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
          <p className="text-sm text-gray-500 mt-1">
            Why? Fatigue is common during and after dengue infection due to the body's immune response and potential dehydration.
          </p>
        </div>

        {/* Abdominal Pain */}
        <div>
          <Label>Abdominal pain?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("abdominalPain", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="abdominalPain-yes" />
              <Label htmlFor="abdominalPain-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="abdominalPain-no" />
              <Label htmlFor="abdominalPain-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Severe abdominal pain can indicate complications like dengue hemorrhagic fever or shock syndrome.
          </p>
        </div>

        {/* Persistent Vomiting */}
        <div>
          <Label>Persistent vomiting?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("persistentVomiting", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="persistentVomiting-yes" />
              <Label htmlFor="persistentVomiting-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="persistentVomiting-no" />
              <Label htmlFor="persistentVomiting-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Persistent vomiting can lead to dehydration and is a warning sign of severe dengue.
          </p>
        </div>

        {/* Cold or Clammy Skin */}
        <div>
          <Label>Cold or clammy skin?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("coldClammySkin", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="coldClammySkin-yes" />
              <Label htmlFor="coldClammySkin-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="coldClammySkin-no" />
              <Label htmlFor="coldClammySkin-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Cold or clammy skin can be a sign of dengue shock syndrome, a life-threatening condition.
          </p>
        </div>

        {/* Restlessness */}
        <div>
          <Label>Restlessness or irritability?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("restlessness", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="restlessness-yes" />
              <Label htmlFor="restlessness-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="restlessness-no" />
              <Label htmlFor="restlessness-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Restlessness or irritability can be signs of dengue shock syndrome or severe dehydration.
          </p>
        </div>

        {/* Swollen Glands */}
        <div>
          <Label>Swollen glands?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("swollenGlands", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="swollenGlands-yes" />
              <Label htmlFor="swollenGlands-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="swollenGlands-no" />
              <Label htmlFor="swollenGlands-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Swollen lymph nodes can occur in dengue due to the body's immune response.
          </p>
        </div>

        {/* Recent Travel */}
        <div>
          <Label>Recent travel to a dengue-endemic area?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("recentTravel", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="recentTravel-yes" />
              <Label htmlFor="recentTravel-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="recentTravel-no" />
              <Label htmlFor="recentTravel-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Travel to dengue-endemic areas increases the risk of exposure to the virus.
          </p>
        </div>

        {/* Duration of Stay */}
        <div>
          <Label>Duration of stay in the endemic area?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("durationOfStay", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lessThan1Week" id="duration-lessThan1Week" />
              <Label htmlFor="duration-lessThan1Week">Less than 1 week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-2Weeks" id="duration-1-2Weeks" />
              <Label htmlFor="duration-1-2Weeks">1-2 weeks</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moreThan2Weeks" id="duration-moreThan2Weeks" />
              <Label htmlFor="duration-moreThan2Weeks">More than 2 weeks</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Longer stays in endemic areas increase the risk of exposure to dengue.
          </p>
        </div>

        {/* Mosquito Exposure */}
        <div>
          <Label>Frequent exposure to mosquito bites?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("mosquitoExposure", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="mosquitoExposure-yes" />
              <Label htmlFor="mosquitoExposure-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="mosquitoExposure-no" />
              <Label htmlFor="mosquitoExposure-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Frequent mosquito bites increase the risk of dengue transmission.
          </p>
        </div>

        {/* Standing Water */}
        <div>
          <Label>Is there standing water near your living quarters?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("standingWater", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="standingWater-yes" />
              <Label htmlFor="standingWater-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="standingWater-no" />
              <Label htmlFor="standingWater-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Standing water is a breeding ground for Aedes mosquitoes, which transmit dengue.
          </p>
        </div>

        {/* Mosquito Net Use */}
        <div>
          <Label>Do you sleep under a mosquito net?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("mosquitoNetUse", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="mosquitoNetUse-yes" />
              <Label htmlFor="mosquitoNetUse-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="mosquitoNetUse-no" />
              <Label htmlFor="mosquitoNetUse-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Sleeping under a mosquito net reduces the risk of mosquito bites.
          </p>
        </div>

        {/* Insect Repellent Use */}
        <div>
          <Label>Do you use insect repellent regularly?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("insectRepellentUse", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="insectRepellentUse-yes" />
              <Label htmlFor="insectRepellentUse-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="insectRepellentUse-no" />
              <Label htmlFor="insectRepellentUse-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Regular use of insect repellent reduces the risk of mosquito bites.
          </p>
        </div>

        {/* Previous Dengue */}
        <div>
          <Label>Have you had dengue before?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("previousDengue", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="previousDengue-yes" />
              <Label htmlFor="previousDengue-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="previousDengue-no" />
              <Label htmlFor="previousDengue-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Previous dengue infection increases the risk of severe dengue (due to antibody-dependent enhancement).
          </p>
        </div>

        {/* Contact with Dengue Patient */}
        <div>
          <Label>Have you been in contact with someone diagnosed with dengue?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("contactWithDenguePatient", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="contact-yes" />
              <Label htmlFor="contact-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="contact-no" />
              <Label htmlFor="contact-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Close contact with an infected person increases the risk of exposure to the same mosquito vector.
          </p>
        </div>

        {/* Chronic Conditions */}
        <div>
          <Label>Do you have any chronic health conditions (e.g., diabetes, hypertension)?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("chronicConditions", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="chronicConditions-yes" />
              <Label htmlFor="chronicConditions-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="chronicConditions-no" />
              <Label htmlFor="chronicConditions-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Chronic conditions can worsen the severity of dengue and complicate treatment.
          </p>
        </div>

        {/* Pregnancy */}
        <div>
          <Label>Are you pregnant?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("pregnancy", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="pregnancy-yes" />
              <Label htmlFor="pregnancy-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="pregnancy-no" />
              <Label htmlFor="pregnancy-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Pregnant women are at higher risk of severe dengue, which can affect both the mother and the fetus.
          </p>
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Card>
  );
};