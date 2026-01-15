"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export function ReadingProgress() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Use spring for a smoother, "liquid" movement effect
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-[100] bg-orange-100/30 backdrop-blur-sm">
      <motion.div
        className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 origin-left"
        style={{ scaleX }}
      />
      {/* Subtle glow effect at the tip of the progress bar */}
      <div className="absolute right-0 top-0 h-full w-4 bg-orange-400 blur-md opacity-50" 
           style={{ transform: `translateX(${(scaleX.get() * 100) - 100}%)` }} 
      />
    </div>
  )
}
