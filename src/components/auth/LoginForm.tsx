import { ArrowRight, Eye, Mail } from "lucide-react";
import FormFields from "../base/FormFields";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthSchemaType } from "@/schema/auth";
import { useAuth } from "@/hooks/useAuth";
import {  toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { signin } = useAuth();


  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

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

  const onSubmit = async (data: AuthSchemaType) => {
    try {
      setLoading(true);
      await signin(data);
      toast.success("login successfull"); 
      navigate('/dashboard')     
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-8">
        {fields.map((field) => (
          <FormFields
            key={field.name}
            control={form.control}
            fieldItem={field}
          />
        ))}
        <Button loading={loading} className="w-full">
          Sign In <ArrowRight />
        </Button>
      </form>
      <p className="text-sm text-center text-primary">Forgot password?</p>
    </div>
  );
}
