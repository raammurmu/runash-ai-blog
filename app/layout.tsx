import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RunAsh AI Blog - Innovation in Live Streaming & AI",
  description:
    "Discover the latest innovations in live streaming, AI platforms, e-commerce solutions, and cutting-edge technology.",
  keywords: "live streaming, AI, e-commerce, API, chat platform, grocery store, payments",
  authors: [{ name: "RunAsh AI Team" }],
  openGraph: {
    title: "RunAsh AI Blog",
    description: "Innovation in Live Streaming & AI Technology",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
