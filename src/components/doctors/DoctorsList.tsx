import { User } from "lucide-react";
import { HorizontalCard } from "@/components/ui/horizontal-card";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  location: string;
  summary?: string;
  budget?: number | null;
}

interface DoctorsListProps {
  doctors: Doctor[];
}

export const DoctorsList = ({ doctors }: DoctorsListProps) => {
  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <HorizontalCard
          key={doctor.id}
          title={doctor.name}
          subtitle={doctor.specialization}
          description={doctor.summary}
          icon={<User className="w-6 h-6 text-medical-primary" />}
          metadata={[
            { label: "Experience", value: doctor.experience },
            { label: "Location", value: doctor.location },
            { label: "Consultation Fee", value: doctor.budget ? `₹${doctor.budget}` : "Not specified" },
          ]}
        />
      ))}
    </div>
  );
};