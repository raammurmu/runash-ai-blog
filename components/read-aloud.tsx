"use client"
import { useState, useEffect } from "react"
import { Volume2, VolumeX, Play, Pause, Square } from "lucide-react"

export const ReadAloud = ({ text }: { text: string }) => {
  const [isReading, setIsReading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSynth(window.speechSynthesis)
    }
  }, [])

  const startReading = () => {
    if (!synth) return

    if (isPaused) {
      synth.resume()
      setIsPaused(false)
      setIsReading(true)
      return
    }

    const newUtterance = new SpeechSynthesisUtterance(text)
    
    // Customizing the voice experience
    newUtterance.rate = 0.95; // Slightly slower for better clarity
    newUtterance.pitch = 1;
    
    newUtterance.onend = () => {
      setIsReading(false)
      setIsPaused(false)
    }

    setUtterance(newUtterance)
    synth.speak(newUtterance)
    setIsReading(true)
  }

  const pauseReading = () => {
    synth?.pause()
    setIsPaused(true)
    setIsReading(false)
  }

  const stopReading = () => {
    synth?.cancel()
    setIsReading(false)
    setIsPaused(false)
  }

  return (
    <div className="flex items-center gap-2 p-1.5 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/30">
      {!isReading && !isPaused ? (
        <button
          onClick={startReading}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm font-bold text-orange-600 shadow-sm hover:shadow-md transition-all"
        >
          <Volume2 className="h-4 w-4" /> Listen to Article
        </button>
      ) : (
        <div className="flex items-center gap-1">
          <button 
            onClick={isReading ? pauseReading : startReading}
            className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-orange-600"
          >
            {isReading ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
          </button>
          <button 
            onClick={stopReading}
            className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-red-500"
          >
            <Square className="h-4 w-4 fill-current" />
          </button>
          <span className="text-xs font-bold text-orange-600 px-2 animate-pulse">
            {isReading ? "Reading..." : "Paused"}
          </span>
        </div>
      )}
    </div>
  )
}
