"use client";

import { useTheme } from "@/context/ThemeProvider";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
    onClick={toggleTheme}
    className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
    aria-label="Toggle theme"
  >
    {theme === "dark" ? (
      <SunIcon className="w-5 h-5 text-yellow-400" />
    ) : (
      <MoonIcon className="w-5 h-5 text-gray-800 dark:text-white" />
    )}
  </button>
  
  );
}
