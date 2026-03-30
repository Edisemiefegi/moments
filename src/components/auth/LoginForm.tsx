import { ArrowRight, Eye, Mail } from "lucide-react";
import FormFields from "../base/FormFields";
import { Button } from "../ui/button";

export default function LoginForm() {
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

  return (
    <form className="space-y-4 pt-8">
      {fields.map((field) => (
        <FormFields field={field} />
      ))}
      <Button className="w-full">
        Sign In <ArrowRight />
      </Button>
      <p className="text-sm text-center text-primary">Forgot password?</p>
    </form>
  );
}
