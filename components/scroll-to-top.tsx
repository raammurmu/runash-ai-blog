"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollToTop() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button when user has scrolled 50% down the page
    return scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.5)
    })
  }, [scrollYProgress])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            size="icon"
            onClick={scrollToTop}
            className={cn(
              "h-12 w-12 rounded-full shadow-2xl shadow-orange-500/40",
              "bg-gradient-to-br from-orange-500 to-amber-600 text-white",
              "hover:from-orange-600 hover:to-amber-700 hover:scale-110 active:scale-95 transition-all"
            )}
          >
            <ChevronUp className="h-6 w-6 stroke-[3px]" />
            <span className="sr-only">Scroll to top</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
