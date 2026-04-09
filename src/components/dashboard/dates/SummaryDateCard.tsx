import Card from "@/components/base/Card";
import { Button } from "@/components/ui/button";
import type { DateType } from "@/types";
import {
  CalendarCheck,
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
import { cn, downloadICS, generateICS } from "@/lib/utils";
import { toast } from "react-toastify";

interface Props {
  content: DateType;
}

export default function SummaryDateCard({ content }: Props) {
  const navigate = useNavigate();
  const { currentUser } = useStore();
  const { acceptDate, declineDate, rescheduleDate, markDateAsAddedToCalendar } =
    useMoments();

  const receiver = currentUser?.userid == content?.receiverId;
  const isParticipant =
    currentUser?.userid === content?.senderId ||
    currentUser?.userid === content?.receiverId;

  const hasAddedToCalendar = content.addedToCalendarBy?.includes(
    currentUser?.userid || "",
  );

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

  const handleAddToCalendar = async () => {
    if (
      !content ||
      !currentUser?.email ||
      !currentUser?.userid ||
      !content.id
    ) {
      toast.error(
        "Could not add to calendar. Missing date details, user email, or user ID.",
      );
      return;
    }

    try {
      const icsContent = generateICS(content, currentUser.email);
      downloadICS(icsContent, `${content.title.replace(/\s/g, "-")}-date.ics`);

      await markDateAsAddedToCalendar(content.id, currentUser.userid);

      toast.success("Date added to your calendar!");
    } catch (error) {
      console.error(
        "Error generating, downloading ICS, or marking as added:",
        error,
      );
      toast.error("Failed to add date to calendar.");
    }
  };

  return (
    <Card className="space-y-3 hover:border-primary/30 hover:border">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">
            {content.title}{" "}
            <span
              className={cn(
                `${content.status == "confirmed" ? "bg-green-100 text-green-600" : content.status == "declined" ? "bg-red-100 text-red-600" : content.status == "pending" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"} text-xs p-1 px-2 rounded-full`,
              )}
            >
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

      {content.status === "confirmed" && isParticipant && (
        <Button
          disabled={hasAddedToCalendar}
          onClick={handleAddToCalendar}
          className="w-full"
        >
          <CalendarCheck size={18} className="mr-2" />{" "}
          {hasAddedToCalendar ? "Added to Calendar" : "Add to Calendar"}
        </Button>
      )}
    </Card>
  );
}
