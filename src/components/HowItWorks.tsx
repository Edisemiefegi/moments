import { Camera, Heart, PartyPopper, Send } from "lucide-react";
import Card from "./base/Card";

function HowItWorks() {
  const process = [
    {
      icon: Heart,
      step: "01",
      title: "Plan Dream Dates",
      text: "Create personalized date plans with title, location, activities, and a heartfelt message.",
    },
    {
      icon: Send,
      step: "02",

      title: "Idea Generator",
      text: "Stuck on ideas? Filter by budget, mood, and setting to discover the perfect date.",
    },
    {
      icon: PartyPopper,
      step: "03",

      title: "Surprise Reveal",
      text: "Build excitement with step-by-step reveals — time, activity, then location. Pure magic!",
    },
    {
      icon: Camera,
      step: "04",

      title: "Moments Process",
      text: "Store memories with photos and notes, turning dates into a beautiful digital scrapbook.",
    },
  ];

  return (
    <section className="sm:space-y-16 space-y-10 py-20 mx-auto container ">
      <div className="mx-auto text-center  space-y-3">
        <p className="text-primary text-sm ">PROCESS</p>
        <h1 className="font-semibold     md:text-5xl text-3xl ">
          How it works{" "}
        </h1>
        <p className="text-text max-w-xl mx-auto">
          From sparking ideas to treasuring memories, Moments has everything to
          make your dates extraordinary.{" "}
        </p>
      </div>
      <div className="grid  lg:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-6 ">
        {process.map(({ icon: Icon, text, title, step }, index) => {
          return (
            <Card
              key={index}
              className="flex   flex-col gap-3 items-center text-center bg-transparent! shadow-none! cursor-pointer hover:transition hover:ease-in-out hover:delay-200"
            >
              <span className="rounded-lg hover:-skew-3 size-12 flex items-center justify-center bg-primary">
                <Icon className="text-white" size={20} />
              </span>
              <p className="text-xs text-primary">{step}</p>
              <p className="font-medium text-xl">{title}</p>
              <p className="text-text text-sm">{text}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorks;
