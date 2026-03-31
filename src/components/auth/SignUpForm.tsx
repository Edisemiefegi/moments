import { ArrowRight, Eye, Mail, User } from "lucide-react";
import FormFields from "../base/FormFields";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthSchemaType } from "@/schema/auth";
import { useAuth } from "@/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
    const navigate = useNavigate()


  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema(true)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  const onSubmit = async (data: AuthSchemaType) => {
    try {
      setLoading(true);
      await signup(data);
      toast.success("signup successfull");
            navigate('/dashboard')     

    } catch (error: any) {
      toast.error(error.message.split(":")[1]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-8">
      <ToastContainer />

      {fields.map((field: any) => (
        <FormFields key={field.name} control={form.control} fieldItem={field} />
      ))}
      <Button loading={loading} className="w-full">
        Create Account <ArrowRight />
      </Button>
    </form>
  );
}
