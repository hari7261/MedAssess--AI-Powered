import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BaseFormData } from "./BaseQuestionnaire";

interface MalariaSymptoms {
  fever: string;
  chills: string;
  sweating: string;
  headache: string;
  muscleAches: string;
  nausea: string;
  fatigue: string;
  abdominalPain: string;
  diarrhea: string;
  cough: string;
  chestPain: string;
  jaundice: string;
  darkUrine: string;
  confusion: string;
  seizures: string;
  difficultyBreathing: string;
  recentTravel: string;
  durationOfStay: string;
  malariaProphylaxis: string;
  previousMalaria: string;
  mosquitoExposure: string;
  mosquitoNetUse: string;
  insectRepellentUse: string;
  standingWater: string;
  symptomOnset: string;
  symptomDuration: string;
  symptomSeverity: string;
  bloodTransfusion: string;
  organTransplant: string;
  contactWithMalariaPatient: string;
}

export const MalariaQuestionnaire = ({ baseData, onComplete }: {
  baseData: BaseFormData;
  onComplete: (data: any) => void;
}) => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<MalariaSymptoms>({
    fever: "",
    chills: "",
    sweating: "",
    headache: "",
    muscleAches: "",
    nausea: "",
    fatigue: "",
    abdominalPain: "",
    diarrhea: "",
    cough: "",
    chestPain: "",
    jaundice: "",
    darkUrine: "",
    confusion: "",
    seizures: "",
    difficultyBreathing: "",
    recentTravel: "",
    durationOfStay: "",
    malariaProphylaxis: "",
    previousMalaria: "",
    mosquitoExposure: "",
    mosquitoNetUse: "",
    insectRepellentUse: "",
    standingWater: "",
    symptomOnset: "",
    symptomDuration: "",
    symptomSeverity: "",
    bloodTransfusion: "",
    organTransplant: "",
    contactWithMalariaPatient: "",
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

    const riskScore = calculateMalariaRisk(symptoms);
    onComplete({
      ...baseData,
      symptoms,
      riskLevel: riskScore,
    });
  };

  const calculateMalariaRisk = (symptoms: MalariaSymptoms) => {
    let score = 0;
    if (symptoms.fever === "yes") score += 3;
    if (symptoms.chills === "yes") score += 3;
    if (symptoms.sweating === "yes") score += 2;
    if (symptoms.headache === "yes") score += 2;
    if (symptoms.muscleAches === "yes") score += 2;
    if (symptoms.nausea === "yes") score += 2;
    if (symptoms.fatigue === "yes") score += 1;
    if (symptoms.abdominalPain === "yes") score += 1;
    if (symptoms.diarrhea === "yes") score += 1;
    if (symptoms.cough === "yes") score += 1;
    if (symptoms.chestPain === "yes") score += 1;
    if (symptoms.jaundice === "yes") score += 3;
    if (symptoms.darkUrine === "yes") score += 3;
    if (symptoms.confusion === "yes") score += 3;
    if (symptoms.seizures === "yes") score += 3;
    if (symptoms.difficultyBreathing === "yes") score += 2;
    if (symptoms.recentTravel === "yes") score += 4;
    if (symptoms.previousMalaria === "yes") score += 2;
    if (symptoms.mosquitoExposure === "yes") score += 2;
    if (symptoms.standingWater === "yes") score += 1;

    if (score >= 15) return "High";
    if (score >= 8) return "Moderate";
    return "Low";
  };

  const handleRadioChange = (name: keyof MalariaSymptoms, value: string) => {
    setSymptoms(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fever */}
        <div>
          <Label>Cyclical or recurring fever?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("fever", value)}
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
            Why? Fever is one of the most common symptoms of malaria, often occurring in cycles.
          </p>
        </div>

        {/* Chills */}
        <div>
          <Label>Chills?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("chills", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="chills-yes" />
              <Label htmlFor="chills-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="chills-no" />
              <Label htmlFor="chills-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Chills often accompany fever in malaria and are a classic symptom.
          </p>
        </div>

        {/* Sweating */}
        <div>
          <Label>Excessive sweating?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("sweating", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="sweating-yes" />
              <Label htmlFor="sweating-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="sweating-no" />
              <Label htmlFor="sweating-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Sweating often follows the fever and chills in malaria.
          </p>
        </div>

        {/* Headache */}
        <div>
          <Label>Severe headache?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("headache", value)}
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
            Why? Headaches are a common symptom of malaria due to the body's inflammatory response.
          </p>
        </div>

        {/* Muscle Aches */}
        <div>
          <Label>Muscle aches?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("muscleAches", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="aches-yes" />
              <Label htmlFor="aches-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="aches-no" />
              <Label htmlFor="aches-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Muscle aches are common in malaria due to the infection's systemic effects.
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
            Why? Nausea and vomiting are common in malaria due to the infection's impact on the digestive system.
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
            Why? Fatigue is a common symptom of malaria due to the body's immune response and anemia caused by the infection.
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
            Why? Abdominal pain can occur in malaria due to liver and spleen enlargement.
          </p>
        </div>

        {/* Diarrhea */}
        <div>
          <Label>Diarrhea?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("diarrhea", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="diarrhea-yes" />
              <Label htmlFor="diarrhea-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="diarrhea-no" />
              <Label htmlFor="diarrhea-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Diarrhea can be a symptom of malaria, especially in severe cases.
          </p>
        </div>

        {/* Cough */}
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
          <p className="text-sm text-gray-500 mt-1">
            Why? A cough can occur in malaria due to respiratory involvement or secondary infections.
          </p>
        </div>

        {/* Chest Pain */}
        <div>
          <Label>Chest pain?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("chestPain", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="chestPain-yes" />
              <Label htmlFor="chestPain-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="chestPain-no" />
              <Label htmlFor="chestPain-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Chest pain can occur in severe malaria due to respiratory or cardiac complications.
          </p>
        </div>

        {/* Jaundice */}
        <div>
          <Label>Jaundice (yellowing of the skin or eyes)?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("jaundice", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="jaundice-yes" />
              <Label htmlFor="jaundice-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="jaundice-no" />
              <Label htmlFor="jaundice-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Jaundice is a sign of liver dysfunction, which can occur in severe malaria.
          </p>
        </div>

        {/* Dark Urine */}
        <div>
          <Label>Dark urine?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("darkUrine", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="darkUrine-yes" />
              <Label htmlFor="darkUrine-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="darkUrine-no" />
              <Label htmlFor="darkUrine-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Dark urine can be a sign of severe malaria, particularly in cases of blackwater fever.
          </p>
        </div>

        {/* Confusion */}
        <div>
          <Label>Confusion or altered mental state?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("confusion", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="confusion-yes" />
              <Label htmlFor="confusion-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="confusion-no" />
              <Label htmlFor="confusion-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Confusion can indicate cerebral malaria, a severe and life-threatening complication.
          </p>
        </div>

        {/* Seizures */}
        <div>
          <Label>Seizures?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("seizures", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="seizures-yes" />
              <Label htmlFor="seizures-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="seizures-no" />
              <Label htmlFor="seizures-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Seizures are a sign of severe malaria, particularly in children.
          </p>
        </div>

        {/* Difficulty Breathing */}
        <div>
          <Label>Difficulty breathing?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("difficultyBreathing", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="difficultyBreathing-yes" />
              <Label htmlFor="difficultyBreathing-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="difficultyBreathing-no" />
              <Label htmlFor="difficultyBreathing-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Difficulty breathing can occur in severe malaria due to respiratory distress or anemia.
          </p>
        </div>

        {/* Recent Travel */}
        <div>
          <Label>Recent travel to a malaria-endemic area?</Label>
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
            Why? Travel to malaria-endemic areas increases the risk of infection.
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
            Why? Longer stays in endemic areas increase the risk of exposure to malaria.
          </p>
        </div>

        {/* Malaria Prophylaxis */}
        <div>
          <Label>Did you take malaria prophylaxis (preventive medication)?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("malariaProphylaxis", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="prophylaxis-yes" />
              <Label htmlFor="prophylaxis-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="prophylaxis-no" />
              <Label htmlFor="prophylaxis-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Taking preventive medication reduces the risk of malaria infection.
          </p>
        </div>

        {/* Previous Malaria */}
        <div>
          <Label>History of previous malaria infection?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("previousMalaria", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="previousMalaria-yes" />
              <Label htmlFor="previousMalaria-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="previousMalaria-no" />
              <Label htmlFor="previousMalaria-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Previous infections can increase the risk of recurrence or complications.
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
            Why? Frequent mosquito bites increase the risk of malaria transmission.
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
            Why? Standing water is a breeding ground for mosquitoes.
          </p>
        </div>

        {/* Symptom Onset */}
        <div>
          <Label>When did your symptoms first appear?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("symptomOnset", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lessThan1Week" id="onset-lessThan1Week" />
              <Label htmlFor="onset-lessThan1Week">Less than 1 week ago</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-2Weeks" id="onset-1-2Weeks" />
              <Label htmlFor="onset-1-2Weeks">1-2 weeks ago</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moreThan2Weeks" id="onset-moreThan2Weeks" />
              <Label htmlFor="onset-moreThan2Weeks">More than 2 weeks ago</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Knowing when symptoms started helps determine the progression of the disease.
          </p>
        </div>

        {/* Symptom Duration */}
        <div>
          <Label>How long have your symptoms lasted?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("symptomDuration", value)}
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
            Why? The duration of symptoms helps assess the severity and progression of malaria.
          </p>
        </div>

        {/* Symptom Severity */}
        <div>
          <Label>How severe are your symptoms?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("symptomSeverity", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mild" id="severity-mild" />
              <Label htmlFor="severity-mild">Mild</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="severity-moderate" />
              <Label htmlFor="severity-moderate">Moderate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="severe" id="severity-severe" />
              <Label htmlFor="severity-severe">Severe</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Symptom severity helps determine the urgency of medical intervention.
          </p>
        </div>

        {/* Blood Transfusion */}
        <div>
          <Label>Have you had a recent blood transfusion?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("bloodTransfusion", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="bloodTransfusion-yes" />
              <Label htmlFor="bloodTransfusion-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="bloodTransfusion-no" />
              <Label htmlFor="bloodTransfusion-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Blood transfusions can sometimes transmit malaria.
          </p>
        </div>

        {/* Organ Transplant */}
        <div>
          <Label>Have you had a recent organ transplant?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("organTransplant", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="organTransplant-yes" />
              <Label htmlFor="organTransplant-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="organTransplant-no" />
              <Label htmlFor="organTransplant-no">No</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-gray-500 mt-1">
            Why? Organ transplants can sometimes transmit malaria.
          </p>
        </div>

        {/* Contact with Malaria Patient */}
        <div>
          <Label>Have you been in contact with someone diagnosed with malaria?</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("contactWithMalariaPatient", value)}
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
            Why? Close contact with an infected person can increase the risk of transmission.
          </p>
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Card>
  );
};