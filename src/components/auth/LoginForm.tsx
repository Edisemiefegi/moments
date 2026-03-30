import { ArrowRight, Eye, Mail } from "lucide-react";
import FormFields from "../base/FormFields";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthSchemaType  } from "@/schema/auth";

export default function LoginForm() {

  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema(false)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const fields = [
    {
      name: "email",
      label: "Email",
      fieldType: "input",
      fieldProps: {
        prepend: <Mail size={16} />,
        placeholder: "you@example.com",
      },
    },

    {
      name: "password",
      label: "Password",
      fieldType: "input",
      fieldProps: { prepend: <Eye size={16} />, placeholder: "........" },
    },
  ] as const;

  const onSubmit = (data: AuthSchemaType) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 pt-8"
      >
        {fields.map((field) => (
          <FormFields key={field.name} control={form.control} fieldItem={field} />
        ))}
        <Button className="w-full">
          Sign In <ArrowRight />
        </Button>
      </form>
      <p className="text-sm text-center text-primary">Forgot password?</p>
    </div>
  );
}
