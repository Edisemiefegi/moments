import { ArrowRight, Lock, Mail } from "lucide-react";
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
  const { signin, resetPassword } = useAuth();


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
        type: "email",
        autoComplete: "email",
      },
    },

    {
      name: "password",
      label: "Password",
      fieldType: "input",
      fieldProps: { prepend: <Lock size={16} />, placeholder: "........",
        type: "password",
        autoComplete: "current-password" },
    },
  ] as const;

  const [resetting, setResetting] = useState(false);

  const handleForgotPassword = async () => {
    if (!(await form.trigger("email"))) {
      form.setFocus("email");
      return;
    }

    try {
      setResetting(true);
      await resetPassword(form.getValues("email"));
      toast.success("If that email has an account, a reset link is on its way.");
    } catch (error: any) {
      toast.error(
        error.code === "auth/user-not-found"
          ? "If that email has an account, a reset link is on its way."
          : "Could not send the reset email. Please try again.",
      );
    } finally {
      setResetting(false);
    }
  };

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
      <button
        type="button"
        onClick={handleForgotPassword}
        disabled={resetting}
        className="block mx-auto mt-3 text-sm text-primary hover:underline cursor-pointer disabled:opacity-50"
      >
        Forgot password?
      </button>
    </div>
  );
}
