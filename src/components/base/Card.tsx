import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: Props) {
  return (
    <div className={cn(className, "rounded-xl shadow-xs p-8 bg-white")}>
      {children}
    </div>
  );
}

export default Card;
