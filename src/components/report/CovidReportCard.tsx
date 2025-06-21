import { BaseReportCard } from "./BaseReportCard";

interface CovidReportCardProps {
  formData: any;
  riskLevel: string;
  symptoms: Record<string, string>;
}

export const CovidReportCard = ({ formData, riskLevel, symptoms }: CovidReportCardProps) => {
  const covidInfo = {
    description: "COVID-19 is a highly contagious respiratory illness caused by the SARS-CoV-2 virus. Early detection and isolation are crucial to prevent spread.",
    causes: [
      "Exposure to SARS-CoV-2 virus",
      "Close contact with infected person",
      "Airborne transmission",
      "Crowded indoor spaces",
      "Poor ventilation",
      "Not following safety protocols"
    ],
    preventions: [
      "Get vaccinated",
      "Wear masks in high-risk areas",
      "Practice social distancing",
      "Maintain good hand hygiene",
      "Ensure proper ventilation",
      "Regular testing if exposed",
      "Isolate if infected",
      "Follow local health guidelines"
    ]
  };

  const getRecommendations = (risk: string) => {
    const baseRecommendations = [
      "Monitor symptoms",
      "Practice isolation",
      "Stay hydrated",
      "Rest adequately"
    ];

    const highRiskAdditions = [
      "⚠️ Seek immediate medical attention",
      "Get COVID-19 testing",
      "Monitor oxygen levels",
      "Watch for severe symptoms",
      "Consider hospitalization"
    ];

    const moderateRiskAdditions = [
      "⚠️ Contact healthcare provider",
      "Get tested for COVID-19",
      "Monitor symptoms closely",
      "Prepare for isolation"
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
      assessmentType="COVID-19"
      recommendations={getRecommendations(riskLevel)}
      diseaseInfo={covidInfo}
      symptoms={symptoms}
    />
  );
};