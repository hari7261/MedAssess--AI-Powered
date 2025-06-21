import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  stats?: string;
}

export const ServiceCard = ({ title, description, icon, link, stats }: ServiceCardProps) => {
  return (
    <Link
      to={link}
      className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-medical-primary">{icon}</div>
        {stats && (
          <span className="text-medical-accent font-bold text-lg">{stats}</span>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="mt-4">
        <span className="text-medical-primary hover:text-medical-dark">
          Learn More →
        </span>
      </div>
    </Link>
  );
};