import * as z from "zod";

export const authSchema = (useName: boolean) =>
  z.object({
    email: z.email( "Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 char"),
    name: useName
      ? z.string().min(2, "Name is required")
      : z.string().optional(),
  });


export type AuthSchemaType = z.infer<ReturnType<typeof authSchema>>