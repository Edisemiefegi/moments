import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { DateType } from "@/types";
import { useState, useMemo } from "react";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const usePagination = <T,>(data: T[], itemsPerPage: number = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const next = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goTo = (page: number) => setCurrentPage(page);

  return {
    currentPage,
    totalPages,
    paginatedData,
    next,
    prev,
    goTo,
  };
};

/** The other person on a date, from the current user's point of view. */
export function getPartnerName(date: DateType, userId?: string) {
  return date.receiverId === userId
    ? date.senderName || "your date"
    : date.sendTo;
}

/** Combines a stored calendar day with its "HH:mm" time, in local time. */
export function getDateTime({ date, time }: Pick<DateType, "date" | "time">) {
  const result = new Date(date);
  const [hours, minutes] = (time || "00:00").split(":").map(Number);
  result.setHours(hours || 0, minutes || 0, 0, 0);
  return result;
}

export function generateICS(dateContent: DateType): string {
  const { title, location, activity, note } = dateContent;

  const eventDate = getDateTime(dateContent);

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
    `DTEND:${dtend}Z`,    
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
