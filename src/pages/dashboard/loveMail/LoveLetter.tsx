import Tab from "@/components/base/Tab";
import PlanDateModal from "@/components/dashboard/dates/PlanDateModal";
import SummaryMailCard from "@/components/dashboard/letters/SummaryMailCard";
import { Button } from "@/components/ui/button";
import { Mail, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export const dates = [
  {
    title: "Thinking of you",
    company: "Alex",
    message:
      "Every moment with you feels like a dream I never want to wake from...",
    date: "2 hours ago",
    status: "unread",
    id: "1",
  },
  {
    title: "Sunset Beach Walk",
    company: "Jordan",
    message:
      "Every moment with you feels like a dream I never want to wake from...",
    date: "2 hours ago",
    status: "received",
    id: "2",
  },
  {
    title: "Sunset Beach Walk",
    company: "Jordan",
    message:
      "Every moment with you feels like a dream I never want to wake from...",
    date: "2 hours ago",
    status: "sent",
    id: "3",
  },
  {
    title: "Sunset Beach Walk",
    company: "Jordan",
    message:
      "Every moment with you feels like a dream I never want to wake from...",
    date: "2 hours ago",
    status: "sent",
    id: "4",
  },
];

function LoveLetter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPlanDate, setShowPlanDate] = useState(false);

  const urlTab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState("unread");

  useEffect(() => {
    const savedTab = localStorage.getItem("mail-tab");

    if (urlTab) setActiveTab(urlTab);
    else if (savedTab) setActiveTab(savedTab);
  }, [urlTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("mail-tab", value);
    setSearchParams({ tab: value });
  };

  const dateTabs = [
    { value: "unread", label: "Unread" },
    { value: "received", label: "Received" },
    { value: "sent", label: "Sent" },
  ];

  const tabsWithCount = dateTabs.map((tab) => {
    const count = dates.filter((d) => d.status === tab.value).length;

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

  const filteredDates = dates.filter((date) => date.status === activeTab);

  return (
    <main className=" space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="font-medium text-2xl flex gap-2 items-center">
            <Mail className="text-primary " />
            Love Mail
          </h1>
          <p className="text-text">Messages from the heart.</p>
        </div>
        <Button onClick={() => setShowPlanDate(true)}>
          <Pencil /> Compose{" "}
        </Button>{" "}
      </header>

      {showPlanDate && (
        <PlanDateModal
          open={showPlanDate}
          onClose={() => setShowPlanDate(false)}
        />
      )}

      <Tab
        tabs={tabsWithCount}
        value={activeTab}
        onChange={handleTabChange}
        listClassName="bg-transparent"
        activeTriggerClassName="bg-primary! text-white!  py-4!"
        triggerClassName="text-primary hover:text-primary/80"
      />

      <div className="space-y-6 pt-6">
        {filteredDates.map((date) => (
          <SummaryMailCard key={date.id} content={date} />
        ))}
      </div>
    </main>
  );
}

export default LoveLetter;
