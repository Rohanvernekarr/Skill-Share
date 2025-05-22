"use client";

import React, { useState } from "react";
import { skills } from "@/constants/skills";
import { SkillTag } from "@/components/common/SkillTag";
import  Button  from "@/components/ui/Button"; // Replace if you use another button component
import { toast } from "sonner"; // Optional for notifications

const TeachPage = () => {
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
