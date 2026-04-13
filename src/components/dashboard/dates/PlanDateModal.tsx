import Card from "@/components/base/Card";
import { Gift, Heart, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { dateSchema, type DateSchemaType } from "@/schema/dashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFields from "@/components/base/FormFields";
import { useMoments } from "@/hooks/useMoments";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  prefillData?: any;
}

function PlanDateModal({ onClose, prefillData }: Props) {
  const [loading, setLoading] = useState(false);
  const { sendDateInvite } = useMoments();


  const getDefaultValues = (data?: any) => ({
    title: data?.title || "",
    location: "",
    date: new Date(),
    time: "00:00",
    activity: data?.activity || "",
    note: "",
    status: "pending",
    sendTo: "",
  });

  const form = useForm<DateSchemaType>({
    resolver: zodResolver(dateSchema),
    defaultValues: getDefaultValues(prefillData),
  });

  useEffect(() => {
    if (prefillData) {
      form.reset(getDefaultValues(prefillData));
    }
  }, [prefillData]);

  const fields = [
    {
      name: "title",
      label: "Date Title",
      fieldType: "input",

      fieldProps: {
        placeholder: "Sunset Adventure",
        prepend: <Heart size={16} />,
      },
    },
    {
      name: "sendTo",
      label: "Send To",
      fieldType: "input",
      fieldProps: {
        placeholder: "Username or email",
        prepend: <Send size={16} />,
      },
    },

    {
      name: "location",
      label: "Location",
      fieldType: "input",
      colSpan: 2,

      fieldProps: {
        placeholder: "The Rooftop Garden, Downtown",
        prepend: <MapPin size={16} />,
      },
    },

    {
      name: "date",
      label: "Date",
      fieldType: "date",
    },
    {
      name: "time",
      label: "Time",
      fieldType: "input",
      fieldProps: {
        prepend: <Clock size={16} />,
        type: "time",
        className:
          "appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
      },
    },

    {
      name: "activity",
      label: "Activity",
      fieldType: "input",
      colSpan: 2,
      fieldProps: {
        placeholder: "Dinner, stargazing, and slow dancing",
      },
    },

    {
      name: "note",
      label: "Personal Message",
      colSpan: 2,
      fieldType: "textarea",
      fieldProps: {
        placeholder: "I can't wait for this night with you...",
      },
    },
  ] as const;

  const onSubmit = async (data: DateSchemaType) => {
    try {
      setLoading(true);
      await sendDateInvite(data);

      form.reset();
      onClose();
    } catch (err: any) {
      toast.error(err.message);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {fields.map((field: any) => (
          <div
            key={field.name}
            className={`${
              field.colSpan ? `col-span-${field.colSpan}` : "col-span-1"
            }`}
          >
            <FormFields control={form.control} fieldItem={field} />
          </div>
        ))}
        <Button loading={loading} className="col-span-2">
          <Send size={16} /> Send Date Invite
        </Button>
      </form>
    </div>
  );
}

export default PlanDateModal;
