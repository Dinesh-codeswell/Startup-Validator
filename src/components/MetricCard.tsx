
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  label?: string;
  className?: string;
}

const MetricCard = ({ title, value, label, className = "" }: MetricCardProps) => {
  return (
    <Card className={`bg-gray-50 ${className}`}>
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {label && <p className="text-sm text-gray-500 mt-1">{label}</p>}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
