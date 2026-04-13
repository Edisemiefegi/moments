import FormFields from "@/components/base/FormFields";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useMails } from "@/hooks/useMails";

import { mailSchema, type MailSchemaType } from "@/schema/dashboard";

interface Props {
  selectedStyleId: number;
  onChange?: (data: MailSchemaType) => void;
  onMailCreated?: (sharedId: string) => void;
  values: MailSchemaType;
}
function MailForm({ onChange, onMailCreated, selectedStyleId, values }: Props) {
  const [loading, setLoading] = useState(false);
  const { composeMail } = useMails();

  const form = useForm<MailSchemaType>({
    resolver: zodResolver(mailSchema),
    values,
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      onChange?.(values as MailSchemaType);
    });

    return () => subscription.unsubscribe();
  }, [form, onChange]);

  const fields = [
    {
      name: "subject",
      label: "Subject",
      fieldType: "input",
      fieldProps: {
        placeholder: "A little hint...",
      },
    },
    {
      name: "to",
      label: "Display Name",
      fieldType: "input",
      fieldProps: {
        placeholder: "Their name...",
      },
    },
    {
      name: "username",
      label: "Username",
      fieldType: "input",
      colSpan: 2,
      fieldProps: {
        placeholder: "Their username on Moments (optional)...",
      },
    },
    {
      name: "message",
      label: "Your Letter",
      fieldType: "textarea",
      colSpan: 2,
      fieldProps: {
        placeholder: "Write from the heart...",
        className: "min-h-[200px]",
      },
      icon: <Heart className="h-4 w-4" />,
    },
  ] as const;

  const onSubmit = async (data: MailSchemaType) => {
    try {
      setLoading(true);

      const mail: any = await composeMail(data, selectedStyleId);

      toast.success("Love letter created! Link is ready.");
      form.reset();
      onMailCreated?.(mail?.sharedId);
    } catch (err: any) {
      toast.error("Failed to create letter: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
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
          <Sparkles className="mr-2 h-4 w-4" />
          Create Letter
        </Button>
      </form>
    </div>
  );
}

export default MailForm;
