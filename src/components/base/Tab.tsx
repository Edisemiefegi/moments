import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface TabItem {
  value: string;
  tab: string;
  content: React.ReactNode;
}

interface Props {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void
}

export default function Tab({ tabs, value, onChange}: Props) {
  return (
    <Tabs value={value} onValueChange={onChange} className="w-full">
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
