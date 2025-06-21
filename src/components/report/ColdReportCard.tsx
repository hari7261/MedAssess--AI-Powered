import { BaseReportCard } from "./BaseReportCard";

interface ColdReportCardProps {
  formData: any;
  riskLevel: string;
  symptoms: Record<string, string>;
}

export const ColdReportCard = ({ formData, riskLevel, symptoms }: ColdReportCardProps) => {
  const coldInfo = {
    description: "The common cold is a viral infection of the upper respiratory tract. While usually mild, it can lead to complications in vulnerable individuals.",
    causes: [
      "Rhinovirus infection",
      "Other respiratory viruses",
      "Close contact with infected people",
      "Touching contaminated surfaces",
      "Weakened immune system",
      "Cold weather exposure",
      "Lack of sleep"
    ],
    preventions: [
      "Regular hand washing",
      "Avoid touching face",
      "Stay away from sick people",
      "Maintain good hygiene",
      "Get adequate sleep",
      "Eat a balanced diet",
      "Exercise regularly",
      "Manage stress levels"
    ]
  };

  const getRecommendations = (risk: string) => {
    const baseRecommendations = [
      "Rest adequately",
      "Stay hydrated",
      "Use over-the-counter remedies",
      "Practice good hygiene"
    ];

    const highRiskAdditions = [
      "⚠️ Seek immediate medical attention",
      "Monitor temperature",
      "Watch for complications",
      "Consider prescription medication",
      "Use humidifier"
    ];

    const moderateRiskAdditions = [
      "⚠️ Consult healthcare provider",
      "Monitor symptoms",
      "Use decongestants",
      "Rest voice if needed"
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
      assessmentType="Common Cold"
      recommendations={getRecommendations(riskLevel)}
      diseaseInfo={coldInfo}
      symptoms={symptoms}
    />
  );
};