import { BaseReportCard } from "./BaseReportCard";

interface MalariaReportCardProps {
  formData: any;
  riskLevel: string;
  symptoms: Record<string, string>;
}

export const MalariaReportCard = ({ formData, riskLevel, symptoms }: MalariaReportCardProps) => {
  const malariaInfo = {
    description: "Malaria is a serious mosquito-borne disease caused by parasites. Prompt diagnosis and treatment are essential to prevent complications.",
    causes: [
      "Bite from infected Anopheles mosquito",
      "Living in or traveling to endemic areas",
      "Poor mosquito control measures",
      "Stagnant water bodies nearby",
      "Lack of protective measures",
      "Outdoor activities in high-risk areas"
    ],
    preventions: [
      "Use mosquito nets",
      "Apply insect repellent",
      "Wear protective clothing",
      "Eliminate standing water",
      "Take antimalarial medication",
      "Install window screens",
      "Use indoor insecticide sprays",
      "Regular property maintenance"
    ]
  };

  const getRecommendations = (risk: string) => {
    const baseRecommendations = [
      "Use mosquito protection",
      "Monitor temperature",
      "Stay hydrated",
      "Rest adequately"
    ];

    const highRiskAdditions = [
      "⚠️ Seek immediate medical care",
      "Get blood test for malaria",
      "Start antimalarial treatment",
      "Monitor complications",
      "Consider hospitalization"
    ];

    const moderateRiskAdditions = [
      "⚠️ Consult healthcare provider",
      "Get malaria testing",
      "Review prevention measures",
      "Monitor symptoms closely"
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
      assessmentType="Malaria"
      recommendations={getRecommendations(riskLevel)}
      diseaseInfo={malariaInfo}
      symptoms={symptoms}
    />
  );
};