import { Bell, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Menu = {
  title: string;
  description?: string;
  icon?: LucideIcon;
};
interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "left" | "right";
  menu?: Menu;
  className?: string;
}

export default function SidePanel({
  open,
  onClose,
  children,
  menu = {
    title: "Notifications",
    icon: Bell,
    description: "Stay up to date with invites, letters, and more.",
  },
  position = "right",
  className,
}: SidePanelProps) {
  const Icon: any = menu?.icon;
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 bg-black/40 z-40 h-full transition-opacity ",
          open ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      />

      <div
        className={cn(
          "fixed sm:w-lg w-full  top-0 h-full bg-card z-50 shadow-lg transition-transform duration-300",
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
          <div className="">
            <p className="text-lg font-semibold flex items-center gap-2">
              {menu?.icon && <Icon className="text-primary" />} {menu?.title}
            </p>
            <p className="text-sm text-text">{menu?.description}</p>
          </div>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="h-[90%] overflow-y-scroll p-6">{children}</div>
      </div>
    </>
  );
}
