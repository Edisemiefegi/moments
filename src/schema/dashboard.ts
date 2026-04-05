import * as z from "zod";

export const timelineSchema = z.object({
  title: z.string().min(2, "should be atleast be up to 2 characters"),
  date: z.date(),
  icon: z.string().optional(),
  note: z.string().max(300, "not more than 300 characters"),
  photos: z.file().optional(),
});

export type TimelineSchemaType = z.infer<typeof timelineSchema>;


export const dateSchema = z.object({
  title: z.string().min(2, "should be atleast be up to 2 characters"),
  date: z.date(),
  time: z.string(),
  sendTo: z.string(),
  location: z.string(),
  activity: z.string().max(50, "not more than 50 characters"),
  note: z.string().optional(),
});

export type DateSchemaType = z.infer<typeof dateSchema>;
