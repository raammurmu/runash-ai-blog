"use client"

import { useMemo, useRef, useState } from "react"
import { Languages, Loader2 } from "lucide-react"
import { toast } from "sonner"

type PageLanguage = "en" | "hi"

const isTranslatableText = (value: string) => {
  const text = value.trim()
  if (!text) return false
  if (/^[\d\s.,:/%-]+$/.test(text)) return false
  return true
}

const shouldSkipNode = (node: Text) => {
  const parent = node.parentElement
  if (!parent) return true
  if (parent.closest("[data-no-page-translate='true']")) return true
  return ["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "TEXTAREA"].includes(parent.tagName)
}

export function PageTranslateControl() {
  const [language, setLanguage] = useState<PageLanguage>("en")
  const [isTranslating, setIsTranslating] = useState(false)
  const originalsRef = useRef<Map<Text, string>>(new Map())

  const label = useMemo(() => (isTranslating ? "Translating..." : "Page"), [isTranslating])

  const restoreEnglish = () => {
    originalsRef.current.forEach((value, node) => {
      node.nodeValue = value
    })
    originalsRef.current.clear()
    document.documentElement.lang = "en"
  }

  const translatePage = async () => {
    setIsTranslating(true)
    try {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      const nodes: Text[] = []
      const uniqueTexts: string[] = []
      const textIndex = new Map<string, number>()
      const lookup: number[] = []

      while (walker.nextNode()) {
        const node = walker.currentNode as Text
        if (shouldSkipNode(node)) continue

        const value = node.nodeValue ?? ""
        if (!isTranslatableText(value)) continue

        if (!originalsRef.current.has(node)) {
          originalsRef.current.set(node, value)
        }

        nodes.push(node)

        const key = value.trim()
        const existing = textIndex.get(key)
        if (existing !== undefined) {
          lookup.push(existing)
        } else {
          const next = uniqueTexts.length
          uniqueTexts.push(key)
          textIndex.set(key, next)
          lookup.push(next)
        }
      }

      if (!uniqueTexts.length) return

      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: uniqueTexts, source: "en", target: "hi" }),
      })

      if (!response.ok) {
        throw new Error("Translation failed")
      }

      const payload = (await response.json()) as { translatedTexts?: string[] }
      const translated = payload.translatedTexts
      if (!translated || translated.length !== uniqueTexts.length) {
        throw new Error("Unexpected translation payload")
      }

      nodes.forEach((node, idx) => {
        const translatedText = translated[lookup[idx]]
        if (translatedText) node.nodeValue = translatedText
      })

      document.documentElement.lang = "hi"
    } catch {
      toast.error("Could not translate this page right now")
      setLanguage("en")
      restoreEnglish()
    } finally {
      setIsTranslating(false)
    }
  }

  const handleChange = async (value: PageLanguage) => {
    setLanguage(value)
    if (value === "en") {
      restoreEnglish()
      return
    }

    if (value === "hi") {
      await translatePage()
    }
  }

  return (
    <div className="inline-flex items-center gap-1.5" data-no-page-translate="true">
      <label className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        {isTranslating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Languages className="h-3.5 w-3.5" />}
        {label}
      </label>
      <select
        aria-label="Translate page language"
        className="h-8 rounded-md border border-border bg-background px-2 text-xs"
        value={language}
        disabled={isTranslating}
        onChange={(event) => void handleChange(event.target.value as PageLanguage)}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>
    </div>
  )
}
