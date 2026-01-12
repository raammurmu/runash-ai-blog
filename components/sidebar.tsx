"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Drawer } from "vaul" // Install via: npm install vaul
import { Sun, Moon, Monitor, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const menuGroups = [
  {
    label: "Basics",
    items: [
      { name: "Getting Started", href: "/" },
      { name: "API", href: "/api" },
    ],
  },
  {
    label: "Examples",
    items: [
      { name: "Default", href: "/default" },
      { name: "Snap Points", href: "/snap-points" },
      { name: "Inputs", href: "/inputs" },
    ],
  },
]

export function VaulMenu() {
  const pathname = usePathname()

  return (
    <Drawer.Root shouldScaleBackground>
      {/* Trigger - Usually a Hamburger or "Menu" button */}
      <Drawer.Trigger asChild>
        <button className="fixed top-4 left-4 p-2 rounded-md hover:bg-muted border shadow-sm bg-white z-50">
          <Menu className="h-5 w-5" />
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none">
          
          {/* Draggable Handle */}
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 my-4" />

          <div className="flex-1 overflow-y-auto p-4 max-w-md mx-auto w-full">
            <div className="mb-8">
              <Drawer.Title className="font-medium text-xl mb-2">Vaul</Drawer.Title>
            </div>

            <div className="space-y-6">
              {menuGroups.map((group) => (
                <div key={group.label} className="space-y-1">
                  <h3 className="px-3 text-[13px] text-zinc-400 mb-2">{group.label}</h3>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 text-[15px] rounded-lg transition-colors",
                        pathname === item.href ? "bg-zinc-100 text-black font-medium" : "text-zinc-600"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {/* The Signature Info Card */}
            <div className="mt-8 border border-zinc-100 bg-zinc-50/50 p-4 rounded-2xl">
              <h4 className="text-[14px] font-medium mb-1">Animations on the Web</h4>
              <p className="text-[13px] text-zinc-500 leading-relaxed">
                Learn how to build components like this one using Framer Motion and Radix.
              </p>
            </div>
          </div>

          {/* Footer Theme Switcher */}
          <div className="p-6 border-t border-zinc-100 mt-auto flex justify-center">
            <div className="flex bg-zinc-100 p-1 rounded-full border border-zinc-200">
              <button className="p-2 rounded-full bg-white shadow-sm"><Sun className="h-4 w-4" /></button>
              <button className="p-2 rounded-full text-zinc-500"><Moon className="h-4 w-4" /></button>
              <button className="p-2 rounded-full text-zinc-500"><Monitor className="h-4 w-4" /></button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
      }
