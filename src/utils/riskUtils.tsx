export const calculateRisk = (formData: {
  familyHistory: string;
  smoking: string;
  alcohol: string;
  physicalActivity: string;
}) => {
  let riskScore = 0;
  if (formData.familyHistory === "yes") riskScore += 3;
  if (formData.smoking === "yes") riskScore += 2;
  if (formData.alcohol === "yes") riskScore += 2;
  if (formData.physicalActivity === "no") riskScore += 1;
  
  return riskScore > 5 ? "High" : riskScore > 3 ? "Moderate" : "Low";
};

export const formatRiskLevel = (riskLevel: string) => {
  switch (riskLevel) {
    case "High":
      return (
        <ul className="list-disc pl-5 space-y-1 text-red-600">
          <li>Schedule an appointment with your healthcare provider</li>
          <li>Consider genetic counseling</li>
          <li>Make immediate lifestyle changes</li>
        </ul>
      );
    case "Moderate":
      return (
        <ul className="list-disc pl-5 space-y-1 text-yellow-600">
          <li>Regular health check-ups</li>
          <li>Lifestyle modifications</li>
          <li>Monitor any changes in health</li>
        </ul>
      );
    default:
      return (
        <ul className="list-disc pl-5 space-y-1 text-green-600">
          <li>Maintain healthy habits</li>
          <li>Regular screenings as recommended</li>
          <li>Stay informed about prevention</li>
        </ul>
      );
  }
};