import { Button } from "@/components/ui/button";
import { Check, X, Info } from "lucide-react";
import { formatDate } from "../TimeLineCard";
import { useStore } from "@/store/Store";
import type { DateType } from "@/types";
interface RescheduleRequestCardProps {
  dateContent: DateType;
  onAccept: () => void;
  onDecline: () => void;
  isLoading?: boolean;
}

export default function RescheduleRequestCard({
  dateContent,
  onAccept,
  onDecline,
  isLoading = false,
}: RescheduleRequestCardProps) {
  const { currentUser } = useStore();
  const {
    date,
    time,
    proposedDate,
    proposedTime,
    rescheduleMessage,
    rescheduleProposerId,
  } = dateContent;

  if (!proposedDate || !proposedTime) {
    return (
      <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md text-sm">
        <Info size={16} />
        <span>Error: Reschedule request missing proposed date/time.</span>
      </div>
    );
  }

  const whoProposed =
    rescheduleProposerId === currentUser?.userid ? "You" : dateContent.sendTo;

  return (
    <div className="p-4 bg-orange-50 border border-orange-200 rounded-md space-y-3">
      <div className="flex items-center gap-2 text-orange-700 font-medium">
        <Info size={18} />
        <p>{whoProposed} proposed a reschedule!</p>
      </div>

      <div className="text-sm text-gray-700">
        <p className="font-semibold mb-1">Original Date:</p>
        <p>
          {formatDate(date)} at {time}
        </p>

        <p className="font-semibold mt-3 mb-1">Proposed New Date:</p>
        <p className="text-orange-800 font-bold">
          {formatDate(proposedDate)} at {proposedTime}
        </p>

        {rescheduleMessage && (
          <>
            <p className="font-semibold mt-3 mb-1">Message:</p>
            <p className="italic text-gray-600">"{rescheduleMessage}"</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button onClick={onAccept} disabled={isLoading}>
          <Check size={18} className="mr-2" />
          {isLoading ? "Accepting..." : "Accept"}
        </Button>
        <Button variant="secondary" onClick={onDecline} disabled={isLoading}>
          <X size={18} className="mr-2" />
          {isLoading ? "Declining..." : "Decline"}
        </Button>
      </div>
    </div>
  );
}
