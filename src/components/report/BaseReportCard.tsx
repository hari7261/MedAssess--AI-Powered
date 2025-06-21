import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertOctagon, Info, ShieldCheck, ShieldAlert } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

interface BaseReportCardProps {
  formData: {
    name: string;
    age: string | number;
    gender: string;
    contactNumber?: string;
    medicalHistory?: string;
  };
  riskLevel: string;
  assessmentType: string;
  recommendations: string[];
  diseaseInfo: {
    description: string;
    causes: string[];
    preventions: string[];
  };
  symptoms?: Record<string, string>;
}

export const BaseReportCard = ({
  formData,
  riskLevel,
  assessmentType,
  recommendations,
  diseaseInfo,
  symptoms
}: BaseReportCardProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    setIsLoading(true); // Start loading spinner

    const reportContent = document.getElementById('report-card');
    const downloadButton = document.getElementById('download-button');

    if (reportContent) {
      try {
        // Hide the download button before generating the image
        if (downloadButton) {
          downloadButton.style.display = 'none';
        }

        const canvas = await html2canvas(reportContent, {
          scrollY: -window.scrollY, // Fix any issues caused by scrolling
          scrollX: -window.scrollX,
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `${assessmentType.toLowerCase()}-report-${formData.name}.png`;
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
      } finally {
        setIsLoading(false); // Stop loading spinner
        if (downloadButton) {
          downloadButton.style.display = 'block'; // Show the button again
        }
      }
    }
  };

  return (
    <Card className="p-6 max-w-xl mx-auto bg-white relative" id="report-card">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none rotate-[-30deg] text-6xl font-bold text-gray-400 z-0">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">MedAssess</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">MedAssess</div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">MedAssess</div>
      </div>

      <div className="space-y-4 z-10">
        <div className="text-center mb-6 relative">
          {riskLevel === "High" ? (
            <AlertOctagon className="h-8 w-8 text-red-500 mx-auto mb-2" />
          ) : riskLevel === "Moderate" ? (
            <ShieldAlert className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          ) : (
            <ShieldCheck className="h-8 w-8 text-green-500 mx-auto mb-2" />
          )}
          <h3 className="text-2xl font-bold text-medical-primary">{assessmentType} Risk Assessment Report</h3>
          <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-medical-dark flex items-center gap-2">
              <Info className="h-4 w-4" /> Personal Information
            </h4>
            <p>Name: {formData.name}</p>
            <p>Age: {formData.age}</p>
            <p>Gender: {formData.gender}</p>
            {formData.contactNumber && <p>Contact: {formData.contactNumber}</p>}
            {formData.medicalHistory && <p>Medical History: {formData.medicalHistory}</p>}
          </div>
          <div>
            <h4 className="font-semibold text-medical-dark">Risk Assessment</h4>
            <p className={`font-bold ${riskLevel === "High" ? "text-red-600" :
              riskLevel === "Moderate" ? "text-yellow-600" :
                "text-green-600"
              }`}>
              Risk Level: {riskLevel}
            </p>
            {(riskLevel === "High" || riskLevel === "Moderate") && (
              <div className="mt-2 text-red-600 text-sm font-medium">
                ⚠️ Immediate medical attention recommended!
                <div className="mt-1">
                  <Link to="/doctors" className="text-medical-primary hover:underline">Find a Doctor</Link>
                  {" or "}
                  <Link to="/hospitals" className="text-medical-primary hover:underline">Locate Hospitals</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {symptoms && Object.keys(symptoms).length > 0 && (
          <div>
            <h4 className="font-semibold text-medical-dark flex items-center gap-2">
              <Info className="h-4 w-4" /> Reported Symptoms
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {Object.entries(symptoms).map(([symptom, value]) => (
                <li key={symptom} className="text-gray-600">
                  {symptom.split(/(?=[A-Z])/).join(" ")}: {value}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-medical-dark flex items-center gap-2">
            <Info className="h-4 w-4" /> About {assessmentType}
          </h4>
          <p className="text-gray-600 mt-2">{diseaseInfo.description}</p>

          <h5 className="font-semibold text-medical-dark mt-4 flex items-center gap-2">
            <AlertOctagon className="h-4 w-4" /> Common Causes:
          </h5>
          <ul className="list-disc pl-5 space-y-1">
            {diseaseInfo.causes.map((cause, index) => (
              <li key={index} className="text-gray-600">{cause}</li>
            ))}
          </ul>

          <h5 className="font-semibold text-medical-dark mt-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Prevention Methods:
          </h5>
          <ul className="list-disc pl-5 space-y-1">
            {diseaseInfo.preventions.map((prevention, index) => (
              <li key={index} className="text-gray-600">{prevention}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-medical-dark flex items-center gap-2">
            <Info className="h-4 w-4" /> Recommendations
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-gray-600">{recommendation}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button with Medical Look and Loading Indicator */}
      <Button
        onClick={generateImage}
        className="mt-6 w-full bg-medical-accent hover:bg-medical-accent/90 text-white font-semibold text-lg py-2 rounded-full flex justify-center items-center"
        id="download-button"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
        ) : (
          <>
            <Download className="mr-2 h-5 w-5" />
            Download Report as Image
          </>
        )}
      </Button>
    </Card>
  );
};
