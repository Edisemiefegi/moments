import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { DateType } from "@/types"; 


const API_KEY = import.meta.env.VITE_AI_API_KEY;
const GEMINI_PRO_MODEL_PATH = "models/gemini-3-flash-preview"; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/${GEMINI_PRO_MODEL_PATH}:generateContent?key=${API_KEY}`;interface GeminiGenerationConfig {
  temperature?: number;
  maxOutputTokens?: number;
  topP?: number;
  topK?: number;
}


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


export async function generateGeminiContent(
  prompt: string,
  systemInstruction?: string,
  config?: GeminiGenerationConfig
): Promise<string> {
  if (!API_KEY) {
    throw new Error("Google Gemini API Key is not configured (VITE_GEMINI_API_KEY).");
  }

  const messages = [];
  if (systemInstruction) {
    messages.push({
      role: 'user',
      parts: [{ text: systemInstruction + "\n\n" + prompt }]
    });
  } else {
    messages.push({
      role: 'user',
      parts: [{ text: prompt }]
    });
  }

  try {
    const res = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: config?.temperature || 0.7,
          maxOutputTokens: config?.maxOutputTokens || 800, 
          topP: config?.topP || 0.95,
          topK: config?.topK || 60,
        },
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(
        `Gemini API error: ${res.status} - ${errorData.error?.message || res.statusText}`
      );
    }

    const data = await res.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!responseText) {
      console.warn("Gemini API returned no text content:", data);
      throw new Error("Gemini API returned no text content.");
    }

    return responseText;

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    throw new Error(`Failed to call Gemini API: ${error.message || 'Unknown error'}`);
  }
}