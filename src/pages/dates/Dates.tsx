import SidePanel from "@/components/base/SidePanel";
import Tab from "@/components/base/Tab";
import PlanDateModal from "@/components/dashboard/dates/PlanDateModal";
import SummaryDateCard from "@/components/dashboard/dates/SummaryDateCard";
import Header from "@/components/dashboard/Header";
import { useStore } from "@/store/Store";
import { CalendarPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Dates() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPlanDate, setShowPlanDate] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  const urlTab = searchParams.get("tab");
  const { dates, currentUser } = useStore();
  const userId = currentUser?.userid;

  const header = {
    title: "Dates",
    description: "All your romantic plans in one place.",
    onClick: () => setShowPlanDate(true),
    button: "Plan a Date",
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("dates-tab");

    if (urlTab) setActiveTab(urlTab);
    else if (savedTab) setActiveTab(savedTab);
  }, [urlTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("dates-tab", value);
    setSearchParams({ tab: value });
  };

  const tabConfig: any = {
    planned: (date: any) => date.senderId === userId,

    pending: (date: any) =>
      date.status === "pending" || date.status === "reschedule-pending" &&
      (date.senderId === userId || date.receiverId === userId),

    upcoming: (date: any) =>
      date.status === "confirmed" &&
      (date.senderId === userId || date.receiverId === userId),
  };

  const dateTabs = [
    { value: "upcoming", label: "Upcoming" },
    { value: "planned", label: "Planned by Me" },
    { value: "pending", label: "Pending" },
  ];

  const menu = {
    title: "Plan a Date",
    icon: CalendarPlus,
    description: "Create something unforgettable",
  };

  const tabsWithCount = dateTabs.map((tab) => {
    const count = dates.filter((date) => tabConfig[tab.value]?.(date)).length;

    return {
      value: tab.value,
      tab: (
        <div className="flex gap-2 items-center">
          <p>{tab.label}</p>
          <p className="text-xs py-0.5 px-2 rounded-sm bg-accent/40">{count}</p>
        </div>
      ),
    };
  });

  const filteredDates = dates.filter((date) => {
    return tabConfig[activeTab]?.(date);
  });

  return (
    <main className="space-y-6">
      <Header header={header} />

      <SidePanel
        menu={menu}
        open={showPlanDate}
        onClose={() => setShowPlanDate(false)}
      >
        <PlanDateModal onClose={() => setShowPlanDate(false)} />
      </SidePanel>

      <Tab
        tabs={tabsWithCount}
        value={activeTab}
        onChange={handleTabChange}
        listClassName="bg-transparent"
        activeTriggerClassName="bg-primary! text-white! py-4!"
        triggerClassName="text-primary hover:text-primary/80"
      />

      <div className="space-y-6 pt-6">
        {filteredDates.map((date) => (
          <SummaryDateCard key={date.id} content={date} />
        ))}
      </div>
    </main>
  );
}

export default Dates;
