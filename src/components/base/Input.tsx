import { cn } from "@/lib/utils"
import React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  append?: React.ReactNode
  prepend?: React.ReactNode
}

export default function Input({
  append,
  prepend,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex items-center gap-2  h-9 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-base outline-none"
>
     <span className="text-text">
         {prepend}
     </span>

      <input
        data-slot="input"
        className={cn('flex-1 bg-transparent outline-none border-none',
          className
        )}
        {...props}
      />

      {append}
    </div>
  )
}