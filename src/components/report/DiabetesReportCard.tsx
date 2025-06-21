import { BaseReportCard } from "./BaseReportCard";

interface DiabetesReportCardProps {
  formData: any;
  riskLevel: string;
  symptoms: Record<string, string>;
}

export const DiabetesReportCard = ({ formData, riskLevel, symptoms }: DiabetesReportCardProps) => {
  const diabetesInfo = {
    description: "Diabetes is a chronic condition affecting how your body processes blood sugar (glucose). Early intervention and lifestyle management are key to preventing complications.",
    causes: [
      "Family history of diabetes",
      "Obesity or being overweight",
      "Physical inactivity",
      "Age (especially over 45)",
      "High blood pressure",
      "Unhealthy diet",
      "Gestational diabetes history",
      "Certain medications"
    ],
    preventions: [
      "Maintain a healthy weight",
      "Regular physical activity",
      "Balanced diet",
      "Blood sugar monitoring",
      "Regular medical check-ups",
      "Stress management",
      "Adequate sleep",
      "Limit processed foods"
    ]
  };

  const getRecommendations = (risk: string) => {
    const baseRecommendations = [
      "Monitor blood sugar levels",
      "Follow a balanced diet",
      "Exercise regularly",
      "Stay hydrated"
    ];

    const highRiskAdditions = [
      "⚠️ Seek immediate endocrinologist consultation",
      "Get comprehensive diabetes screening",
      "Start blood sugar monitoring",
      "Consider diabetes education program",
      "Review medication needs"
    ];

    const moderateRiskAdditions = [
      "⚠️ Schedule doctor appointment",
      "Get diabetes screening",
      "Review diet and exercise",
      "Consider preventive measures"
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
      assessmentType="Diabetes"
      recommendations={getRecommendations(riskLevel)}
      diseaseInfo={diabetesInfo}
      symptoms={symptoms}
    />
  );
};