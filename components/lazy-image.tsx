"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const LazyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "200px" } // Start loading 200px before it hits the screen
    )

    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={`relative overflow-hidden bg-gray-200 dark:bg-gray-800 ${className}`}>
      {/* Blurry Placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-orange-100/20 backdrop-blur-xl animate-pulse"
          />
        )}
      </AnimatePresence>

      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: isLoaded ? 1 : 0, filter: isLoaded ? "blur(0px)" : "blur(10px)" }}
          transition={{ duration: 0.6 }}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover ${className}`}
        />
      )}
    </div>
  )
}
