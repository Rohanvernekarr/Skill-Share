import { z } from "zod";

export const availabilitySchema = z.object({
  days: z.array(z.string()).min(1, "Select at least one day"),
  timeSlots: z.array(z.string()).min(1, "Select at least one time slot"),
});

export type AvailabilitySchema = z.infer<typeof availabilitySchema>;
