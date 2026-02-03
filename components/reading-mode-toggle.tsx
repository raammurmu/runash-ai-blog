"use client"
import { useState, useEffect } from "react"
import { Maximize2, Minimize2, Type } from "lucide-react"

export const ReadingModeToggle = ({ isFocus, onToggle }: { isFocus: boolean, onToggle: () => void }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
        isFocus 
        ? "bg-orange-600 border-orange-600 text-white shadow-lg" 
        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-orange-500"
      }`}
    >
      {isFocus ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      <span className="text-xs font-bold uppercase tracking-widest">
        {isFocus ? "Exit Focus" : "Focus Mode"}
      </span>
    </button>
  )
}
