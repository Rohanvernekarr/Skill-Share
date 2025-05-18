"use client";

import React from "react";
import { cn } from "@/utils/classMerge";

type SkillTagProps = {
  skill: string;
  selected?: boolean;
  onClick?: () => void;
};

export const SkillTag: React.FC<SkillTagProps> = ({ skill, selected = false, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-full border text-sm transition-colors",
        selected
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
      )}
    >
      {skill}
    </button>
  );
};
