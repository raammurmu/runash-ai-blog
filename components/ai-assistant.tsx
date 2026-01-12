"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, X, Send, Sparkles, FileText, 
  ThumbsUp, ThumbsDown, Loader2, Bot, User 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string // JSON string for assistant, plain text for user
  feedback?: "up" | "down"
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    { 
      role: "assistant", 
      content: JSON.stringify({ 
        answer: "Hi! I'm your RunAsh assistant. How can I help with your streaming or AI setup?", 
        sourceUrl: null 
      }) 
    }
  ])

  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMsg: Message = { role: "user", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: "assistant", content: JSON.stringify(data) }])
    } catch (err) {
      toast.error("Assistant currently unavailable")
    } finally {
      setIsTyping(false)
    }
  }

  const giveFeedback = (index: number, type: "up" | "down") => {
    setMessages(prev => prev.map((m, i) => i === index ? { ...m, feedback: type } : m))
    toast.success("Feedback recorded")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[90vw] sm:w-[400px] shadow-2xl"
          >
            <Card className="border-primary/20 overflow-hidden backdrop-blur-lg bg-background/95">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 fill-white" />
                    <CardTitle className="text-sm">RunAsh AI Assistant</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-white hover:bg-white/20">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0 h-[450px]">
                <ScrollArea ref={scrollRef} className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((msg, i) => {
                      const isAssistant = msg.role === "assistant"
                      const data = isAssistant ? JSON.parse(msg.content) : { answer: msg.content }

                      return (
                        <div key={i} className={cn("flex flex-col gap-2", isAssistant ? "items-start" : "items-end")}>
                          <div className={cn(
                            "max-w-[85%] px-4 py-2 text-sm shadow-sm",
                            isAssistant ? "bg-muted rounded-2xl rounded-tl-none border" : "bg-orange-500 text-white rounded-2xl rounded-tr-none"
                          )}>
                            <p>{data.answer}</p>
                            {isAssistant && data.sourceUrl && (
                              <Link href={data.sourceUrl} className="mt-2 flex items-center gap-1 text-[10px] font-bold text-orange-600 hover:underline uppercase">
                                <FileText className="h-3 w-3" /> Source: {data.sourceTitle}
                              </Link>
                            )}
                          </div>
                          
                          {isAssistant && i !== 0 && (
                            <div className="flex gap-1 ml-1">
                              <Button 
                                variant="ghost" size="icon" onClick={() => giveFeedback(i, "up")}
                                className={cn("h-6 w-6 rounded-full", msg.feedback === "up" && "bg-green-100 text-green-600")}
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button 
                                variant="ghost" size="icon" onClick={() => giveFeedback(i, "down")}
                                className={cn("h-6 w-6 rounded-full", msg.feedback === "down" && "bg-red-100 text-red-600")}
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl p-3 animate-pulse">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 border-t">
                <form onSubmit={handleSend} className="flex w-full gap-2">
                  <Input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..." 
                    className="rounded-full bg-muted/50 border-none"
                  />
                  <Button type="submit" size="icon" disabled={isTyping} className="rounded-full bg-orange-500">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn("h-14 w-14 rounded-full shadow-2xl transition-all", isOpen ? "bg-muted text-foreground rotate-90" : "bg-orange-500")}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  )
        }
