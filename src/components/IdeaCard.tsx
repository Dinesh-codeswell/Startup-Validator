
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";

interface IdeaCardProps {
  title: string;
  status: "Active" | "Archived";
  feedback: string;
  lastUpdated: string;
  onView: () => void;
}

const IdeaCard = ({ title, status, feedback, lastUpdated, onView }: IdeaCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Badge variant={status === "Active" ? "default" : "secondary"}>
                {status}
              </Badge>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{feedback}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{lastUpdated}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" onClick={onView} className="text-blue-600">
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdeaCard;
