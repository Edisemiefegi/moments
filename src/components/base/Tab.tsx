import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface TabItem {
  value: string;
  tab: string;
  content: React.ReactNode;
}

interface Props {
  tabs: TabItem[];
}

export default function Tab({ tabs }: Props) {
  return (
    <Tabs defaultValue={tabs[0].value} className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        {tabs.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.tab}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((t) => (
        <TabsContent key={t.value} value={t.value}>
          {t.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
