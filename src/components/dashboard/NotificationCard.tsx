import type { NotificationType } from "@/types";
import Card from "../base/Card";
import { cn } from "@/lib/utils";
import { CalendarHeart, Check, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { useMoments } from "@/hooks/useMoments";
import { formatDate } from "./TimeLineCard";

interface Props {
  notification: NotificationType;
}
function NotificationCard({ notification }: Props) {
  const { markNotificationAsRead } = useMoments();

  return (
    <Card
      className={cn(
        !notification.read ? "border-primary/20 bg-primary/5!" : "",
        "border flex justify-between sm:p-5! p-3!",
      )}
    >
      <div className="flex gap-4">
        <span
          className={cn(
            !notification.read
              ? "bg-primary text-white"
              : "bg-gray-200   text-text",
            "px-3 h-10  flex items-center rounded-lg  justify-center ",
          )}
        >
          {/* {notification.type } */}
          <CalendarHeart size={15} className=" " />
        </span>
        <span>
          <p className="font-medium">{notification.type}</p>
          <p className="text-text text-sm">{notification.message}</p>
          <p className="text-xs text-text flex gap-1 items-center mt-1">
            <Clock size={10} />
            <span> {formatDate(notification.createdAt)}</span>
          </p>
        </span>
      </div>

      <div className="flex  text-text">
        {!notification.read && (
          <Button
            onClick={async () => await markNotificationAsRead(notification.id)}
            variant={"ghost"}
          >
            <Check size={15} />
          </Button>
        )}
        {/* <Button variant={"ghost"}>
          <Trash className="text-destructive" size={15} />
        </Button> */}
      </div>
    </Card>
  );
}

export default NotificationCard;
