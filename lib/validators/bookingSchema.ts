import { z } from "zod";

export const bookingSchema = z.object({
  learnerId: z.string().uuid(),
  mentorId: z.string().uuid(),
  date: z.string(), // or z.coerce.date() if needed
  timeSlot: z.string(),
  skill: z.string(),
  notes: z.string().max(500).optional(),
});

export type BookingSchema = z.infer<typeof bookingSchema>;
