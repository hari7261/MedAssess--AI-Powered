import { useState } from "react";
import { BaseFormData, BaseQuestionnaire } from "@/components/questionnaires/BaseQuestionnaire";
import { BreastCancerQuestionnaire } from "@/components/questionnaires/BreastCancerQuestionnaire";
import { CancerReportCard } from "@/components/report/CancerReportCard";

const CancerAssessment = () => {
  const [step, setStep] = useState(1);
  const [baseData, setBaseData] = useState<BaseFormData | null>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  const handleBaseSubmit = (data: BaseFormData) => {
    setBaseData(data);
    setStep(2);
  };

  const handleAssessmentComplete = (data: any) => {
    setAssessmentData(data);
    setStep(3);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-medical-dark">Breast Cancer Risk Assessment (Female only)</h1>

      {step === 1 && (
        <BaseQuestionnaire onSubmit={handleBaseSubmit} />
      )}

      {step === 2 && baseData && (
        <BreastCancerQuestionnaire
          baseData={baseData}
          onComplete={handleAssessmentComplete}
        />
      )}

      {step === 3 && assessmentData && (
        <CancerReportCard
          formData={assessmentData}
          riskLevel={assessmentData.riskLevel}
          symptoms={assessmentData.symptoms}
        />
      )}
    </div>
  );
};

export default CancerAssessment;
