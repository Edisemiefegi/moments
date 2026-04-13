import SidePanel from "@/components/base/SidePanel";
import Tab from "@/components/base/Tab";
import Header from "@/components/dashboard/Header";
import MailBox from "@/components/dashboard/letters/MailBox";
import SummaryMailCard from "@/components/dashboard/letters/SummaryMailCard";
import { useStore } from "@/store/Store";
import { Mail } from "lucide-react";
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
  const [showComposeMail, setShowComposeMail] = useState(false);
  const { currentUser, mails } = useStore();

  const header = {
    title: "  Love Mail",
    description: "Messages from the heart.",
    button: "Compose",
    onClick: () => setShowComposeMail(true),
    icon: Mail,
  };

  const userId = currentUser?.userid;

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

  const mailTabs = [
    { value: "unread", label: "Unread" },
    { value: "received", label: "Received" },
    { value: "created", label: "Created" },
  ];


  const tabConfig: any = {
    unread: (mail: any) => mail.recipientUserId === userId && mail.isRead,

    received: (mail: any) => mail.recipientUserId === userId,

    created: (mail: any) => mail.senderUserId === userId,
  };

  const tabsWithCount = mailTabs.map((tab) => {
    const count = mails.filter((mail: any) =>
      tabConfig[tab.value]?.(mail),
    ).length;

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

  const filteredMails = mails.filter((mail: any) => {
    return tabConfig[activeTab]?.(mail);
  });

  const menu = {
    title: "Compose Love Mail",
    icon: Mail,
    description: "Write something beautiful to someone special.",
  };

  return (
    <main className=" space-y-6">
      <Header header={header} />

      <Tab
        tabs={tabsWithCount}
        value={activeTab}
        onChange={handleTabChange}
        listClassName="bg-transparent"
        activeTriggerClassName="bg-primary! text-white!  py-4!"
        triggerClassName="text-primary hover:text-primary/80"
      />

      <SidePanel
        menu={menu}
        open={showComposeMail}
        onClose={() => {
          setShowComposeMail(false);
        }}
      >
        <MailBox

        // onClose={() => {
        //   setShowComposeMail(false);
        // }}
        />
      </SidePanel>

      <div className="">
        {filteredMails.map((mail: any) => (
            <SummaryMailCard key={mail.id} content={mail} />
        ))}
      </div>
    </main>
  );
}

export default LoveLetter;
