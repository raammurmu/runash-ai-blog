"use client"
import { useState, useEffect } from "react"
import { X, Send } from "lucide-react"

export const NewsletterSlideIn = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 80 && !dismissed) {
        setIsVisible(true)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [dismissed])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-10 duration-500">
      <div className="w-80 p-6 bg-white dark:bg-gray-900 border border-orange-200 dark:border-orange-800 rounded-2xl shadow-2xl">
        <button 
          onClick={() => { setIsVisible(false); setDismissed(true); }}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
        <h4 className="text-lg font-bold mb-2 text-orange-600">Enjoying the read?</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Join 5,000+ creators getting RunAsh AI insights weekly.
        </p>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Email address"
            className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
