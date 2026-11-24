import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  label?: string;
}

export default function Input({
  append,
  prepend,
  className,
  label,
  type,
  ...props
}: InputProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      {label && <p className="mb-1 text-sm font-medium">{label}</p>}
      <div className="flex items-center gap-2  h-9 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-base outline-none">
        {prepend && <span className="text-text">{prepend}</span>}

        <input
          data-slot="input"
          className={cn(
            "flex-1 bg-transparent outline-none border-none",
            className,
          )}
          {...props}
          type={isPassword && visible ? "text" : type}
        />
        {isPassword && (
          <button
            type="button"
            className="text-text cursor-pointer"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        {append && <span> {append}</span>}
      </div>
    </div>
  );
}
