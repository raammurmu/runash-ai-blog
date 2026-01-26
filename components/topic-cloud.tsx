"use client"
import { motion } from "framer-motion"
import { Hash, TrendingUp } from "lucide-react"

export const TopicCloud = ({ onTagClick }: { onTagClick: (tag: string) => void }) => {
  // In a real app, you'd derive these counts from your post data
  const topics = [
    { name: "AI Video", count: 12 },
    { name: "Streaming", count: 8 },
    { name: "Low Latency", count: 5 },
    { name: "Content Creation", count: 15 },
    { name: "Machine Learning", count: 7 },
    { name: "Cloud Computing", count: 4 },
    { name: "GPU Encoding", count: 9 },
    { name: "Future Tech", count: 11 },
  ]

  return (
    <section className="mt-20 py-12 border-t border-orange-100 dark:border-orange-900/20">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="h-5 w-5 text-orange-500" />
        <h3 className="text-2xl font-bold italic">Explore Topics</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {topics.map((topic, i) => (
          <motion.button
            key={topic.name}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagClick(topic.name)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/10 dark:hover:bg-orange-900/30 border border-orange-100 dark:border-orange-800/30 text-orange-700 dark:text-orange-400 transition-colors group"
          >
            <Hash className="h-3 w-3 opacity-50 group-hover:opacity-100" />
            <span className="font-medium">{topic.name}</span>
            <span className="text-[10px] font-bold bg-orange-200/50 dark:bg-orange-800/50 px-1.5 py-0.5 rounded-md">
              {topic.count}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
