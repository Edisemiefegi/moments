import Card from "@/components/base/Card";
import { Button } from "@/components/ui/button";
import { CalendarHeart, ChevronRight, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

type CardType = {
  title?: string;
  company: string;
  date: string;
  time: string;
  status: string;
  location: string;
  id?: string;
};

interface Props {
  content: CardType;
}
export default function SummaryDateCard({ content }: Props) {
  const navigate = useNavigate();

  return (
    <Card className="space-y-3 hover:border-primary/30 hover:border">
      <div className="flex justify-between">
        <div>
          <p>
            {content.title}{" "}
            <span className="bg-green-100 text-green-600 text-xs p-1 px-2 rounded-full">
              {content.status}
            </span>
          </p>
          <p className="text-xs text-text">with {content.company}</p>
        </div>

        <Button
          variant={"ghost"}
          onClick={() => navigate(`/dashboard/dates/${content.id}`)}
        >
          {" "}
          <ChevronRight />
        </Button>
      </div>
      <div className="text-sm text-text flex flex-wrap  gap-4">
        <p className="flex gap-1 items-center">
          <CalendarHeart size={15} />
          {content.date}
        </p>
        <p className="flex gap-1 items-center">
          <Clock size={15} /> {content.time}
        </p>
        <p className="flex gap-1 items-center">
          <MapPin size={15} /> {content.location}
        </p>
      </div>
    </Card>
  );
}
