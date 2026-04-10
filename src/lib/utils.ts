import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { DateType } from "@/types"; 


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function generateICS(dateContent: DateType, currentUserEmail: string): string {
  const { title, location, activity, date, time, note} = dateContent;
console.log(currentUserEmail, 'bla');

  const eventDate = new Date(date); 
  const [hours, minutes] = time.split(":").map(Number);
  eventDate.setHours(hours, minutes, 0, 0);

  const endDate = new Date(eventDate);
  endDate.setHours(eventDate.getHours() + 1);

  const formatCalendarDate = (d: Date) => {
    return d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15); 
  };

  const dtstamp = formatCalendarDate(new Date());
  const dtstart = formatCalendarDate(eventDate);
  const dtend = formatCalendarDate(endDate);

  const uid = `${Date.now()}-${title.replace(/\s/g, '-')}-${Math.random().toString(36).substring(2, 9)}`;

  let description = `Activity: ${activity || 'Not specified'}`;
  if (note) {
    description += `\\nNote: ${note}`;
  }
  description += `\\nInvited by: ${dateContent.sendTo}`; 
const moment = 'https://momentsblues.vercel.app/'
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//YourApp//NONSGML v1.0//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}Z`, 
    `DTSTART:${dtstart}Z`, 
    `DTEND:${dtend}`,    
    `SUMMARY:${title} with ${dateContent.sendTo}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location || 'Online/Not specified'}`,
    `URL:${moment}/dashboard/dates/${dateContent.id}`, 
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
}

export function downloadICS(icsContent: string, filename: string = "event.ics") {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}