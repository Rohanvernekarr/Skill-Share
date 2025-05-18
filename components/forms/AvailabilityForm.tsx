"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { availabilitySchema, AvailabilitySchema } from "@/lib/validators/availabilitySchema";
import Button  from "@/components/ui/Button";

const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const allSlots = ["09:00 - 10:00", "10:00 - 11:00", "14:00 - 15:00", "16:00 - 17:00"];

export default function AvailabilityForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AvailabilitySchema>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      days: [],
      timeSlots: [],
    },
  });

  const days = watch("days");
  const timeSlots = watch("timeSlots");

  const toggle = (field: "days" | "timeSlots", value: string) => {
    const current = field === "days" ? days : timeSlots;
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(field, updated);
  };

  const onSubmit = (data: AvailabilitySchema) => {
    console.log("Availability data submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md">
      <div>
        <label className="block mb-1 font-medium">Available Days</label>
        <div className="flex flex-wrap gap-2">
          {allDays.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggle("days", day)}
              className={`px-3 py-1 rounded-full border ${
                days.includes(day) ? "bg-blue-600 text-white" : "bg-white text-black"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        {errors.days && <p className="text-red-500 text-sm mt-1">{errors.days.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Time Slots</label>
        <div className="flex flex-wrap gap-2">
          {allSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => toggle("timeSlots", slot)}
              className={`px-3 py-1 rounded-full border ${
                timeSlots.includes(slot) ? "bg-green-600 text-white" : "bg-white text-black"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        {errors.timeSlots && <p className="text-red-500 text-sm mt-1">{errors.timeSlots.message}</p>}
      </div>

      <Button type="submit">Save Availability</Button>
    </form>
  );
}
