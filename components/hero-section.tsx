"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Latest in AI & Live Streaming Innovation
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            RunAsh AI Blog
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover cutting-edge innovations in live streaming, AI platforms, e-commerce solutions, and the future of
            digital technology. Join our community of developers and creators.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild>
            <Link href="/category/ai">
              Explore AI Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/community">
              <Users className="mr-2 h-4 w-4" />
              Join Community
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-orange-500">500+</div>
            <div className="text-sm text-muted-foreground">Technical Articles</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-yellow-500">50K+</div>
            <div className="text-sm text-muted-foreground">Community Members</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-orange-500">100+</div>
            <div className="text-sm text-muted-foreground">Expert Contributors</div>
          </div>
        </div>
      </div>
    </section>
  )
}
