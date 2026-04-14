import SidePanel from "@/components/base/SidePanel";
import DateInfoCard from "@/components/dashboard/dates/DateInfoCard";
import Header from "@/components/dashboard/Header";
import NotificationTab from "@/components/dashboard/NotificationTab";
import SavedIdeaCard from "@/components/dashboard/SavedIdeaCard";
import { formatDate } from "@/components/dashboard/TimeLineCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/Store";
import type { MailType, NotificationType } from "@/types";
import {
  ArrowRight,
  Bell,
  Bookmark,
  Calendar,
  Heart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const { currentUser, savedIdeas, notifications, dates, mails } = useStore();
  const [showNotification, setShowNotification] = useState(false);

  const unread = notifications.filter((n: NotificationType) => !n.read).length;
  const userDates = dates.filter(
    (date) => date.senderId == currentUser?.userid,
  );

  const userMails = mails.filter(
    (m: MailType) => m.senderUserId == currentUser?.userid,
  );
  const header = {
    title: `Hey ${currentUser?.name}`,
    description: "Here's what's happening with your moments.",
    notification: (
      <div className="relative md:block hidden">
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

  const stats = [
    { label: "Dates Planned", value: userDates.length, icon: Calendar },
    { label: "Letters Sent", value: userMails.length, icon: Heart },
    { label: "Ideas Saved", value: savedIdeas.length, icon: Sparkles },
  ];

  return (
    <main className=" space-y-6 relative">
      <Header header={header} />
      <SidePanel
        className="bg-background"
        onClose={() => setShowNotification(false)}
        open={showNotification}
      >
        <NotificationTab />
      </SidePanel>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4 text-center"
          >
            <stat.icon className="h-4 w-4 text-primary mx-auto mb-1.5" />
            <p className="font-display text-xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="font-body text-[11px] text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <DateInfoCard />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              <h3 className="font-display text-sm font-bold text-foreground">
                Saved Ideas
              </h3>
            </div>
            <Link
              to="/dashboard/ideas"
              className="font-body text-xs text-primary hover:underline flex items-center gap-0.5"
            >
              See all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2 overflow-y-scroll h-46">
            {savedIdeas.length > 0 ? (
              savedIdeas.map((idea: any) => (
                <SavedIdeaCard key={idea.id} idea={idea} />
              ))
            ) : (
              <p className="text-center text-text text-sm py-6">
                You haven't saved any date ideas yet. Head to "Date Ideas" to
                find some!{" "}
              </p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-bold text-foreground">
              Recent Activity
            </h3>
          </div>
          {notifications.length > 0 ? (
            <div className="space-y-2">
              {" "}
              {notifications.slice(0, 4).map((item: any, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Bell size={15} className="text-accent" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-foreground truncate">
                      {item.message}
                    </p>
                    <p className="font-body text-[11px] text-muted-foreground mt-0.5">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-text text-sm py-6">
              No activity yet… your moments will show up here 👀
            </p>
          )}{" "}
        </div>
        <Button
          onClick={() => setShowNotification(!showNotification)}
          variant="outline"
          size="sm"
          className="w-full mt-4 font-body text-xs"
        >
          View All
        </Button>
      </div>
    </main>
  );
}
