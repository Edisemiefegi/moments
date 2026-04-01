import { Tabs,  TabsList, TabsTrigger } from "../ui/tabs";

interface TabItem {
  value: string;
  tab: React.ReactNode;
  // content: React.ReactNode;
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
  return (
    <Tabs value={value} onValueChange={onChange} className="w-full">
      <div className="overflow-x-auto scrollbar-hide">
        <TabsList className={`flex space-x-2 w-max ${listClassName}`}>
          {tabs.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className={`${triggerClassName} flex-shrink-0 ${
                value === t.value ? activeTriggerClassName : ""
              }`}
            >
              {t.tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* {tabs.map((t) => (
        <TabsContent key={t.value} value={t.value}>
          {t.content}
        </TabsContent>
      ))} */}
    </Tabs>
  );
}