import {
  BookHeart,
  CalendarHeart,
  Clock,
  Gift,
  Lightbulb,
  Mail,
} from "lucide-react";
import Card from "./base/Card";

export const iconStyles = [
  {
    bg: "bg-primary/10",
    color: "text-primary",
  },
  {
    bg: "bg-secondary",
    color: "text-secondary-foreground",
  },
  {
    bg: "bg-accent",
    color: "text-accent-foreground",
  },
];

function Feature() {
  const features = [
    {
      icon: CalendarHeart,
      title: "Plan Dream Dates",
      text: "Create personalized date plans with title, location, activities, and a heartfelt message.",
    },
    {
      icon: Lightbulb,
      title: "Idea Generator",
      text: "Stuck on ideas? Filter by budget, mood, and setting to discover the perfect date.",
    },
    {
      icon: Gift,
      title: "Surprise Reveal",
      text: "Build excitement with step-by-step reveals — time, activity, then location. Pure magic!",
    },
    {
      icon: BookHeart,
      title: "Moments Timeline",
      text: "Store memories with photos and notes, turning dates into a beautiful digital scrapbook.",
    },
    {
      icon: Mail,
      title: "Love Letters",
      text: "Send beautiful digital love letters as stunning shareable pages.",
    },
    {
      icon: Clock,
      title: "Date Countdown",
      text: "Watch the excitement build with a beautiful countdown to your next special moment.",
    },
  ];

  return (
    <section className="sm:space-y-16 space-y-10">
      <div className="mx-auto text-center  space-y-3">
        <p className="text-primary text-sm ">FEATURES</p>
        <h1 className="font-semibold     md:text-5xl text-3xl ">
          Everything you need
        </h1>
        <p className="text-text max-w-xl mx-auto">
          From sparking ideas to treasuring memories, Moments has everything to
          make your dates extraordinary.{" "}
        </p>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6 ">
        {features.map(({ icon: Icon, text, title }, index) => {
          const style = iconStyles[index % iconStyles.length];
          return (
            <div
              data-aos-easing="ease-in-back"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <Card
                key={index}
                className="space-y-5 hover:border-primary hover:border cursor-pointer hover:transition hover:ease-in-out hover:delay-200"
              >
                <span
                  className={`rounded-full size-12 flex items-center justify-center ${style.bg}`}
                >
                  <Icon className={`${style.color}`} size={20} />
                </span>
                <p className="font-medium text-xl">{title}</p>
                <p className="text-text text-sm">{text}</p>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Feature;
