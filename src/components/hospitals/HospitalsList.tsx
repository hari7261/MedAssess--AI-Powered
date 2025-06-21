import { Building } from "lucide-react";
import { HorizontalCard } from "@/components/ui/horizontal-card";

interface Hospital {
  id: string;
  name: string;
  location: string;
  state: string;
  type: string;
  treatments?: string[];
  summary?: string;
}

interface HospitalsListProps {
  hospitals: Hospital[];
}

export const HospitalsList = ({ hospitals }: HospitalsListProps) => {
  return (
    <div className="space-y-4">
      {hospitals.map((hospital) => (
        <HorizontalCard
          key={hospital.id}
          title={hospital.name}
          subtitle={hospital.type}
          description={hospital.summary}
          icon={<Building className="w-6 h-6 text-medical-primary" />}
          metadata={[
            { label: "Location", value: `${hospital.location}, ${hospital.state}` },
            ...(hospital.treatments && hospital.treatments.length > 0
              ? [{ label: "Treatments", value: hospital.treatments.join(", ") }]
              : []),
          ]}
        />
      ))}
    </div>
  );
};