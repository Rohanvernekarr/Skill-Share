'use client'

import { motion } from "framer-motion"
import { SparklesCore } from "@/components/ui/Sparkles"

export default function Hero2() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 py-24 px-6 text-center overflow-hidden">
      
     

      {/* Decorative Blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-32 w-96 h-96 bg-pink-200 dark:bg-zinc-700 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-blue-300 dark:bg-blue-800 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-500 via-blue-200 to-gray-500 bg-clip-text text-transparent mb-6 leading-tight"
        >
          Learn. Teach. Grow Together 🌱
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto mb-8"
        >
          Empower your journey with real people. Find mentors, share what you know, and grow through collaboration and feedback.
        </motion.p>

        {/* Animated Skill Tags */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="flex justify-center flex-wrap gap-4 mb-10"
        >
          {["🎓 Live Sessions", "🧠 1:1 Mentorship", "🚀 Project-based Learning", "🤝 Peer Reviews"].map((tag, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-2 bg-white/80 dark:bg-zinc-800/60 backdrop-blur border  hover:scale-105 rounded-full text-sm font-medium shadow-md"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center gap-4"
        >
          <a
            href="/learn"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:scale-105 transform transition-all shadow-lg"
          >
            Start Leaning
          </a>
          <a
            href="/about"
            className="px-8 py-4 border-2 border-zinc-600 text-zinc-700 dark:text-zinc-300 dark:border-zinc-500 rounded-xl font-medium hover:bg-zinc-100  hover:scale-105 dark:hover:bg-zinc-800 transition-all"
          >
            About Us
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex justify-center gap-8 text-zinc-600 dark:text-zinc-400"
        >
          {[
            { value: "1k+", label: "Active Mentors" },
            { value: "5k+", label: "Skills Shared" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
