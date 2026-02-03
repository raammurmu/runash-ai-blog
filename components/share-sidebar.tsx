"use client"
import { useState } from "react"
import { Link2, Twitter, Linkedin, Facebook, Check } from "lucide-react"

export const ShareSidebar = ({ title }: { title: string }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = [
    { icon: <Twitter className="h-5 w-5" />, label: "Twitter", href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "#" },
    { icon: <Facebook className="h-5 w-5" />, label: "Facebook", href: "#" },
  ]

  return (
    <div className="flex flex-col lg:fixed lg:left-8 lg:top-1/2 lg:-translate-y-1/2 gap-4 z-40">
      <div className="flex lg:flex-col gap-3 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-orange-200 dark:border-orange-900/30 rounded-full lg:rounded-2xl shadow-xl shadow-orange-500/5">
        {shareLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className="p-3 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
            title={`Share on ${link.label}`}
          >
            {link.icon}
          </a>
        ))}
        <div className="w-px lg:w-8 lg:h-px bg-orange-200 dark:bg-orange-800/30 self-center" />
        <button
          onClick={copyToClipboard}
          className="p-3 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
        >
          {copied ? <Check className="h-5 w-5 text-green-500" /> : <Link2 className="h-5 w-5" />}
        </button>
      </div>
      <span className="hidden lg:block text-[10px] font-bold text-center text-gray-400 uppercase tracking-widest">
        Share
      </span>
    </div>
  )
}
