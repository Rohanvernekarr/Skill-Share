import { z } from "zod";

export const profileSchema = z.object({
  username: z.string().min(2),
  fullName: z.string().min(2),
  bio: z.string().max(300),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
