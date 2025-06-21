import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";

interface Assessment {
  id: string;
  assessment_type: string;
  risk_level: string;
  patient_name: string;
  created_at: string;
}

const AssessmentHistory = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }

    const fetchAssessments = async () => {
      const { data, error } = await supabase
        .from("assessments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching assessments:", error);
        return;
      }

      setAssessments(data || []);
    };

    fetchAssessments();
  }, [session, supabase, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Assessment History</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="p-6">
              <h3 className="text-lg font-semibold mb-2">{assessment.assessment_type}</h3>
              <p className="text-gray-600 mb-1">Patient: {assessment.patient_name}</p>
              <p className="text-gray-600 mb-1">Risk Level: {assessment.risk_level}</p>
              <p className="text-gray-600">
                Date: {new Date(assessment.created_at).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentHistory;