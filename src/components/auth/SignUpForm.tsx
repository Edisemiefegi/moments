import { ArrowRight, Eye, Mail, User } from "lucide-react";
import FormFields from "../base/FormFields";
import { Button } from "../ui/button";

export default function SignUpForm() {
  const fields = [
    {
      name: "name",
      label: "Name",
      fieldType: "input",
      fieldProps: {
        prepend: <User size={16} />,
        placeholder: "Your lovely name",
      },
    },
    ,
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
      fieldProps: {
        prepend: <Eye size={16} />,
        placeholder: "Something secret..",
      },
    },
  ] as const;

  return (
    <form className="space-y-4 pt-8">
      {fields.map((field: any) => (
        <FormFields field={field} />
      ))}
      <Button className="w-full">
        Create Account <ArrowRight/>
      </Button>
    </form>
  );
}
