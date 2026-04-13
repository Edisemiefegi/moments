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
  time: z.string().optional(),
  location: z.string(),
  activity: z.string().max(50, "not more than 50 characters"),
  note: z.string().optional(),
  status: z.string().optional(),
    sendTo: z.string(),

});

export type DateSchemaType = z.infer<typeof dateSchema>;


export const mailSchema = z.object({
  subject: z.string().min(2, "Subject should be at least 2 characters"),
  to: z.string().min(2, "Recipient name is required"),
  username: z.string().optional(),
  message: z
    .string()
    .min(20, "Your letter should be at least 20 characters"),
});

export type MailSchemaType = z.infer<typeof mailSchema>;
