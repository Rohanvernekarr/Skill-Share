import { z } from 'zod';

export const sessionSchema = z.object({
    id: z.string().uuid(),
    skill: z.string(),
    duration: z.number(), // in minutes
    completed: z.boolean(),
  });
  
  export type SessionSchema = z.infer<typeof sessionSchema>;
  