import { useEffect, useState } from "react";
import Tab from "../base/Tab";
import { useStore } from "@/store/Store";
import type { NotificationType } from "@/types";
import { useSearchParams } from "react-router-dom";
import NotificationCard from "./NotificationCard";

function NotificationTab() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();

  const urlTab = searchParams.get("notification-tab");

  useEffect(() => {
    const savedTab = localStorage.getItem("notification-tab");

    if (urlTab) setActiveTab(urlTab);
    else if (savedTab) setActiveTab(savedTab);
  }, [urlTab]);

  const { notifications } = useStore();

  const unread = notifications.filter((n: NotificationType) => !n.read).length;

  const Tabs = [
    { value: "all", tab: `All (${notifications.length})` },
    { value: "unread", tab: `Unread (${unread})` },
  ];

  const tabConfig: any = {
    all: (n: any) => n,

    unread: (n: any) => n.read == false,
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("notification-tab", value);
    setSearchParams({ tab: value });
  };

  const filterNotification = notifications.filter((n) =>
    tabConfig[activeTab]?.(n),
  );

  return (
    <div className="space-y-5">
      <Tab
        tabs={Tabs}
        value={activeTab}
        onChange={handleTabChange}
        listClassName="bg-transparent"
        activeTriggerClassName="bg-primary! text-white! py-4!"
        triggerClassName="text-primary hover:text-primary/80"
      />
      <div className="space-y-3">
        {filterNotification.map((n: NotificationType) => (
          <NotificationCard key={n?.id} notification={n} />
        ))}
      </div>
    </div>
  );
}

export default NotificationTab;
