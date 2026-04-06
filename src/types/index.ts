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
  time?: string;
  senderId: string;
  receiverId: string;
  receiverEmail: string;
  createdAt: Date; 
  id?: string;
  activity: string;
  note: string;
  status?: "pending" | "confirmed" | "completed" | "declined" | "reschedule",
};

export type NotificationType ={
  id: string,
  userId: string,        
  senderId: string,      
  message: string,
  type: string,
  dateId: string,
  read: boolean,
  createdAt: Date
}
