import { Heart } from "lucide-react";
import Card from "../base/Card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { timelineSchema, type TimelineSchemaType } from "@/schema/dashboard";
import FormFields from "../base/FormFields";
import { Button } from "../ui/button";
// import { useMoments } from "@/hooks/useMoments";
// import type { Timeline } from "@/types";


interface Props {
  close: () => void;
}

function TimeLineForm({ close }: Props) {
  const [loading, setLoading] = useState(false);
  // const { addTimeline } = useMoments();

  const form = useForm<TimelineSchemaType>({
    resolver: zodResolver(timelineSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      icon: "",
      note: "",
      photos: "",
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
      fieldType: "input",
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
      // await addTimeline(data)
      console.log(data, "datat");
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <p className="flex gap-1  font-medium text-xl">
        <Heart className="text-primary" /> New Memory
      </p>

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
          <Button onClick={close} className="col-span-1" variant={"outline"}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default TimeLineForm;
