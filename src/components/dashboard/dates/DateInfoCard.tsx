import Card from "@/components/base/Card";
import CountDown from "./CountDown";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
// import { useNavigation } from "react-router-dom";

function DateInfoCard({ nextDate }: { nextDate?: any }) {
    console.log(nextDate, 'sjsjj');
    
  if (!nextDate) {
    return (
      <Card className="bg-primary/90! p-6 text-white text-center">
        <p className="text-sm">No upcoming dates yet 💔</p>
        <p className="text-xs opacity-80">
          Plan something cute and make it happen.
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-primary/90! space-y-6">
      <div className="space-y-1">
        <p className="text-sm text-white">Next Date</p>
        <p className="text-xl font-semibold text-white">{nextDate.title}</p>
        <p className="text-sm text-white">
          with {nextDate.sentTo} · {nextDate.location}
        </p>
      </div>

      <CountDown targetDate={nextDate.date} />

      <Button className="bg-white text-primary">
        <Heart />
        View Details
      </Button>
    </Card>
  );
}

export default DateInfoCard;
