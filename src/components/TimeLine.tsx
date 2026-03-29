import { Camera, Heart, MapPin, Star } from "lucide-react";
import Card from "./base/Card";
import { iconStyles } from "./Feature";

function TimeLine() {
  const timeline = [
    {
      icon: Heart,
      date: "Jan 15",
      title: "First Coffee Date",
      text: "We talked for 3 hours straight ☕",
    },
    {
      icon: MapPin,
      date: "Feb 11",

      title: "Sunset at the Beach",
      text: "The sky turned pink just for us 🌅",
    },
    {
      icon: Camera,
      date: "Mar 8",

      title: "Cooking Class Together",
      text: "We burned the pasta but loved it 😂 ",
    },
    {
      icon: Star,
      date: "Apr 2",

      title: "Stargazing Night",
      text: "Found our constellation ✨ ",
    },
  ];

  return (
    <section className="sm:space-y-16 space-y-10 py-20 mx-auto container ">
      <div className="mx-auto text-center  space-y-3">
        <p className="text-primary text-sm ">YOUR STORY</p>
        <h1 className="font-semibold     md:text-5xl text-3xl ">
          Moments Timeline
        </h1>
        <p className="text-text max-w-xl mx-auto">
          Every date becomes a memory. Every memory becomes part of your story.
        </p>
      </div>
      <div className="flex flex-col items-center gap-12">
        {timeline.map(({ icon: Icon, text, title, date }, index) => {
          const style = iconStyles[index % iconStyles.length];

          return (
            <div className="flex sm:gap-6 gap-3">
              <div className="flex  relative flex-col items-center">
                <span
                  className={`rounded-full size-12 flex items-center justify-center ${style.bg}`}
                >
                  <Icon className={`${style.color}`} size={20} />
                </span>
                <div data-aos="fade-down" data-aos-delay={index * 200}>
                  <span className="w-0.5 absolute -top-1 h-20 bg-accent  "></span>
                </div>
              </div>
              <div data-aos="fade-left" data-aos-delay={index * 200}>
                <Card
                  key={index}
                  className="flex  justify-between   rounded-full! p-4! md:w-xl w-full px-8!  sm:gap-12 gap-8  items-center  "
                >
                  <div>
                    <p className="font-medium sm:text-base text-sm ">{title}</p>
                    <p className="text-text sm:text-sm text-xs">{text}</p>
                  </div>
                  <p className="text-xs text-text ">{date}</p>
                </Card>
              </div>{" "}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TimeLine;
