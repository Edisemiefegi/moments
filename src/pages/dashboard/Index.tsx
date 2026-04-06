import Card from "@/components/base/Card";
import SidePanel from "@/components/base/SidePanel";
import CountDown from "@/components/dashboard/dates/CountDown";
import Header from "@/components/dashboard/Header";
import NotificationTab from "@/components/dashboard/NotificationTab";
import { useStore } from "@/store/Store";
import type { NotificationType } from "@/types";
import { Bell } from "lucide-react";
import { useState } from "react";

export default function Index() {
  const { currentUser, notifications } = useStore();
  const [showNotification, setShowNotification] = useState(false);

  const unread = notifications.filter((n: NotificationType) => !n.read).length;

  const header = {
    title: `Hey ${currentUser?.name}`,
    description: "Here's what's happening with your moments.",
    notification: (
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
    ),
  };
  return (
    <main className=" space-y-6">
      <Header header={header} />
      <div className="grid grid-cols-3 gap-5 ">
        <div className="sm:col-span-2 col-span-3">
          <CountDown />
        </div>
        <Card className="sm:col-span-1 border flex justify-between col-span-3 text-primary">
          <p className="flex items-center">
            You have a new unread notification!
          </p>
          <img
            src="/notifications.svg"
            alt=""
            className="w-26 h-26 object-cover"
          />
        </Card>

        <SidePanel
          onClose={() => setShowNotification(false)}
          open={showNotification}
        >
          <NotificationTab />
        </SidePanel>
      </div>{" "}
    </main>
  );
}
