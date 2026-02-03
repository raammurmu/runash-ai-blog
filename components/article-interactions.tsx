"use client"
import { useState, useEffect } from "react"
import { Heart, ArrowBigUp, Hourglass } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// --- Floating Heart Animation ---
const FloatingHeart = ({ id, onComplete }: { id: number; onComplete: (id: number) => void }) => (
  <motion.div
    initial={{ y: 0, x: 0, opacity: 1, scale: 0.5 }}
    animate={{ y: -120, x: (Math.random() - 0.5) * 60, opacity: 0, scale: 1.5 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    onAnimationComplete={() => onComplete(id)}
    className="absolute text-red-500 pointer-events-none z-50"
  >
    <Heart className="h-6 w-6 fill-current" />
  </motion.div>
)

export const ArticleInteractions = ({ initialReadTime }: { initialReadTime: string }) => {
  const [upvotes, setUpvotes] = useState(142)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [hearts, setHearts] = useState<{ id: number }[]>([])
  const [timeLeft, setTimeLeft] = useState(parseInt(initialReadTime))

  // Calculate remaining time based on scroll
  useEffect(() => {
    const updateTime = () => {
      const scrollPos = window.scrollY
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = scrollPos / totalHeight
      const remaining = Math.max(0, Math.ceil(parseInt(initialReadTime) * (1 - progress)))
      setTimeLeft(remaining)
    }
    window.addEventListener("scroll", updateTime)
    return () => window.removeEventListener("scroll", updateTime)
  }, [initialReadTime])

  const handleHeart = () => {
    setHearts(prev => [...prev, { id: Date.now() }])
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 my-12 py-6 border-y border-orange-100 dark:border-orange-900/20">
      <div className="flex items-center gap-4">
        {/* Upvote */}
        <button 
          onClick={() => { setUpvotes(prev => hasUpvoted ? prev - 1 : prev + 1); setHasUpvoted(!hasUpvoted); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${
            hasUpvoted ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "bg-orange-50 dark:bg-orange-950 text-orange-600 hover:bg-orange-100"
          }`}
        >
          <ArrowBigUp className={`h-6 w-6 ${hasUpvoted ? "fill-current" : ""}`} />
          {upvotes}
        </button>

        {/* Like/Heart */}
        <div className="relative">
          <button 
            onClick={handleHeart}
            className="p-3 rounded-full bg-red-50 dark:bg-red-950/30 text-red-500 hover:scale-110 active:scale-95 transition-transform"
          >
            <Heart className="h-6 w-6" />
          </button>
          <AnimatePresence>
            {hearts.map(h => (
              <FloatingHeart key={h.id} id={h.id} onComplete={(id) => setHearts(p => p.filter(x => x.id !== id))} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Time Remaining Indicator */}
      <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
        <div className="relative h-8 w-8">
          <Hourglass className="h-8 w-8 text-orange-500 opacity-20" />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-orange-600"
            animate={{ rotate: timeLeft > 0 ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {timeLeft}
          </motion.div>
        </div>
        <div className="text-sm">
          <p className="font-bold leading-none">{timeLeft} min left</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Reading Time</p>
        </div>
      </div>
    </div>
  )
}
