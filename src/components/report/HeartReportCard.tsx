import { BaseReportCard } from "./BaseReportCard";

interface HeartReportCardProps {
  formData: any;
  riskLevel: string;
  symptoms: Record<string, string>;
}

export const HeartReportCard = ({ formData, riskLevel, symptoms }: HeartReportCardProps) => {
  const heartInfo = {
    description: "Heart disease encompasses various conditions affecting the heart and blood vessels. Early detection and lifestyle modifications can significantly reduce risks and improve outcomes.",
    causes: [
      "High blood pressure",
      "High cholesterol levels",
      "Smoking and tobacco use",
      "Diabetes",
      "Obesity or being overweight",
      "Physical inactivity",
      "Unhealthy diet",
      "Family history of heart disease",
      "Age and gender factors",
      "Excessive alcohol consumption"
    ],
    preventions: [
      "Regular exercise (at least 30 minutes daily)",
      "Heart-healthy diet (low in saturated fats)",
      "Regular blood pressure monitoring",
      "Cholesterol management",
      "Maintain healthy weight",
      "Quit smoking",
      "Limit alcohol intake",
      "Stress management",
      "Regular medical check-ups",
      "Adequate sleep"
    ]
  };

  const getRecommendations = (risk: string) => {
    const baseRecommendations = [
      "Monitor blood pressure regularly",
      "Follow a heart-healthy diet",
      "Exercise moderately",
      "Manage stress levels"
    ];

    const highRiskAdditions = [
      "⚠️ Seek immediate cardiac evaluation",
      "Get comprehensive heart screening",
      "Consider stress test",
      "Monitor heart rhythm",
      "Create emergency action plan",
      "Review medications with doctor"
    ];

    const moderateRiskAdditions = [
      "⚠️ Schedule cardiology consultation soon",
      "Get heart health screening",
      "Review lifestyle factors",
      "Consider cardiac monitoring"
    ];

    if (risk === "High") {
      return [...baseRecommendations, ...highRiskAdditions];
    } else if (risk === "Moderate") {
      return [...baseRecommendations, ...moderateRiskAdditions];
    }
    return baseRecommendations;
  };

  return (
    <BaseReportCard
      formData={formData}
      riskLevel={riskLevel}
      assessmentType="Heart Disease"
      recommendations={getRecommendations(riskLevel)}
      diseaseInfo={heartInfo}
      symptoms={symptoms}
    />
  );
};