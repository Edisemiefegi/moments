
import React, { useState } from "react";
import Modal from "@/components/base/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMoments } from "@/hooks/useMoments";
import { useStore } from "@/store/Store";
import { toast } from "react-toastify"; 
import type { DateType } from "@/types";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  dateContent: DateType;
}

export default function RescheduleModal({
  isOpen,
  onClose,
  dateContent,
}: RescheduleModalProps) {
  const { proposeReschedule } = useMoments();
  const { currentUser } = useStore();

  const [newDate, setNewDate] = useState<string>(
    dateContent.date ? new Date(dateContent.date).toISOString().split("T")[0] : ""
  );
  const [newTime, setNewTime] = useState<string>(dateContent.time || "");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newTime || !dateContent.id || !currentUser?.userid) {
      toast.error("Please select a new date and time.");
      return;
    }

    setIsLoading(true);
    try {
      await proposeReschedule(dateContent.id, {
        proposedDate: new Date(newDate),
        proposedTime: newTime,
        rescheduleMessage: message,
        rescheduleProposerId: currentUser.userid,
      });
      toast.success("Reschedule request sent!");
      onClose();
    } catch (error) {
      console.error("Error proposing reschedule:", error);
      toast.error("Failed to send reschedule request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} header="Propose a New Date/Time">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="newDate" className="block text-sm font-medium text-gray-700">
            New Date
          </Label>
          <Input
            id="newDate"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} 
            required
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <Label htmlFor="newTime" className="block text-sm font-medium text-gray-700">
            New Time
          </Label>
          <Input
            id="newTime"
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            required
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <Label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message (Optional)
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., 'Does this work better for you?'"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Request"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}