import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: Props) {
  return (
    <div className={cn(className, "rounded-xl border border-border shadow-xs sm:p-8 p-4 bg-card")}>
      {children}
    </div>
  );
}

export default Card;
