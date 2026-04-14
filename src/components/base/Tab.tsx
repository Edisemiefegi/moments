import { useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface TabItem {
  value: string;
  tab: React.ReactNode;
}

interface Props {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  listClassName?: string;
  triggerClassName?: string;
  activeTriggerClassName?: string;
}

export default function Tab({
  tabs,
  value,
  onChange,
  listClassName = "",
  triggerClassName = "",
  activeTriggerClassName = "",
}: Props) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const activeTab = tabRefs.current[value];

    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [value]);
  return (
    <Tabs value={value} onValueChange={onChange} className="w-full">
      <div className="overflow-x-auto   overflow-y-hidden  scrollbar-hide">
        <TabsList className={`flex space-x-2  w-max ${listClassName}`}>
          {tabs.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              ref={(el) => {
                tabRefs.current[t.value] = el;
              }}
              className={`${triggerClassName} flex-shrink-0 ${
                value === t.value ? `${activeTriggerClassName} scale-105` : ""
              }`}
            >
              {t.tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
