"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user has already seen this recently
    const hasSeen = localStorage.getItem("findley-exit-intent")
    if (hasSeen) return

    const handleMouseOut = (e: MouseEvent) => {
      // Trigger when mouse leaves the top of the viewport
      if (e.clientY <= 0 && !isDismissed) {
        setIsVisible(true)
      }
    }

    // Mobile fallback: Trigger after 60 seconds or 80% scroll
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight
      const totalHeight = document.documentElement.scrollHeight
      if (scrollPos > totalHeight * 0.8 && !isDismissed) {
        setIsVisible(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseOut)
    window.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("mouseleave", handleMouseOut)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isDismissed])

  const dismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    // Don't show again for 7 days
    localStorage.setItem("findley-exit-intent", "true")
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="absolute inset-0 bg-orange-950/60 backdrop-blur-md" 
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-card border border-orange-100 dark:border-orange-900 overflow-hidden rounded-[2.5rem] shadow-2xl"
          >
            {/* Header Gradient */}
            <div className="h-32 bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center relative">
              <Sparkles className="text-white/20 h-24 w-24 absolute -left-4 -top-4 rotate-12" />
              <Download className="text-white h-12 w-12 drop-shadow-lg" />
              <button 
                onClick={dismiss}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-8 text-center">
              <h3 className="text-2xl font-black text-orange-950 dark:text-orange-50 mb-2">
                Wait! Don't go empty-handed.
              </h3>
              <p className="text-muted-foreground mb-6">
                Download our <strong>"Ultimate Findley Strategy Guide"</strong> (PDF) for free and take your research to the next level.
              </p>

              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); dismiss(); }}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="pl-10 h-12 rounded-xl border-orange-100 dark:border-orange-900 focus-visible:ring-orange-500"
                    required
                  />
                </div>
                <Button className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/20">
                  Send My Free Copy
                </Button>
                <p className="text-[10px] text-muted-foreground">
                  Join 5,000+ researchers. No spam, just pure value.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
      }
