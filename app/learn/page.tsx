"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Input from "@/components/ui/Input"
import { SkillTag } from "@/components/common/SkillTag"
import UserCard from "@/components/common/UserCard"
import { skills } from "@/constants/skills"
import { mentors } from "@/constants/mentors"

export default function LearnPage() {
  const [search, setSearch] = useState("")
  const [filteredSkills, setFilteredSkills] = useState(skills)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  useEffect(() => {
    const s = search.toLowerCase()
    const filtered = skills.filter(skill => skill.toLowerCase().includes(s))
    setFilteredSkills(filtered)
  }, [search])

  const filteredMentors = mentors.filter(mentor =>
    selectedSkill
      ? mentor.skills?.includes(selectedSkill)
      : mentor.skills?.some((skill: string) => filteredSkills.includes(skill))
  )

  return (
    <div className="max-w-7xl h-dvh mx-auto py-12 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        Learn a Skill from Experienced Mentors
      </motion.h1>

      <div className="max-w-md mx-auto mb-6">
        <Input
          placeholder="Search skills..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setSelectedSkill(null)
          }}
        />
      </div>

      <div className="flex flex-wrap  justify-center gap-2 mb-10">
        {filteredSkills.map(skill => (
          <SkillTag
            key={skill}
            skill={skill}
            selected={selectedSkill === skill}
            onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
          />
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <p className="text-center text-gray-500">😕 No mentors found for this skill.</p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 "
      >
        {filteredMentors.map(mentor => (
          <UserCard 
            key={mentor.id} 
            profile={{
              username: mentor.username,
              full_name: mentor.full_name,
              bio: mentor.bio,
              skills: mentor.skills,
              avatar_url: mentor.avatar_url
            }} 
          />
        ))}
      </motion.div>
    </div>
  )
}
