"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, X, Send, Sparkles, 
  Minus, Maximize2, Bot, User 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function AIAssistant() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState([
    { role: "assistant", content: "Hi! I'm RunAsh AI. How can I help you scale your streaming or AI workflow today?" }
  ])
  const [isTyping, setIsTyping] = React.useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { role: "user", content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "I've analyzed your request. Based on our current API, you can optimize your stream latency by adjusting the ingest server to our Mumbai region." 
      }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[380px] sm:w-[420px] shadow-2xl overflow-hidden"
          >
            <Card className="border-primary/20">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold">RunAsh Assistant</CardTitle>
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-300 animate-pulse" />
                        <span className="text-[10px] opacity-90">Always active</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-white hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 h-[400px] bg-background">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                        <div className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                          msg.role === "user" 
                            ? "bg-primary text-primary-foreground rounded-tr-none" 
                            : "bg-muted rounded-tl-none border border-border/50"
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                          <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 border-t bg-muted/30">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex w-full items-center gap-2"
                >
                  <Input 
                    placeholder="Ask anything..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-background border-muted-foreground/20 focus-visible:ring-orange-500 rounded-full"
                  />
                  <Button type="submit" size="icon" className="rounded-full bg-orange-500 hover:bg-orange-600 shrink-0 shadow-md">
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
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-xl transition-all duration-300",
          isOpen ? "bg-muted text-muted-foreground rotate-90" : "bg-orange-500 hover:bg-orange-600"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  )
}
