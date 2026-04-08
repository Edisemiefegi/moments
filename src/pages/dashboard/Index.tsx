import DateInfoCard from "@/components/dashboard/dates/DateInfoCard";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/Store";
import {
  ArrowRight,
  Bookmark,
  Calendar,
  Heart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function Index() {
  const { currentUser, dates } = useStore();

  const userDates = dates.filter(
    (e) => e.senderId || e.receiverId == currentUser?.userid,
  );

  const header = {
    title: `Hey ${currentUser?.name}`,
    description: "Here's what's happening with your moments.",
  };

  const stats = [
    { label: "Dates Planned", value: 12, icon: Calendar },
    { label: "Letters Sent", value: 8, icon: Heart },
    { label: "Ideas Saved", value: 16, icon: Sparkles },
  ];

  const savedIdeas = [
    { id: 1, title: "Stargazing Blanket Fort", emoji: "🌌", category: "Cozy" },
    {
      id: 2,
      title: "Sunrise Hike & Breakfast",
      emoji: "🌄",
      category: "Adventure",
    },
    { id: 3, title: "Paint & Sip Night", emoji: "🎨", category: "Creative" },
    { id: 4, title: "Farmer's Market Brunch", emoji: "🥐", category: "Foodie" },
  ];

  const recentActivity = [
    {
      id: 1,
      text: "Alex accepted your Coffee & Board Games invite",
      time: "5 hrs ago",
      emoji: "☕",
    },
    {
      id: 2,
      text: "You sent a love letter to Sam",
      time: "1 day ago",
      emoji: "💌",
    },
    {
      id: 3,
      text: "Completed Sunset Beach Walk with Jordan",
      time: "3 days ago",
      emoji: "🌅",
    },
  ];

  const upcomingDates = userDates
    .filter((d) => d.status === "confirmed")
    .filter((d) => new Date(d.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  console.log(upcomingDates, dates, userDates, "upckck");

  const nextDate = upcomingDates[0];

  return (
    <main className=" space-y-6">
      <Header header={header} />
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
      <DateInfoCard nextDate={nextDate} />

      <div className="grid md:grid-cols-2 gap-4">
        {/* Saved Ideas */}
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
          <div className="space-y-2">
            {savedIdeas.map((idea) => (
              <div
                key={idea.id}
                className="flex items-center gap-3 bg-muted rounded-lg p-3 hover:bg-muted/80 transition-colors group cursor-pointer"
              >
                <span className="text-lg">{idea.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {idea.title}
                  </p>
                  <p className="font-body text-[11px] text-muted-foreground">
                    {idea.category}
                  </p>
                </div>
                <Link to="/dashboard/dates">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="font-body text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity h-7 px-2"
                  >
                    Plan
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="font-display text-sm font-bold text-foreground">
                Recent Activity
              </h3>
            </div>
            <Link
              to="/dashboard/timeline"
              className="font-body text-xs text-primary hover:underline flex items-center gap-0.5"
            >
              Timeline <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-foreground">
                    {item.text}
                  </p>
                  <p className="font-body text-[11px] text-muted-foreground mt-0.5">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/dashboard/timeline">
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 font-body text-xs"
            >
              View Full Timeline
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
