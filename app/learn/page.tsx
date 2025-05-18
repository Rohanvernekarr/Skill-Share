// app/learn/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

export default function LearnPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*");

      if (!error) setLessons(data || []);
      setLoading(false);
    };

    fetchLessons();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 p-8">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">
        Explore Skills to Learn
      </h1>

      {loading ? (
        <div className="text-zinc-500 dark:text-zinc-400">Loading lessons...</div>
      ) : lessons.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400">No lessons available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link
              href={`/learn/${lesson.id}`}
              key={lesson.id}
              className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-white mb-2">
                {lesson.title}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-3">
                {lesson.description}
              </p>
              <div className="mt-4 text-sm text-zinc-500 font-medium">
                {lesson.skill_level || "Beginner"}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
