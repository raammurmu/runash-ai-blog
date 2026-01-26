"use client"
import { useState } from "react"
import { Sparkles, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export const AISummary = ({ content }: { content: string }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [summary, setSummary] = useState<string[] | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const generateSummary = () => {
    setIsGenerating(true)
    // Simulate AI processing delay
    setTimeout(() => {
      setSummary([
        "AI-driven video encoding reduces creator hardware load by 30%.",
        "Real-time latency is achieved via a distributed network of edge inference nodes.",
        "Viewer retention increases by 40% when using automated stream enhancements."
      ])
      setIsGenerating(false)
      setIsOpen(true)
    }, 1500)
  }

  return (
    <div className="my-8 rounded-2xl border border-orange-200 bg-orange-50/30 dark:border-orange-900/30 dark:bg-orange-950/10 overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
          <Sparkles className="h-5 w-5" />
          <span className="font-bold text-sm uppercase tracking-tight">RunAsh AI Insights</span>
        </div>
        
        {!summary ? (
          <button 
            onClick={generateSummary}
            disabled={isGenerating}
            className="text-xs font-bold bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
            {isGenerating ? "Analyzing..." : "Summarize with AI"}
          </button>
        ) : (
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && summary && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-6"
          >
            <div className="space-y-3 border-t border-orange-100 dark:border-orange-900/20 pt-4">
              {summary.map((point, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="text-orange-500 font-bold">•</span>
                  {point}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
