"use client"

import { useEffect, useMemo, useState } from "react"
import { Pause, Play, Square, Volume2 } from "lucide-react"

type ReadState = "idle" | "reading" | "paused"

export function ReadAloud({ text }: { text: string }) {
  const [state, setState] = useState<ReadState>("idle")
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null)

  const sanitizedText = useMemo(() => text.replace(/\s+/g, " ").trim(), [text])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSynth(window.speechSynthesis)
    }

    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  const startOrResume = () => {
    if (!synth || !sanitizedText) return

    if (state === "paused") {
      synth.resume()
      setState("reading")
      return
    }

    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(sanitizedText)
    utterance.rate = 0.96
    utterance.pitch = 1
    utterance.onend = () => setState("idle")
    utterance.onerror = () => setState("idle")

    synth.speak(utterance)
    setState("reading")
  }

  const pause = () => {
    synth?.pause()
    setState("paused")
  }

  const stop = () => {
    synth?.cancel()
    setState("idle")
  }

  return (
    <div className="flex items-center gap-1 rounded-xl border border-orange-200 bg-white p-1.5 dark:border-orange-900/40 dark:bg-gray-950">
      {state === "idle" ? (
        <button onClick={startOrResume} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-orange-700 hover:bg-orange-50 dark:text-orange-300 dark:hover:bg-orange-950/40">
          <Volume2 className="h-3.5 w-3.5" /> Listen
        </button>
      ) : (
        <>
          <button onClick={state === "reading" ? pause : startOrResume} className="rounded-lg p-1.5 text-orange-700 hover:bg-orange-50 dark:text-orange-300 dark:hover:bg-orange-950/40">
            {state === "reading" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button onClick={stop} className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
            <Square className="h-4 w-4" />
          </button>
          <span className="px-1 text-[11px] font-medium text-muted-foreground">{state === "reading" ? "Reading" : "Paused"}</span>
        </>
      )}
    </div>
  )
}
