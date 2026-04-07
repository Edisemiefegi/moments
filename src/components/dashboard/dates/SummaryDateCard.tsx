import Card from "@/components/base/Card";
import { Button } from "@/components/ui/button";
import type { DateType } from "@/types";
import {
  CalendarHeart,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  RotateCw,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../TimeLineCard";
import { useStore } from "@/store/Store";
import { useMoments } from "@/hooks/useMoments";

interface Props {
  content: DateType;
}

export default function SummaryDateCard({ content }: Props) {
  const navigate = useNavigate();
  const { currentUser } = useStore();
  const { acceptDate, declineDate, rescheduleDate } = useMoments();

  const receiver = currentUser?.userid == content?.receiverId;

  const handleAccept = async () => {
    if (!content.id) return;
    await acceptDate(content.id);
  };

  const handleDecline = async () => {
    if (!content.id) return;
    await declineDate(content.id);
  };

  const handleReschedule = async () => {
    if (!content.id) return;
    await rescheduleDate(content.id);
  };

  return (
    <Card className="space-y-3 hover:border-primary/30 hover:border">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">
            {content.title}{" "}
            <span className="bg-green-100 text-green-600 text-xs p-1 px-2 rounded-full">
              {content.status}
            </span>
          </p>
          <p className="text-xs text-text">with {content.sendTo}</p>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/dates/${content.id}`)}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Details */}
      <div className="text-sm text-text flex flex-wrap gap-4">
        <p className="flex gap-1 items-center">
          <CalendarHeart size={15} />
          {formatDate(content.date)}
        </p>
        <p className="flex gap-1 items-center">
          <Clock size={15} /> {content.time}
        </p>
        <p className="flex gap-1 items-center">
          <MapPin size={15} /> {content.location}
        </p>
      </div>

      {content.status === "pending" && receiver && (
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={handleAccept}>
            <Check /> Accept
          </Button>

          <Button variant="secondary" onClick={handleDecline}>
            <X /> Decline
          </Button>

          <Button variant="ghost" onClick={handleReschedule}>
            <RotateCw /> Reschedule
          </Button>
        </div>
      )}
    </Card>
  );
}
