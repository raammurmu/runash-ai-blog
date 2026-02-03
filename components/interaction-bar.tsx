"use client"
import { useState } from "react"
import { Heart, ArrowBigUp, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const FloatingHeart = ({ id, onComplete }: { id: number; onComplete: (id: number) => void }) => {
  return (
    <motion.div
      initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
      animate={{ 
        y: -100, 
        x: (Math.random() - 0.5) * 50, 
        opacity: 0, 
        scale: 1.5 
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onAnimationComplete={() => onComplete(id)}
      className="absolute text-red-500 pointer-events-none"
    >
      <Heart className="h-6 w-6 fill-current" />
    </motion.div>
  )
}

export const InteractionBar = () => {
  const [upvotes, setUpvotes] = useState(124)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [hearts, setHearts] = useState<{ id: number }[]>([])

  const handleHeartClick = () => {
    const newHeart = { id: Date.now() }
    setHearts((prev) => [...prev, newHeart])
  }

  const removeHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id))
  }

  const handleUpvote = () => {
    setUpvotes(prev => hasUpvoted ? prev - 1 : prev + 1)
    setHasUpvoted(!hasUpvoted)
  }

  return (
    <div className="flex items-center gap-6 my-10 py-4 border-y border-orange-100 dark:border-orange-900/20">
      {/* Upvote Button */}
      <div className="flex items-center gap-2">
        <button 
          onClick={handleUpvote}
          className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all ${
            hasUpvoted 
            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" 
            : "bg-orange-50 dark:bg-orange-950 text-orange-600 hover:bg-orange-100"
          }`}
        >
          <ArrowBigUp className={`h-5 w-5 ${hasUpvoted ? "fill-current" : ""}`} />
          <span className="font-bold">{upvotes}</span>
        </button>
      </div>

      {/* Heart Button with Animation */}
      <div className="relative">
        <button 
          onClick={handleHeartClick}
          className="p-3 rounded-full bg-red-50 dark:bg-red-950/30 text-red-500 hover:scale-110 active:scale-95 transition-transform"
        >
          <Heart className="h-6 w-6" />
        </button>
        
        <AnimatePresence>
          {hearts.map((heart) => (
            <FloatingHeart key={heart.id} id={heart.id} onComplete={removeHeart} />
          ))}
        </AnimatePresence>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        Show some love to the author!
      </div>
    </div>
  )
}
