import { Heart } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { timelineSchema, type TimelineSchemaType } from "@/schema/dashboard";
import FormFields from "../base/FormFields";
import { Button } from "../ui/button";
import { useMoments } from "@/hooks/useMoments";
import type { Timeline } from "@/types";
import Modal from "../base/Modal";

interface Props {
  open: boolean;
  close: () => void;
  editData?: Timeline;
}

function TimeLineForm({ close, editData, open }: Props) {
  const [loading, setLoading] = useState(false);
  const { addTimeline, updateTimeline } = useMoments();

  const form = useForm<TimelineSchemaType>({
    resolver: zodResolver(timelineSchema),
    defaultValues: {
      title: editData?.title || "",
      date: editData?.date || new Date(),
      icon: editData?.icon || "heart",
      note: editData?.note || "",
    },
  });

  const fields = [
    {
      name: "title",
      label: "Memory Title",
      fieldType: "input",
      fieldProps: {
        placeholder: "e.g Sunset Picnic at the lake",
      },
    },

    {
      name: "date",
      label: "Date",
      fieldType: "date",
    },
    {
      name: "icon",
      label: "Choose an Icon",
      fieldType: "icon",
      fieldProps: {
        placeholder: "you@example.com",
      },
    },

    {
      name: "note",
      label: "Your Note",
      fieldType: "textarea",
      fieldProps: {
        placeholder: "Write about this special moment..",
      },
    },
    {
      name: "photos",
      label: "Photos",
      fieldType: "file",
      fieldProps: {
        placeholder: "you@example.com",
      },
    },
  ] as const;

  const onSubmit = async (data: TimelineSchemaType) => {
    try {
      setLoading(true);

      if (editData?.id) {
        await updateTimeline(editData.id, data);
      } else {
        await addTimeline(data);
      }

      form.reset();
      close();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closeForm = () => {
    form.reset();
    close();
  };

  return (
    <Modal
      open={open}
      onClose={closeForm}
      header={
        <p className="flex gap-1  font-medium text-xl">
          <Heart className="text-primary" />{" "}
          {editData ? "Edit Memory" : "New Memory"}
        </p>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-8">
        {fields.map((field: any) => (
          <FormFields
            key={field.name}
            control={form.control}
            fieldItem={field}
          />
        ))}

        <div className="grid grid-cols-4 gap-3">
          <Button loading={loading} className="col-span-3">
            <Heart /> Save Memory
          </Button>
          <Button
            onClick={closeForm}
            className="col-span-1"
            variant={"outline"}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default TimeLineForm;
