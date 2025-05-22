'use client'

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function SparklesCore({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none z-0", className)}>
      <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] animate-pulse"></div>
    </div>
  )
}
