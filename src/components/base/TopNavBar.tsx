import Logo from "./Logo";
import { Bell } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LogoutComponent from "./LogoutComponent";
import { useStore } from "@/store/Store";
import type { NotificationType } from "@/types";

interface Props {
  setShowNotification: (val: any) => void;
  showNotification: boolean;
}
function TopNavBar({ setShowNotification, showNotification }: Props) {
  const { notifications } = useStore();

  const unread = notifications.filter((n: NotificationType) => !n.read).length;

  return (
    <header className="fixed   w-full top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        <Logo />{" "}
        <div className="flex items-center gap-1">
          <div className="relative">
            <span className="size-4 flex items-center justify-center absolute bg-primary text-xs text-white rounded-full -top-1 -right-1">
              {unread}
            </span>{" "}
            <Bell
              className="cursor-pointer"
              onClick={() => setShowNotification(!showNotification)}
              size={24}
            />
          </div>
          <ThemeToggle />
          <LogoutComponent />
        </div>
      </div>
    </header>
  );
}

export default TopNavBar;
