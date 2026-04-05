import * as z from "zod";

export const timelineSchema = z.object({
  title: z.string().min(2, "should be atleast be up to 2 characters"),
  date: z.date(),
  icon: z.string().optional(),
  note: z.string().max(300, "not more than 300 characters"),
  photos: z.file().optional(),
});

export type TimelineSchemaType = z.infer<typeof timelineSchema>;
