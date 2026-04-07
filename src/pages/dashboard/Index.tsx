import SidePanel from "@/components/base/SidePanel";
import DateInfoCard from "@/components/dashboard/dates/DateInfoCard";
import Header from "@/components/dashboard/Header";
import NotificationTab from "@/components/dashboard/NotificationTab";
import { useStore } from "@/store/Store";
import type { NotificationType } from "@/types";
import { Bell } from "lucide-react";
import { useState } from "react";

export default function Index() {
  const { currentUser, notifications, dates } = useStore();
  const [showNotification, setShowNotification] = useState(false);

  const userDates = dates.filter(
    (e) => e.senderId || e.receiverId == currentUser?.userid,
  );

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

  const upcomingDates = userDates
    .filter((d) => d.status === "confirmed")
    .filter((d) => new Date(d.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    console.log(upcomingDates ,dates, userDates,  'upckck');
    
  const nextDate = upcomingDates[0];
  
  return (
    <main className=" space-y-6">
      <Header header={header} />
      <DateInfoCard nextDate={nextDate} />

      <SidePanel
        className="bg-background"
        onClose={() => setShowNotification(false)}
        open={showNotification}
      >
        <NotificationTab />
      </SidePanel>
    </main>
  );
}
