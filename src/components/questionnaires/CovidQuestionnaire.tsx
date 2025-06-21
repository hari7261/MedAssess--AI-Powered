import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BaseFormData } from "./BaseQuestionnaire";

interface CovidSymptoms {
  fever: string;
  cough: string;
  shortnessOfBreath: string;
  lossOfTaste: string;
  fatigue: string;
  soreThroat: string;
  muscleAches: string;
  chills: string;
  headache: string;
  congestion: string;
  nausea: string;
  diarrhea: string;
  rash: string;
  chestPain: string;
  confusion: string;
  bluishLips: string;
  closeContact: string;
  travelHistory: string;
  highRiskEnvironment: string;
  largeGathering: string;
  underlyingConditions: string;
  pregnancy: string;
  vaccinationStatus: string;
  previousTest: string;
  preventiveMeasures: string;
}

export const CovidQuestionnaire = ({ baseData, onComplete }: {
  baseData: BaseFormData;
  onComplete: (data: any) => void;
}) => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<CovidSymptoms>({
    fever: "",
    cough: "",
    shortnessOfBreath: "",
    lossOfTaste: "",
    fatigue: "",
    soreThroat: "",
    muscleAches: "",
    chills: "",
    headache: "",
    congestion: "",
    nausea: "",
    diarrhea: "",
    rash: "",
    chestPain: "",
    confusion: "",
    bluishLips: "",
    closeContact: "",
    travelHistory: "",
    highRiskEnvironment: "",
    largeGathering: "",
    underlyingConditions: "",
    pregnancy: "",
    vaccinationStatus: "",
    previousTest: "",
    preventiveMeasures: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all questions are answered
    const isFormComplete = Object.values(symptoms).every(value => value !== "");
    if (!isFormComplete) {
      toast({
        title: "Required Fields",
        description: "Please answer all questions.",
        variant: "destructive",
      });
      return;
    }

    // Calculate risk score and submit data
    const riskScore = calculateCovidRisk(symptoms);
    onComplete({
      ...baseData,
      symptoms,
      riskLevel: riskScore,
    });

    // Optional: Show success toast
    toast({
      title: "Form Submitted",
      description: "Your responses have been recorded.",
      variant: "default",
    });
  };

  const calculateCovidRisk = (symptoms: CovidSymptoms) => {
    let score = 0;
    if (symptoms.fever === "yes") score += 3;
    if (symptoms.cough === "yes") score += 2;
    if (symptoms.shortnessOfBreath === "yes") score += 3;
    if (symptoms.lossOfTaste === "yes") score += 4;
    if (symptoms.fatigue === "yes") score += 1;
    if (symptoms.soreThroat === "yes") score += 1;
    if (symptoms.muscleAches === "yes") score += 1;
    if (symptoms.chills === "yes") score += 1;
    if (symptoms.headache === "yes") score += 1;
    if (symptoms.congestion === "yes") score += 1;
    if (symptoms.nausea === "yes") score += 1;
    if (symptoms.diarrhea === "yes") score += 1;
    if (symptoms.rash === "yes") score += 1;
    if (symptoms.chestPain === "yes") score += 3;
    if (symptoms.confusion === "yes") score += 3;
    if (symptoms.bluishLips === "yes") score += 3;
    if (symptoms.closeContact === "yes") score += 2;
    if (symptoms.travelHistory === "yes") score += 2;
    if (symptoms.highRiskEnvironment === "yes") score += 2;
    if (symptoms.largeGathering === "yes") score += 2;
    if (symptoms.underlyingConditions === "yes") score += 2;
    if (symptoms.pregnancy === "yes") score += 2;
    if (symptoms.vaccinationStatus === "no") score += 2;

    if (score >= 15) return "High";
    if (score >= 8) return "Moderate";
    return "Low";
  };

  const handleRadioChange = (name: keyof CovidSymptoms, value: string) => {
    setSymptoms(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Existing and Additional Questions */}
        {/* Fever */}
        <div>
          <Label>Do you have a fever or have you had a fever recently? (Fever is a common symptom of COVID-19)</Label>
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
        </div>

        {/* Cough */}
        <div>
          <Label>Do you have a cough? If yes, is it dry or wet? (A dry cough is a hallmark symptom of COVID-19)</Label>
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

        {/* Shortness of Breath */}
        <div>
          <Label>Are you experiencing shortness of breath or difficulty breathing? (Respiratory issues are significant in severe cases)</Label>
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

        {/* Loss of Taste or Smell */}
        <div>
          <Label>Have you lost your sense of taste or smell? (Sudden loss of taste or smell is a distinctive symptom of COVID-19)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("lossOfTaste", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="taste-yes" />
              <Label htmlFor="taste-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="taste-no" />
              <Label htmlFor="taste-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Fatigue */}
        <div>
          <Label>Are you experiencing fatigue or extreme tiredness? (Fatigue is a common symptom of COVID-19)</Label>
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

        {/* Sore Throat */}
        <div>
          <Label>Do you have a sore throat? (A sore throat can be an early symptom of COVID-19)</Label>
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

        {/* Muscle Aches */}
        <div>
          <Label>Do you have muscle or body aches? (Muscle pain is frequently reported by COVID-19 patients)</Label>
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
        </div>

        {/* Chills */}
        <div>
          <Label>Are you experiencing chills or repeated shaking with chills? (These can be signs of the body fighting an infection)</Label>
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
        </div>

        {/* Headache */}
        <div>
          <Label>Do you have a headache? (Headaches are a common symptom, especially in the early stages)</Label>
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
        </div>

        {/* Congestion */}
        <div>
          <Label>Do you have congestion or a runny nose? (While less common, some COVID-19 patients experience nasal symptoms)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("congestion", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="congestion-yes" />
              <Label htmlFor="congestion-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="congestion-no" />
              <Label htmlFor="congestion-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Nausea */}
        <div>
          <Label>Are you experiencing nausea, vomiting, or diarrhea? (Gastrointestinal symptoms can occur in some cases)</Label>
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

        {/* Diarrhea */}
        <div>
          <Label>Are you experiencing diarrhea? (Gastrointestinal symptoms can occur in some cases)</Label>
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
        </div>

        {/* Rash */}
        <div>
          <Label>Have you noticed any skin rashes or discoloration of fingers or toes? (Skin manifestations have been reported in some COVID-19 patients)</Label>
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
        </div>

        {/* Chest Pain */}
        <div>
          <Label>Are you experiencing chest pain or pressure? (This could indicate a severe respiratory or cardiac complication)</Label>
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
        </div>

        {/* Confusion */}
        <div>
          <Label>Are you having trouble staying awake or feeling confused? (These could be signs of low oxygen levels or severe illness)</Label>
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
        </div>

        {/* Bluish Lips */}
        <div>
          <Label>Have you noticed bluish lips or face? (This is a sign of oxygen deprivation and requires immediate medical attention)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("bluishLips", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="bluishLips-yes" />
              <Label htmlFor="bluishLips-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="bluishLips-no" />
              <Label htmlFor="bluishLips-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Close Contact */}
        <div>
          <Label>Have you been in close contact with someone who has tested positive for COVID-19 in the last 14 days? (Close contact increases the risk of transmission)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("closeContact", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="closeContact-yes" />
              <Label htmlFor="closeContact-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="closeContact-no" />
              <Label htmlFor="closeContact-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Travel History */}
        <div>
          <Label>Have you traveled recently, especially to areas with high COVID-19 transmission? (Travel to high-risk areas increases exposure likelihood)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("travelHistory", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="travelHistory-yes" />
              <Label htmlFor="travelHistory-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="travelHistory-no" />
              <Label htmlFor="travelHistory-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* High-Risk Environment */}
        <div>
          <Label>Do you work in a high-risk environment (e.g., healthcare, crowded workplaces)? (Certain occupations have a higher risk of exposure)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("highRiskEnvironment", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="highRiskEnvironment-yes" />
              <Label htmlFor="highRiskEnvironment-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="highRiskEnvironment-no" />
              <Label htmlFor="highRiskEnvironment-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Large Gathering */}
        <div>
          <Label>Have you attended any large gatherings or events recently? (Large gatherings can be hotspots for virus transmission)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("largeGathering", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="largeGathering-yes" />
              <Label htmlFor="largeGathering-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="largeGathering-no" />
              <Label htmlFor="largeGathering-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Underlying Conditions */}
        <div>
          <Label>Do you have any underlying health conditions (e.g., diabetes, heart disease, lung disease, weakened immune system)? (Pre-existing conditions can increase the risk of severe illness)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("underlyingConditions", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="underlyingConditions-yes" />
              <Label htmlFor="underlyingConditions-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="underlyingConditions-no" />
              <Label htmlFor="underlyingConditions-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Pregnancy */}
        <div>
          <Label>Are you currently pregnant? (Pregnant women may be at higher risk for severe COVID-19)</Label>
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
        </div>

        {/* Vaccination Status */}
        <div>
          <Label>Have you been vaccinated against COVID-19? If yes, how many doses and when? (Vaccination status can influence the severity of symptoms and risk of infection)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("vaccinationStatus", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="vaccinationStatus-yes" />
              <Label htmlFor="vaccinationStatus-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="vaccinationStatus-no" />
              <Label htmlFor="vaccinationStatus-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Previous Test */}
        <div>
          <Label>Have you been tested for COVID-19 before? If yes, what was the result? (Previous test results can provide context for current symptoms)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("previousTest", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="previousTest-yes" />
              <Label htmlFor="previousTest-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="previousTest-no" />
              <Label htmlFor="previousTest-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Preventive Measures */}
        <div>
          <Label>Have you been following preventive measures (e.g., wearing masks, social distancing, hand hygiene)? (Compliance with preventive measures can reduce the risk of infection)</Label>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("preventiveMeasures", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="preventiveMeasures-yes" />
              <Label htmlFor="preventiveMeasures-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="preventiveMeasures-no" />
              <Label htmlFor="preventiveMeasures-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Card>
  );
};