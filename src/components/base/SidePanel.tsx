import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "left" | "right";
  menu?: string;
  className?: string;
}

export default function SidePanel({
  open,
  onClose,
  children,
  menu = "Notifications",
  position = "right",
  className,
}: SidePanelProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 bg-black/40 z-40 transition-opacity ",
          open ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      />

      <div
        className={cn(
          "fixed sm:w-lg w-full top-0 h-full bg-card z-50 shadow-lg transition-transform duration-300",
          className,
          position === "left" ? "left-0" : "right-0",
          open
            ? "translate-x-0"
            : position === "left"
              ? "-translate-x-full"
              : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b ">
          <h2 className="font-semibold text-lg">{menu}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="h-full overflow-y-auto p-6">{children}</div>
      </div>
    </>
  );
}
