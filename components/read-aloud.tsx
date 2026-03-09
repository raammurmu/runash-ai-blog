"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Languages, Loader2, Mic2, Pause, Play, Share2, Square, Volume2 } from "lucide-react"
import { toast } from "sonner"

type VoiceLanguage = "en-US" | "hi-IN"

const WORDS_PER_MINUTE = 150
const PODCAST_INTRO = "Welcome to the RunAsh podcast. Here is today's article."

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
  const [isTranslating, setIsTranslating] = useState(false)
  const [hindiTranslation, setHindiTranslation] = useState("")
  const [isPodcastMode, setIsPodcastMode] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)

  const startedAtRef = useRef<number | null>(null)
  const elapsedBeforePauseRef = useRef(0)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const plainText = useMemo(() => stripHtml(text), [text])

  const speechBody = useMemo(() => {
    if (voiceLanguage === "hi-IN" && hindiTranslation) return hindiTranslation
    return plainText
  }, [voiceLanguage, hindiTranslation, plainText])

  const speechText = useMemo(() => {
    if (!speechBody) return ""
    return isPodcastMode ? `${PODCAST_INTRO} ${speechBody}` : speechBody
  }, [isPodcastMode, speechBody])

  const estimatedDuration = useMemo(() => {
    const words = speechText.length ? speechText.split(/\s+/).length : 0
    return Math.ceil((words / WORDS_PER_MINUTE) * 60 / playbackRate)
  }, [speechText, playbackRate])

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

  const hasHindiVoice = useMemo(() => voices.some((voice) => voice.lang.toLowerCase().startsWith("hi")), [voices])

  const findVoice = (lang: VoiceLanguage) => {
    const normalized = lang.toLowerCase()
    return (
      voices.find((voice) => voice.lang.toLowerCase() === normalized) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith(normalized.split("-")[0]))
    )
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

  const translateToHindi = async () => {
    if (!plainText) return
    setIsTranslating(true)

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: plainText, source: "en", target: "hi" }),
      })

      if (!response.ok) {
        throw new Error("translation failed")
      }

      const payload = (await response.json()) as { translatedText?: string }
      if (!payload.translatedText) {
        throw new Error("empty translation")
      }

      setHindiTranslation(payload.translatedText)
      toast.success("Hindi podcast ready")
    } catch {
      toast.error("Could not prepare Hindi audio")
    } finally {
      setIsTranslating(false)
    }
  }

  useEffect(() => {
    if (voiceLanguage === "hi-IN" && !hindiTranslation && !isTranslating) {
      void translateToHindi()
    }
  }, [voiceLanguage, hindiTranslation, isTranslating])

  const startReading = async () => {
    if (!synth || !plainText) return

    if (isPaused && utteranceRef.current) {
      synth.resume()
      startedAtRef.current = Date.now()
      setIsPaused(false)
      setIsReading(true)
      return
    }

    if (voiceLanguage === "hi-IN" && !hindiTranslation) {
      await translateToHindi()
    }

    const nextSpeech = voiceLanguage === "hi-IN" && hindiTranslation ? (isPodcastMode ? `${PODCAST_INTRO} ${hindiTranslation}` : hindiTranslation) : speechText

    synth.cancel()
    const newUtterance = new SpeechSynthesisUtterance(nextSpeech)
    const selectedVoice = findVoice(voiceLanguage)

    newUtterance.lang = selectedVoice?.lang ?? voiceLanguage
    if (selectedVoice) newUtterance.voice = selectedVoice
    newUtterance.rate = playbackRate
    newUtterance.pitch = isPodcastMode ? 0.95 : 1

    newUtterance.onend = () => stopReading()
    newUtterance.onerror = () => {
      toast.error("Unable to play this podcast")
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
      toast.success("Podcast link copied")
    } catch {
      toast.error("Could not copy page link")
    }
  }

  const showPlay = !isReading && !isPaused

  return (
    <div className="not-prose mt-8 border border-border/70 bg-background/90 px-4 py-3 shadow-sm backdrop-blur-sm md:px-5" data-no-page-translate="true">
      <div className="flex flex-wrap items-center gap-3 md:gap-5">
        <button
          aria-label={showPlay ? "Listen as podcast" : isReading ? "Pause podcast" : "Resume podcast"}
          onClick={isReading ? pauseReading : () => void startReading()}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-muted/70"
          disabled={isTranslating}
        >
          {showPlay ? <Play className="h-4 w-4 fill-current" /> : isReading ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
        </button>

        <div className="flex items-center gap-2 text-sm">
          <Mic2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Listen to podcast</span>
          {isTranslating ? (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Preparing...
            </span>
          ) : null}
        </div>

        <span className="text-sm tabular-nums text-muted-foreground">
          {formatDuration(Math.min(elapsed, estimatedDuration))} / {formatDuration(estimatedDuration)}
        </span>

        <button
          aria-label="Stop podcast"
          onClick={stopReading}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted/70 hover:text-foreground"
        >
          <Square className="h-4 w-4 fill-current" />
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPodcastMode((prev) => !prev)}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs transition ${isPodcastMode ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/70"}`}
          >
            <Volume2 className="h-3.5 w-3.5" /> Podcast mode
          </button>

          <select
            aria-label="Podcast speed"
            className="h-8 rounded-md border border-border bg-background px-2 text-xs"
            value={String(playbackRate)}
            onChange={(event) => setPlaybackRate(Number(event.target.value))}
          >
            <option value="0.85">0.85x</option>
            <option value="1">1.0x</option>
            <option value="1.15">1.15x</option>
            <option value="1.3">1.3x</option>
          </select>

          <label className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Languages className="h-3.5 w-3.5" />
            Voice
          </label>
          <select
            aria-label="Select podcast voice language"
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
            aria-label="Share podcast"
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
