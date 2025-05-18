"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileSchema } from "@/lib/validators/profileSchema";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { SkillTag } from "@/components/common/SkillTag";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabaseClient";

const availableSkills = ["JavaScript", "React", "Node.js", "Python", "CSS"];

export default function ProfileForm() {
  const { user } = useUser();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      fullName: "",
      bio: "",
      skills: [],
    },
  });

  const selectedSkills = watch("skills");

  const toggleSkill = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setValue("skills", updatedSkills);
  };

  const onSubmit = async (data: ProfileSchema) => {
    if (!user) return alert("You must be logged in");
  
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      username: data.username,
      full_name: data.fullName,
      bio: data.bio,
      skills: data.skills,
      email: user.email,
      provider: user.app_metadata?.provider || "email",
    });
  
    if (error) {
      console.error("Error saving profile:", error.message);
      alert("Failed to save profile.");
    } else {
      alert("Profile saved successfully!");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md">
      <Input label="Username" {...register("username")} error={errors.username?.message} />
      <Input label="Full Name" {...register("fullName")} error={errors.fullName?.message} />
      <Input label="Bio" {...register("bio")} error={errors.bio?.message} />

      <div>
        <label className="block mb-1 font-medium">Skills</label>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map((skill) => (
            <SkillTag
              key={skill}
              skill={skill}
              selected={selectedSkills.includes(skill)}
              onClick={() => toggleSkill(skill)}
            />
          ))}
        </div>
        {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>}
      </div>

      <Button type="submit">Save Profile</Button>
    </form>
  );
}
