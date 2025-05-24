"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
import { SkillTag } from "@/components/common/SkillTag";
import UserCard from "@/components/common/UserCard";
import { skills } from "@/constants/skills";
import { mentors } from "@/constants/mentors";
import { useUser } from "@/hooks/useUser";

export default function LearnPage() {
  const { user } = useUser();

  const [search, setSearch] = useState("");
  const [filteredSkills, setFilteredSkills] = useState(skills);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const s = search.toLowerCase();
    const filtered = skills.filter((skill) => skill.toLowerCase().includes(s));
    setFilteredSkills(filtered);
  }, [search]);

  const filteredMentors = mentors.filter((mentor) =>
    selectedSkill
      ? mentor.skills?.includes(selectedSkill)
      : mentor.skills?.some((skill: string) => filteredSkills.includes(skill))
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 px-4">
        <div className="bg-zinc-950 shadow-2xl rounded-3xl p-10 max-w-sm w-full text-center border border-zinc-700">
          <h2 className="text-2xl font-bold text-gray-200 mb-2">
            Access Restricted
          </h2>
          <p className="text-gray-400 mb-6">
            🚫 Please login to access this page.
          </p>
          <a
            href="/login"
            className="inline-block px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-medium shadow-lg"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-14 px-6 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent mb-10"
      >
        Learn a Skill from Top Mentors
      </motion.h1>

      <div className="relative max-w-lg mx-auto mb-8">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedSkill(null);
          }}
          className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 text-white border border-zinc-700 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filteredSkills.map((skill) => (
          <SkillTag
            key={skill}
            skill={skill}
            selected={selectedSkill === skill}
            onClick={() =>
              setSelectedSkill(selectedSkill === skill ? null : skill)
            }
            className="transition-all hover:scale-105"
          />
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center text-gray-500 text-lg italic mt-10">
          😕 No mentors found for{" "}
          <span className="font-semibold">
            {selectedSkill || "this search"}
          </span>
          .
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredMentors.map((mentor) => (
          <UserCard
            key={mentor.id}
            profile={{
              username: mentor.username,
              full_name: mentor.full_name,
              bio: mentor.bio,
              skills: mentor.skills,
              avatar_url: mentor.avatar_url,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
