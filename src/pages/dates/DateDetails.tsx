import {
  ArrowLeft,
  CalendarHeart,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { dates } from "./Dates";
import Card from "@/components/base/Card";
import CountDown from "@/components/dashboard/dates/CountDown";

function DateDetails() {
  const { id } = useParams();
  const date = dates.find((e) => e.id === id);

  if (!date) return <p>Date not found</p>;

  const info = [
    { icon: CalendarHeart, value: date.date },
    { icon: Clock, value: date.time },
    { icon: MapPin, value: date.location },
  ];

  const plans = [
    "Arrive & Cocktails",
    "Dinner & Conversations",
    "Walk under the stars",
  ];

  return (
    <div className="space-y-6">
      <Link
        to={"/dashboard/dates"}
        className="text-text text-sm flex items-center"
      >
        <ArrowLeft size={16} /> Back to Dates
      </Link>

      <header>
        <h1 className="font-medium text-2xl">{date.title}</h1>
        <p className="text-text text-xs">with {date.company}</p>
      </header>

      <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
        {info.map(({ icon: Icon, value }, i) => (
          <Card key={i} className="flex flex-col gap-1 items-center">
            <Icon className="text-primary" size={18} />
            <p className="text-sm">{value}</p>
          </Card>
        ))}
      </div>

      <CountDown />

      <Card>
        <p className="flex items-center gap-2">
          <MessageCircle className="text-primary" size={18} />
          Message
        </p>
        <p className="text-text text-sm">
          Can't wait for our evening under the stars 💫
        </p>
      </Card>

      <Card className="space-y-3">
        <p className="flex items-center gap-2">
          <Heart className="text-primary" size={18} />
          Plan
        </p>

      <div className="space-y-2">
          {plans.map((item, i) => (
          <div key={i} className="flex gap-2 items-center ">
            <span className="text-primary rounded-full size-6 flex items-center justify-center text-sm  bg-primary/10">
              {i + 1}
            </span>
            <p className="text-text text-sm">{item}</p>
          </div>
        ))}
      </div>
      </Card>
    </div>
  );
}

export default DateDetails;
