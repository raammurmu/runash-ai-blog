"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Languages, Pause, Play, Share2, Square, Volume2 } from "lucide-react"
import { toast } from "sonner"

type VoiceLanguage = "en-US" | "hi-IN"

const WORDS_PER_MINUTE = 150

const formatDuration = (seconds: number) => {
  const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0
  const mm = Math.floor(safe / 60)
  const ss = safe % 60
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
}

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()

export const ReadAloud = ({ text }: { text: string }) => {
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null)
  const [isReading, setIsReading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [voiceLanguage, setVoiceLanguage] = useState<VoiceLanguage>("en-US")
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  const startedAtRef = useRef<number | null>(null)
  const elapsedBeforePauseRef = useRef(0)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const plainText = useMemo(() => stripHtml(text), [text])

  const estimatedDuration = useMemo(() => {
    const words = plainText.length ? plainText.split(/\s+/).length : 0
    return Math.ceil((words / WORDS_PER_MINUTE) * 60)
  }, [plainText])

  useEffect(() => {
    if (typeof window === "undefined") return

    const speech = window.speechSynthesis
    setSynth(speech)

    const syncVoices = () => {
      const available = speech.getVoices()
      if (available.length) {
        setVoices(available)
        const hasHindi = available.some((voice) => voice.lang.toLowerCase().startsWith("hi"))
        if (!hasHindi && voiceLanguage === "hi-IN") {
          setVoiceLanguage("en-US")
        }
      }
    }

    syncVoices()
    speech.onvoiceschanged = syncVoices

    return () => {
      speech.cancel()
      speech.onvoiceschanged = null
    }
  }, [voiceLanguage])

  useEffect(() => {
    if (!isReading) return

    const id = window.setInterval(() => {
      if (startedAtRef.current) {
        const activeElapsed = elapsedBeforePauseRef.current + (Date.now() - startedAtRef.current) / 1000
        setElapsed(activeElapsed)
      }
    }, 400)

    return () => window.clearInterval(id)
  }, [isReading])

  const hasHindiVoice = useMemo(
    () => voices.some((voice) => voice.lang.toLowerCase().startsWith("hi")),
    [voices],
  )

  const findVoice = (lang: VoiceLanguage) => {
    const normalized = lang.toLowerCase()
    return voices.find((voice) => voice.lang.toLowerCase() === normalized) ?? voices.find((voice) => voice.lang.toLowerCase().startsWith(normalized.split("-")[0]))
  }

  const stopReading = () => {
    synth?.cancel()
    setIsReading(false)
    setIsPaused(false)
    setElapsed(0)
    elapsedBeforePauseRef.current = 0
    startedAtRef.current = null
    utteranceRef.current = null
  }

  const startReading = () => {
    if (!synth || !plainText) return

    if (isPaused && utteranceRef.current) {
      synth.resume()
      startedAtRef.current = Date.now()
      setIsPaused(false)
      setIsReading(true)
      return
    }

    synth.cancel()
    const newUtterance = new SpeechSynthesisUtterance(plainText)
    const selectedVoice = findVoice(voiceLanguage)

    newUtterance.lang = selectedVoice?.lang ?? voiceLanguage
    if (selectedVoice) newUtterance.voice = selectedVoice
    newUtterance.rate = 0.95
    newUtterance.pitch = 1

    newUtterance.onend = () => stopReading()
    newUtterance.onerror = () => {
      toast.error("Unable to play audio for this article")
      stopReading()
    }

    utteranceRef.current = newUtterance
    elapsedBeforePauseRef.current = 0
    setElapsed(0)
    startedAtRef.current = Date.now()
    synth.speak(newUtterance)
    setIsReading(true)
    setIsPaused(false)
  }

  const pauseReading = () => {
    if (!synth) return
    synth.pause()
    if (startedAtRef.current) {
      elapsedBeforePauseRef.current += (Date.now() - startedAtRef.current) / 1000
      setElapsed(elapsedBeforePauseRef.current)
      startedAtRef.current = null
    }
    setIsPaused(true)
    setIsReading(false)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Article link copied")
    } catch {
      toast.error("Could not copy article link")
    }
  }

  const showPlay = !isReading && !isPaused

  return (
    <div className="not-prose mt-8 border border-border/70 bg-background/90 px-4 py-3 shadow-sm backdrop-blur-sm md:px-5">
      <div className="flex flex-wrap items-center gap-3 md:gap-5">
        <button
          aria-label={showPlay ? "Listen to article" : isReading ? "Pause reading" : "Resume reading"}
          onClick={isReading ? pauseReading : startReading}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-muted/70"
        >
          {showPlay ? <Play className="h-4 w-4 fill-current" /> : isReading ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
        </button>

        <div className="flex items-center gap-2 text-sm">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Listen to article</span>
        </div>

        <span className="text-sm tabular-nums text-muted-foreground">
          {formatDuration(Math.min(elapsed, estimatedDuration))} / {formatDuration(estimatedDuration)}
        </span>

        <button
          aria-label="Stop reading"
          onClick={stopReading}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted/70 hover:text-foreground"
        >
          <Square className="h-4 w-4 fill-current" />
        </button>

        <div className="ml-auto flex items-center gap-2">
          <label className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Languages className="h-3.5 w-3.5" />
            Voice
          </label>
          <select
            aria-label="Select article voice language"
            className="h-8 rounded-md border border-border bg-background px-2 text-xs"
            value={voiceLanguage}
            onChange={(event) => setVoiceLanguage(event.target.value as VoiceLanguage)}
          >
            <option value="en-US">English</option>
            <option value="hi-IN" disabled={!hasHindiVoice}>
              Hindi {hasHindiVoice ? "" : "(not available)"}
            </option>
          </select>

          <button
            aria-label="Share article"
            onClick={copyLink}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition hover:bg-muted/70 hover:text-foreground"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
