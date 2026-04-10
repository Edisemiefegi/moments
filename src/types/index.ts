import { toast } from "react-toastify";

export type User = {
  name: string;
  email: string;
  userid: string;
};

export type Timeline = {
  title: string;
  date: Date;
  icon?: string;
  note: string;
  photos?: string;
  userid?: string;
  id?: string;
};

export type DateType = {
  title: string;
  sendTo: string;
  location: string;
  date: Date;
  time: string;
  senderId: string;
  receiverId: string;
  receiverEmail: string;
  createdAt: Date;
  id?: string;
  activity: string;
  note: string;
  status?:
    | "pending"
    | "confirmed"
    | "declined"
    | "reschedule-pending"
    | "rescheduled";
  addedToCalendarBy?: string[];
  proposedDate?: Date;
  proposedTime?: string;
  rescheduleMessage?: string;
  rescheduleProposerId?: string;
};



export type NotificationType = {
  id: string;
  userId: string;
  senderId: string;
  message: string;
  type: string;
  dateId: string;
  read: boolean;
  createdAt: Date;
};

export const showToast = (notification: any) => {
  switch (notification.type) {
    case "date-accepted":
      toast.success(notification.message);
      break;
    case "date-declined":
      toast.error(notification.message);
      break;
    case "date-rescheduled":
      toast.info(notification.message);
      break;
    default:
      toast(notification.message);
  }
};
