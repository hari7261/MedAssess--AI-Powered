import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HorizontalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  metadata?: {
    label: string;
    value: string | number;
  }[];
}

export function HorizontalCard({
  title,
  subtitle,
  description,
  icon,
  imageUrl,
  metadata,
  className,
  ...props
}: HorizontalCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col h-full rounded-2xl overflow-hidden transition-all hover:shadow-lg",
        className
      )}
      {...props}
    >
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/600x400?text=No+Image';
            }}
          />
        </div>
      )}
      <div className="flex flex-col flex-grow p-6">
        {icon && (
          <div className="flex-shrink-0 p-2 bg-medical-primary/10 rounded-lg mb-4 w-fit">
            {icon}
          </div>
        )}
        <div className="flex-grow space-y-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            {subtitle && <p className="text-medical-primary font-medium">{subtitle}</p>}
          </div>
          {description && <p className="text-gray-600">{description}</p>}
          {metadata && metadata.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {metadata.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}