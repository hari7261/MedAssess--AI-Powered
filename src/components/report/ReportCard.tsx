import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatRiskLevel } from "@/utils/riskUtils";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

interface ReportCardProps {
  formData: {
    name: string;
    age: string;
    gender: string;
    familyHistory: string;
    smoking: string;
    alcohol: string;
    physicalActivity: string;
  };
  riskLevel: string;
}

export const ReportCard = ({ formData, riskLevel }: ReportCardProps) => {
  const { toast } = useToast();

  const generateImage = async () => {
    const reportContent = document.getElementById('report-card');
    if (reportContent) {
      try {
        const canvas = await html2canvas(reportContent);
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `health-report-${formData.name}.png`;
        link.click();
        
        toast({
          title: "Report Downloaded",
          description: "Your risk assessment report has been downloaded as an image.",
        });
      } catch (error) {
        toast({
          title: "Download Failed",
          description: "There was an error generating your report. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="p-6 max-w-xl mx-auto bg-white" id="report-card">
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-medical-primary">Cancer Risk Assessment Report</h3>
          <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-medical-dark">Personal Information</h4>
              <p>Name: {formData.name}</p>
              <p>Age: {formData.age}</p>
              <p>Gender: {formData.gender}</p>
            </div>
            <div>
              <h4 className="font-semibold text-medical-dark">Risk Assessment</h4>
              <p className={`font-bold ${
                riskLevel === "High" ? "text-red-600" :
                riskLevel === "Moderate" ? "text-yellow-600" :
                "text-green-600"
              }`}>
                Risk Level: {riskLevel}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-medical-dark">Lifestyle Factors</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Family History: {formData.familyHistory === "yes" ? "Present" : "None"}</li>
              <li>Smoking: {formData.smoking === "yes" ? "Yes" : "No"}</li>
              <li>Alcohol Consumption: {formData.alcohol === "yes" ? "Yes" : "No"}</li>
              <li>Regular Physical Activity: {formData.physicalActivity === "yes" ? "Yes" : "No"}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-medical-dark">Recommendations</h4>
            {formatRiskLevel(riskLevel)}
          </div>
        </div>
      </div>

      <Button 
        onClick={generateImage}
        className="mt-6 w-full bg-medical-accent hover:bg-medical-accent/90"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Report as Image
      </Button>
    </Card>
  );
};