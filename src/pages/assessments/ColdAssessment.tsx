import { useState } from "react";
import { BaseFormData, BaseQuestionnaire } from "@/components/questionnaires/BaseQuestionnaire";
import { ColdQuestionnaire } from "@/components/questionnaires/ColdQuestionnaire";
import { ColdReportCard } from "@/components/report/ColdReportCard";

const ColdAssessment = () => {
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
      <h1 className="text-3xl font-bold mb-6 text-medical-dark">Common Cold Risk Assessment</h1>
      
      {step === 1 && (
        <BaseQuestionnaire onSubmit={handleBaseSubmit} />
      )}
      
      {step === 2 && baseData && (
        <ColdQuestionnaire 
          baseData={baseData}
          onComplete={handleAssessmentComplete}
        />
      )}
      
      {step === 3 && assessmentData && (
        <ColdReportCard 
          formData={assessmentData}
          riskLevel={assessmentData.riskLevel}
          symptoms={assessmentData.symptoms}
        />
      )}
    </div>
  );
};

export default ColdAssessment;