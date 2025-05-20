"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { SkillTag } from "@/components/common/SkillTag";
import UserCard  from "@/components/common/UserCard";
import { skills } from "@/constants/skills";
import { useProfile } from "@/hooks/useProfile";


export default function LearnPage() {
  const [search, setSearch] = useState("");
  const [filteredSkills, setFilteredSkills] = useState(skills);
  const { mentors, isLoading, error } = useProfile({ role: "mentor" });

  useEffect(() => {
    const s = search.toLowerCase();
    const filtered = skills.filter(skill =>
      skill.toLowerCase().includes(s)
    );
    setFilteredSkills(filtered);
  }, [search]);

  return (
    <div className="max-w-7xl  h-dvh mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Find a Skill to Learn</h1>

      <Input
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {filteredSkills.map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>

      {isLoading && <p>Loading mentors...</p>}
      {error && <p className="text-red-500">Error fetching mentors</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {mentors
          .filter((mentor) =>
            filteredSkills.some(skill => mentor.skills?.includes(skill))
          )
          .map((mentor) => (
            <UserCard key={mentor.id} profile={mentor} />
          ))}
      </div>
    </div>
  );
}
