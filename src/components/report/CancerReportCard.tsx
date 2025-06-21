import { BaseReportCard } from "./BaseReportCard";

interface CancerReportCardProps {
  formData: any;
  riskLevel: string;
  symptoms: Record<string, string>;
}

export const CancerReportCard = ({ formData, riskLevel, symptoms }: CancerReportCardProps) => {
  const cancerInfo = {
    description: "Cancer refers to a group of diseases characterized by the uncontrolled growth and spread of abnormal cells. Early detection, prevention, and lifestyle changes can significantly lower the risk of developing many types of cancer.",
    causes: [
      "Tobacco use (smoking and chewing)",
      "Unhealthy diet (high-fat, low-fiber, etc.)",
      "Alcohol consumption",
      "Obesity and lack of physical activity",
      "Exposure to environmental toxins (e.g., asbestos, chemicals)",
      "Radiation exposure",
      "Family history of cancer",
      "Chronic infections (e.g., HPV, Hepatitis B or C)",
      "Age and gender factors",
      "Genetic mutations"
    ],
    preventions: [
      "Quit smoking and avoid tobacco products",
      "Eat a balanced diet (rich in fruits, vegetables, and whole grains)",
      "Maintain a healthy weight",
      "Engage in regular physical activity (at least 150 minutes a week)",
      "Limit alcohol consumption",
      "Regular screenings (e.g., mammograms, colonoscopies)",
      "Protect skin from excessive sun exposure",
      "Vaccination against cancer-related infections (e.g., HPV, Hepatitis)",
      "Avoid exposure to carcinogens",
      "Routine medical check-ups"
    ]
  };

  const getRecommendations = (risk: string) => {
    const baseRecommendations = [
      "Schedule regular cancer screenings based on your risk factors",
      "Maintain a healthy lifestyle with a balanced diet and regular exercise",
      "Avoid exposure to known carcinogens",
      "Consult with your healthcare provider about genetic testing if applicable"
    ];

    const highRiskAdditions = [
      "⚠️ Seek an immediate consultation with an oncologist",
      "Consider genetic counseling and testing",
      "Undergo thorough screening for specific cancer types",
      "Monitor for any unusual lumps, unexplained weight loss, or persistent pain"
    ];

    const moderateRiskAdditions = [
      "⚠️ Schedule a consultation with your primary care physician",
      "Get recommended cancer screenings as per age and family history",
      "Review and adjust lifestyle factors (diet, exercise, alcohol consumption)"
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
      assessmentType="Cancer"
      recommendations={getRecommendations(riskLevel)}
      diseaseInfo={cancerInfo}
      symptoms={symptoms}
    />
  );
};
