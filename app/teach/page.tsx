"use client";

import React, { useState } from "react";
import { skills } from "@/constants/skills";
import { SkillTag } from "@/components/common/SkillTag";
import  Button  from "@/components/ui/Button"; // Replace if you use another button component
import { toast } from "sonner"; // Optional for notifications
import { useUser } from "@/hooks/useUser" 

const TeachPage = () => {
  const { user } = useUser() // returns null if not logged in
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSave = () => {
    if (selectedSkills.length === 0) {
      toast.warning("Please select at least one skill.");
      return;
    }

    // Mock saving skills (you can integrate Supabase/Firestore here)
    toast.success("Skills updated successfully!");
    console.log("Saved skills:", selectedSkills);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900 px-4">
        <div className="bg-zinc-950 shadow-xl rounded-2xl p-8 max-w-sm w-full text-center">
          <h2 className="text-2xl font-semibold text-gray-200 mb-2">Access Restricted</h2>
          <p className="text-gray-400 mb-6">🚫 Please login to access this page.</p>
          <a
            href="/login"
            className="inline-block px-5 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl h-dvh mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Teach & Share Your Skills</h1>
      <p className="text-zinc-600 dark:text-zinc-300 mb-8">
        Select the skills you'd like to teach and help others grow. Your knowledge matters!
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {skills.map((skill) => (
          <SkillTag
            key={skill}
            skill={skill}
            selected={selectedSkills.includes(skill)}
            onClick={() => toggleSkill(skill)}
          />
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={handleSave} className="px-6 py-3">
          Save Skills
        </Button>
        <a
          href="/dashboard"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          Go to Dashboard →
        </a>
      </div>
    </div>
  );
};

export default TeachPage;
