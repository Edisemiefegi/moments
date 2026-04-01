import Tab from "@/components/base/Tab";
import SummaryDateCard from "@/components/dashboard/dates/SummaryDateCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Dates() {
  const dates = [
    {
      title: "Starlit Rooftop Dinner",
      company: "Alex",
      time: "7:00PM",
      date: "Apr 5, 2026",
      location: "Abuja duste market",
      status: "planned",
      id: "1",
    },
    {
      title: "Sunset Beach Walk",
      company: "Jordan",
      time: "7:00PM",
      date: "Apr 10, 2026",
      location: "Abuja duste market",
      status: "upcoming",
      id: "2",
    },
    {
      title: "Sunset Beach Walk",
      company: "Jordan",
      time: "7:00PM",
      date: "Apr 10, 2026",
      location: "Abuja duste market",
      status: "upcoming",
      id: "3",
    },
    {
      title: "Sunset Beach Walk",
      company: "Jordan",
      time: "7:00PM",
      date: "Apr 10, 2026",
      location: "Abuja duste market",
      status: "completed",
      id: "4",
    },
    {
      title: "Sunset Beach Walk",
      company: "Jordan",
      time: "7:00PM",
      date: "Apr 10, 2026",
      location: "Abuja duste market",
      status: "pending",
      id: "5",
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const urlTab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState("upcoming");

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

  const dateTabs = [
    { value: "upcoming", label: "Upcoming" },
    { value: "planned", label: "Planned by Me" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
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
    <main className="p-8 space-y-6">
      <header className="flex justify-between">
        <div>
          <h1 className="font-medium text-2xl flex gap-1">Dates</h1>
          <p className="text-text">All your romantic plans in one place.</p>
        </div>
        <Button>
          <Plus /> Plan a Date{" "}
        </Button>{" "}
      </header>

      <div className="w-full">
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
            <SummaryDateCard key={date.id} content={date} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dates;
