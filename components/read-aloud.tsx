"use client"
import { useEffect, useState } from "react"
import { Pause, Play, Square, Volume2 } from "lucide-react"

export const ReadAloud = ({ text }: { text: string }) => {
  const [isReading, setIsReading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSynth(window.speechSynthesis)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel()
      }
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

    synth.cancel()

    const newUtterance = new SpeechSynthesisUtterance(text)
    newUtterance.rate = 0.95
    newUtterance.pitch = 1

    newUtterance.onend = () => {
      setIsReading(false)
      setIsPaused(false)
    }

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
    <div className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 p-1.5 dark:border-orange-900/30 dark:bg-orange-950/20">
      {!isReading && !isPaused ? (
        <button
          onClick={startReading}
          aria-label="Play article narration"
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow-sm transition-all hover:shadow-md dark:bg-gray-900"
        >
          <Volume2 className="h-4 w-4" /> Listen to Article
        </button>
      ) : (
        <div className="flex items-center gap-1">
          <button
            onClick={isReading ? pauseReading : startReading}
            aria-label={isReading ? "Pause article narration" : "Resume article narration"}
            className="rounded-lg p-2 text-orange-600 hover:bg-white dark:hover:bg-gray-800"
          >
            {isReading ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
          </button>
          <button
            onClick={stopReading}
            aria-label="Stop article narration"
            className="rounded-lg p-2 text-red-500 hover:bg-white dark:hover:bg-gray-800"
          >
            <Square className="h-4 w-4 fill-current" />
          </button>
          <span className="animate-pulse px-2 text-xs font-bold text-orange-600">{isReading ? "Reading..." : "Paused"}</span>
        </div>
      )}
    </div>
  )
}
