import Card from "@/components/base/Card";
import Modal from "@/components/base/Modal";
import InputField from "@/components/base/Input";
import TextAreaField from "@/components/base/TextAreaField";
import {
  CalendarPlus,
  Gift,
  Heart,
  MapPin,
  Calendar,
  Clock,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

function PlanDateModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      header={
        <div>
          <p className="text-lg font-semibold flex items-center gap-2">
            <CalendarPlus className="text-primary" /> Plan a Date
          </p>
          <p className="text-sm text-text">Create something unforgettable</p>
        </div>
      }
    >
      <div className="space-y-4">
        <Card className="bg-background! border p-4!">
          <div className="flex gap-2 items-center ">
            <Gift className="text-primary" size={14} />
            <span>
              <p className="text-sm">Surprise Reveal</p>
              <p className="text-xs font-light">
                Hide details for a step-by-step reveal
              </p>
            </span>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Date Title"
            prepend={<Heart size={16} />}
            placeholder="Sunset Adventure"
          />

          <InputField
            label="Send to"
            prepend={<Send size={16} />}
            placeholder="Username or email"
          />
        </div>

        <InputField
          label="Location"
          prepend={<MapPin size={16} />}
          placeholder="The Rooftop Garden, Downtown"
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Date"
            prepend={<Calendar size={16} />}
            placeholder="dd/mm/yyyy"
          />

          <InputField
            label="Time"
            prepend={<Clock size={16} />}
            placeholder="--:--"
          />
        </div>

        <InputField
          label="Activity"
          placeholder="Dinner, stargazing, and slow dancing"
        />

        <TextAreaField
          label="Personal Message"
          placeholder="I can't wait for this night with you..."
        />

        <Button className="w-full">
          <Send size={16} /> Send Date Invite
        </Button>
      </div>
    </Modal>
  );
}

export default PlanDateModal;
