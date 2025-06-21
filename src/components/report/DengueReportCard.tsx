import { BaseReportCard } from "./BaseReportCard";

interface DengueReportCardProps {
  formData: any;
  riskLevel: string;
  symptoms: Record<string, string>;
}

export const DengueReportCard = ({ formData, riskLevel, symptoms }: DengueReportCardProps) => {
  const dengueInfo = {
    description: "Dengue fever is a mosquito-borne viral infection that causes severe flu-like illness. Early recognition and proper medical care can significantly reduce risk of complications.",
    causes: [
      "Bite from infected Aedes mosquito",
      "Living in tropical/subtropical regions",
      "Previous dengue exposure",
      "Rainy season outbreaks",
      "Poor urban planning",
      "Inadequate mosquito control"
    ],
    preventions: [
      "Use mosquito repellent",
      "Wear protective clothing",
      "Install window screens",
      "Remove standing water",
      "Keep surroundings clean",
      "Use bed nets",
      "Community mosquito control",
      "Regular property inspection"
    ]
  };

  const getRecommendations = (risk: string) => {
    const baseRecommendations = [
      "Use mosquito protection",
      "Stay hydrated",
      "Rest adequately",
      "Monitor temperature"
    ];

    const highRiskAdditions = [
      "⚠️ Seek immediate medical attention",
      "Get dengue testing done",
      "Monitor platelet count",
      "Watch for warning signs",
      "Consider hospitalization"
    ];

    const moderateRiskAdditions = [
      "⚠️ Consult healthcare provider",
      "Get blood tests done",
      "Monitor symptoms closely",
      "Increase fluid intake"
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
      assessmentType="Dengue Fever"
      recommendations={getRecommendations(riskLevel)}
      diseaseInfo={dengueInfo}
      symptoms={symptoms}
    />
  );
};