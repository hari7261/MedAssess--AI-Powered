import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BaseFormData } from "./BaseQuestionnaire";

interface BreastCancerSymptoms {
  lumpOrMass: string;
  nippleChanges: string;
  breastPain: string;
  skinChanges: string;
  nippleDischarge: string;
  familyHistory: string;
  geneticTesting: string;
  mammogramHistory: string;
  unexplainedWeightLoss: string;
  fatigue: string;
  persistentCough: string;
  difficultySwallowing: string;
  changesInBowelHabits: string;
  smokingStatus: string;
  alcoholConsumption: string;
  physicalActivity: string;
  diet: string;
  hormonalTherapy: string;
  reproductiveHistory: string;
}

export const BreastCancerQuestionnaire = ({ baseData, onComplete }: {
  baseData: BaseFormData;
  onComplete: (data: any) => void;
}) => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<BreastCancerSymptoms>({
    lumpOrMass: "",
    nippleChanges: "",
    breastPain: "",
    skinChanges: "",
    nippleDischarge: "",
    familyHistory: "",
    geneticTesting: "",
    mammogramHistory: "",
    unexplainedWeightLoss: "",
    fatigue: "",
    persistentCough: "",
    difficultySwallowing: "",
    changesInBowelHabits: "",
    smokingStatus: "",
    alcoholConsumption: "",
    physicalActivity: "",
    diet: "",
    hormonalTherapy: "",
    reproductiveHistory: "",
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

    const riskScore = calculateBreastCancerRisk(symptoms);
    onComplete({
      ...baseData,
      symptoms,
      riskLevel: riskScore,
    });
  };

  const calculateBreastCancerRisk = (symptoms: BreastCancerSymptoms) => {
    let score = 0;
    if (symptoms.lumpOrMass === "yes") score += 4;
    if (symptoms.nippleChanges === "yes") score += 3;
    if (symptoms.breastPain === "yes") score += 2;
    if (symptoms.skinChanges === "yes") score += 3;
    if (symptoms.nippleDischarge === "yes") score += 3;
    if (symptoms.familyHistory === "yes") score += 5;
    if (symptoms.geneticTesting === "yes") score += 6;
    if (symptoms.mammogramHistory === "yes") score += 2;
    if (symptoms.unexplainedWeightLoss === "yes") score += 2;
    if (symptoms.fatigue === "yes") score += 1;
    if (symptoms.persistentCough === "yes") score += 1;
    if (symptoms.difficultySwallowing === "yes") score += 1;
    if (symptoms.changesInBowelHabits === "yes") score += 1;
    if (symptoms.smokingStatus === "yes") score += 2;
    if (symptoms.alcoholConsumption === "yes") score += 2;
    if (symptoms.physicalActivity === "no") score += 1;
    if (symptoms.diet === "unhealthy") score += 1;
    if (symptoms.hormonalTherapy === "yes") score += 2;
    if (symptoms.reproductiveHistory === "nulliparous") score += 2;

    if (score >= 20) return "High";
    if (score >= 10) return "Moderate";
    return "Low";
  };

  const handleRadioChange = (name: keyof BreastCancerSymptoms, value: string) => {
    setSymptoms(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lump or Mass */}
        <div>
          <Label>Have you noticed a lump or mass in your breast or armpit?</Label>
          <p className="text-sm text-gray-500">
            A lump or mass in the breast or armpit can be a sign of breast cancer. It’s important to report any new or unusual lumps.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("lumpOrMass", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="lump-yes" />
              <Label htmlFor="lump-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="lump-no" />
              <Label htmlFor="lump-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Nipple Changes */}
        <div>
          <Label>Have you noticed any changes in your nipples (e.g., inversion, scaling, or redness)?</Label>
          <p className="text-sm text-gray-500">
            Changes in the nipple, such as inversion, scaling, or redness, can be a sign of breast cancer and should be evaluated.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("nippleChanges", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="nipple-changes-yes" />
              <Label htmlFor="nipple-changes-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="nipple-changes-no" />
              <Label htmlFor="nipple-changes-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Breast Pain */}
        <div>
          <Label>Do you experience persistent pain in your breast or armpit?</Label>
          <p className="text-sm text-gray-500">
            While breast pain is often not related to cancer, persistent or unexplained pain should be checked by a doctor.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("breastPain", value)}
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

        {/* Skin Changes */}
        <div>
          <Label>Have you noticed any changes in the skin of your breast (e.g., dimpling, redness, or thickening)?</Label>
          <p className="text-sm text-gray-500">
            Skin changes, such as dimpling (like an orange peel), redness, or thickening, can be a sign of breast cancer.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("skinChanges", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="skin-changes-yes" />
              <Label htmlFor="skin-changes-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="skin-changes-no" />
              <Label htmlFor="skin-changes-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Nipple Discharge */}
        <div>
          <Label>Have you noticed any nipple discharge (other than breast milk)?</Label>
          <p className="text-sm text-gray-500">
            Nipple discharge, especially if it’s bloody or clear, can be a sign of breast cancer and should be evaluated.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("nippleDischarge", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="discharge-yes" />
              <Label htmlFor="discharge-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="discharge-no" />
              <Label htmlFor="discharge-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Family History */}
        <div>
          <Label>Do you have a family history of breast or ovarian cancer?</Label>
          <p className="text-sm text-gray-500">
            A family history of breast or ovarian cancer, especially in close relatives, increases your risk of developing breast cancer.
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

        {/* Genetic Testing */}
        <div>
          <Label>Have you tested positive for a genetic mutation (e.g., BRCA1, BRCA2)?</Label>
          <p className="text-sm text-gray-500">
            Genetic mutations like BRCA1 or BRCA2 significantly increase the risk of breast and ovarian cancers.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("geneticTesting", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="genetic-yes" />
              <Label htmlFor="genetic-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="genetic-no" />
              <Label htmlFor="genetic-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Mammogram History */}
        <div>
          <Label>Have you ever had a mammogram? If yes, were there any abnormal results?</Label>
          <p className="text-sm text-gray-500">
            Regular mammograms help detect breast cancer early. Abnormal results may require further testing.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("mammogramHistory", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="mammogram-yes" />
              <Label htmlFor="mammogram-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="mammogram-no" />
              <Label htmlFor="mammogram-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Unexplained Weight Loss */}
        <div>
          <Label>Have you experienced unexplained weight loss (e.g., losing 10+ pounds without trying)?</Label>
          <p className="text-sm text-gray-500">
            Unexplained weight loss can sometimes be a sign of cancer or other serious conditions.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("unexplainedWeightLoss", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="weight-loss-yes" />
              <Label htmlFor="weight-loss-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="weight-loss-no" />
              <Label htmlFor="weight-loss-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Fatigue */}
        <div>
          <Label>Do you experience persistent fatigue that doesn’t improve with rest?</Label>
          <p className="text-sm text-gray-500">
            Persistent fatigue can be a symptom of many conditions, including cancer.
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

        {/* Persistent Cough */}
        <div>
          <Label>Do you have a persistent cough that doesn’t go away?</Label>
          <p className="text-sm text-gray-500">
            A persistent cough can sometimes be a sign of lung or other cancers.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("persistentCough", value)}
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

        {/* Difficulty Swallowing */}
        <div>
          <Label>Do you have difficulty swallowing?</Label>
          <p className="text-sm text-gray-500">
            Difficulty swallowing can sometimes be a sign of esophageal or throat cancer.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("difficultySwallowing", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="swallowing-yes" />
              <Label htmlFor="swallowing-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="swallowing-no" />
              <Label htmlFor="swallowing-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Changes in Bowel Habits */}
        <div>
          <Label>Have you noticed any changes in your bowel habits (e.g., blood in stool, persistent diarrhea, or constipation)?</Label>
          <p className="text-sm text-gray-500">
            Changes in bowel habits can sometimes be a sign of colorectal or other cancers.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("changesInBowelHabits", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="bowel-changes-yes" />
              <Label htmlFor="bowel-changes-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="bowel-changes-no" />
              <Label htmlFor="bowel-changes-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Smoking Status */}
        <div>
          <Label>Do you smoke or use tobacco products?</Label>
          <p className="text-sm text-gray-500">
            Smoking is a significant risk factor for many types of cancer, including breast cancer.
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
            Alcohol consumption is a known risk factor for breast cancer.
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

        {/* Physical Activity */}
        <div>
          <Label>How often do you engage in physical activity?</Label>
          <p className="text-sm text-gray-500">
            Regular physical activity can reduce the risk of breast cancer.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("physicalActivity", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="regular" id="activity-regular" />
              <Label htmlFor="activity-regular">Regularly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="occasional" id="activity-occasional" />
              <Label htmlFor="activity-occasional">Occasionally</Label>
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
            A diet high in processed meats and low in fruits and vegetables may increase cancer risk.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("diet", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="healthy" id="diet-healthy" />
              <Label htmlFor="diet-healthy">Healthy (fruits, vegetables, lean proteins)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unhealthy" id="diet-unhealthy" />
              <Label htmlFor="diet-unhealthy">Unhealthy (processed foods, high fat)</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Hormonal Therapy */}
        <div>
          <Label>Have you used hormone replacement therapy (HRT) or oral contraceptives?</Label>
          <p className="text-sm text-gray-500">
            Long-term use of hormonal therapy can increase the risk of breast cancer.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("hormonalTherapy", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hormonal-yes" />
              <Label htmlFor="hormonal-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="hormonal-no" />
              <Label htmlFor="hormonal-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Reproductive History */}
        <div>
          <Label>Have you ever been pregnant?</Label>
          <p className="text-sm text-gray-500">
            Women who have never been pregnant or had their first pregnancy after age 30 may have a higher risk of breast cancer.
          </p>
          <RadioGroup
            onValueChange={(value) => handleRadioChange("reproductiveHistory", value)}
            className="mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="reproductive-yes" />
              <Label htmlFor="reproductive-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="reproductive-no" />
              <Label htmlFor="reproductive-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Card>
  );
};