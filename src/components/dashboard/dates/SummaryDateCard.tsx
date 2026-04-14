import Card from "@/components/base/Card";
import { Button } from "@/components/ui/button";
import type { DateType } from "@/types";
import {
  CalendarCheck,
  CalendarHeart,
  Check,
  ChevronRight,
  Clock,
  Info,
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
import { useState } from "react";
import RescheduleModal from "./RescheduleModal";
import RescheduleRequestCard from "./RescheduleRequestCard";

interface Props {
  content: DateType;
}

export default function SummaryDateCard({ content }: Props) {
  const navigate = useNavigate();
  const { currentUser } = useStore();
  const {
    acceptDate,
    declineDate,
    respondToReschedule,
    // markDateAsAddedToCalendar,
  } = useMoments();

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  const isReceiver = currentUser?.userid === content?.receiverId;
  const isSender = currentUser?.userid === content?.senderId;
  const isParticipant = isSender || isReceiver;

  // const hasAddedToCalendar = content.addedToCalendarBy?.includes(
  //   currentUser?.userid || "",
  // );

  const handleAccept = async () => {
    if (!content.id) return;
    await acceptDate(content.id);
  };

  const handleDecline = async () => {
    if (!content.id) return;
    await declineDate(content.id);
  };

  const isAwaitingRescheduleResponse =
    content.status === "reschedule-pending" &&
    content.rescheduleProposerId === currentUser?.userid;

  const isReceivingRescheduleProposal =
    content.status === "reschedule-pending" &&
    content.rescheduleProposerId !== currentUser?.userid &&
    isParticipant;

  const handleAcceptReschedule = async () => {
    if (!content.id) return;
    await respondToReschedule(content.id, "accept");
    toast.success("Reschedule accepted! Date confirmed.");
  };

  const handleDeclineReschedule = async () => {
    if (!content.id) return;
    await respondToReschedule(content.id, "decline");
    toast.info("Reschedule declined.");
  };

  const canProposeReschedule =
    content.status !== "reschedule-pending" && isParticipant;

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

      // await markDateAsAddedToCalendar(content.id, currentUser.userid);

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

      {isReceivingRescheduleProposal ? (
        <RescheduleRequestCard
          dateContent={content}
          onAccept={handleAcceptReschedule}
          onDecline={handleDeclineReschedule}
        />
      ) : isAwaitingRescheduleResponse ? (
        <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
          <Info size={16} />
          <span>
            Waiting for {content.sendTo}'s response to your reschedule
            request...
          </span>
        </div>
      ) : content.status === "pending" && isReceiver ? (
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={handleAccept}>
            <Check /> Accept
          </Button>

          <Button variant="secondary" onClick={handleDecline}>
            <X /> Decline
          </Button>

          <Button
            variant="ghost"
            onClick={() => setShowRescheduleModal(true)}
            disabled={!canProposeReschedule}
          >
            <RotateCw /> Reschedule
          </Button>
        </div>
      ) : content.status === "confirmed" && isParticipant ? (
        <Button
        size={'sm'}
          onClick={handleAddToCalendar}
          className=""
          // disabled={hasAddedToCalendar}
        >
          <CalendarCheck size={18} className="mr-2" />
          <p>Add to Calendar</p>

          {/* {hasAddedToCalendar ? "Added to Calendar" : "Add to Calendar"} */}
        </Button>
      ) : null}

      {showRescheduleModal && (
        <RescheduleModal
          isOpen={showRescheduleModal}
          onClose={() => setShowRescheduleModal(false)}
          dateContent={content}
        />
      )}
    </Card>
  );
}
