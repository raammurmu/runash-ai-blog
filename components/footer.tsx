import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RA</span>
              </div>
              <span className="font-bold text-xl">RunAsh AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover the latest innovations in live streaming, AI platforms, e-commerce solutions, and cutting-edge
              technology.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <div className="space-y-2 text-sm">
              <Link href="/category/streaming" className="block text-muted-foreground hover:text-foreground">
                Live Streaming
              </Link>
              <Link href="/category/ai" className="block text-muted-foreground hover:text-foreground">
                AI Platform
              </Link>
              <Link href="/category/shopping" className="block text-muted-foreground hover:text-foreground">
                Live Shopping
              </Link>
              <Link href="/category/api" className="block text-muted-foreground hover:text-foreground">
                API Platform
              </Link>
              <Link href="/category/payments" className="block text-muted-foreground hover:text-foreground">
                Payment Systems
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2 text-sm">
              <Link href="/docs" className="block text-muted-foreground hover:text-foreground">
                Documentation
              </Link>
              <Link href="/tutorials" className="block text-muted-foreground hover:text-foreground">
                Tutorials
              </Link>
              <Link href="/community" className="block text-muted-foreground hover:text-foreground">
                Community
              </Link>
              <Link href="/support" className="block text-muted-foreground hover:text-foreground">
                Support
              </Link>
              <Link href="/changelog" className="block text-muted-foreground hover:text-foreground">
                Changelog
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Get the latest posts and updates delivered to your inbox.</p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" type="email" />
              <Button className="w-full" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">© 2024 RunAsh AI. All rights reserved.</div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by the RunAsh AI team</span>
          </div>
          <div className="flex space-x-4 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
