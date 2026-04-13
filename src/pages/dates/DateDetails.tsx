import {
  ArrowLeft,
  CalendarHeart,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Card from "@/components/base/Card";
import CountDown from "@/components/dashboard/dates/CountDown";
import { useStore } from "@/store/Store";

function DateDetails() {
  const { id } = useParams();
  const { dates } = useStore();
  const date = dates.find((e) => e.id === id);

  if (!date) return <p>Date not found</p>;

  const targetDateAsDate = date.date;
  const hasDatePassed = targetDateAsDate.getTime() <= new Date().getTime();
  const info = [
    { icon: CalendarHeart, value: date.title },
    { icon: Clock, value: date.time },
    { icon: MapPin, value: date.location },
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
        <p className="text-text text-xs">with {date.sendTo}</p>
      </header>

      <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
        {info.map(({ icon: Icon, value }, i) => (
          <Card key={i} className="flex flex-col gap-1 items-center">
            <Icon className="text-primary" size={18} />
            <p className="text-sm">{value}</p>
          </Card>
        ))}
      </div>
      <Card className="bg-primary/90! space-y-4">
        <p className="text-sm text-white">Countdown</p>

        {date.status === "confirmed" && !hasDatePassed ? (
          <CountDown targetDate={targetDateAsDate} showFullCountdown={true} />
        ) : (
          <p className="text-white text-sm">
            Countdown unavailable for this date status.
          </p>
        )}
      </Card>

      <Card>
        <p className="flex items-center gap-2">
          <MessageCircle className="text-primary" size={18} />
          Message
        </p>
        <p className="text-text text-sm">{date?.note}</p>
      </Card>

      <Card className="space-y-3">
        <p className="flex items-center gap-2">
          <Heart className="text-primary" size={18} />
          Activity
        </p>

        <p className="text-text text-sm">{date?.activity}</p>
      </Card>
    </div>
  );
}

export default DateDetails;
