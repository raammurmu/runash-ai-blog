"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Calendar, Clock, Search, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const BlogPost = ({
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  image,
  featured = false,
}: {
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  featured?: boolean
}) => {
  return (
    <Card
      className={`overflow-hidden ${featured ? "border-orange-500/50 bg-orange-50/50 dark:bg-orange-950/20" : "border-orange-200/50 dark:border-orange-900/30"}`}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            {category}
          </span>
          {featured && (
            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
              Featured
            </span>
          )}
        </div>
        <h3 className="mb-3 line-clamp-2 text-xl font-bold">{title}</h3>
        <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-400">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
          >
            Read More <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/30 to-white dark:from-gray-950 dark:via-orange-950/30 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 dark:opacity-10" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mb-4 flex justify-end">
            <ThemeToggle />
          </div>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-6 py-2 backdrop-blur-sm">
              <span className="text-orange-600 dark:text-orange-400">RunAsh Blog</span>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-4xl font-bold text-transparent dark:from-orange-400 dark:via-orange-300 dark:to-yellow-300 md:text-6xl">
              Insights & Updates
            </h1>
            <p className="mb-8 text-xl text-gray-700 dark:text-gray-300">
              Stay up to date with the latest news, tutorials, and insights from the RunAsh AI team.
            </p>

            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-orange-200 bg-white/50 pl-10 focus:border-orange-500/70 dark:border-orange-800/30 dark:bg-gray-900/50"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="bg-orange-100/50 dark:bg-orange-900/20">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                <TabsTrigger value="product">Product Updates</TabsTrigger>
                <TabsTrigger value="ai">AI Research</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-8">
                <div className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Featured Article</h2>
                  <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                    <div className="aspect-video overflow-hidden rounded-xl">
                      <img
                        src="/placeholder.svg?height=400&width=600"
                        alt="Featured article"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                          AI Research
                        </span>
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Featured
                        </span>
                      </div>
                      <h3 className="mb-4 text-3xl font-bold">The Future of AI-Powered Live Streaming</h3>
                      <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
                        Explore how artificial intelligence is revolutionizing the live streaming industry and what it
                        means for content creators worldwide.
                      </p>
                      <div className="mb-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>Ram Murmu</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Jun 06 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>8 min read</span>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700 dark:from-orange-500 dark:to-yellow-500 dark:hover:from-orange-600 dark:hover:to-yellow-600">
                        Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Recent Posts</h2>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <BlogPost
                      title="Getting Started with AI Video Enhancement"
                      excerpt="Learn how to use RunAsh's AI video enhancement features to improve your stream quality automatically."
                      author="Ram Murmu"
                      date="Jun 06, 2025"
                      readTime="5 min read"
                      category="Tutorial"
                      image="/placeholder.svg?height=300&width=400"
                    />
                    <BlogPost
                      title="Multi-Platform Streaming Best Practices"
                      excerpt="Discover the best strategies for streaming to multiple platforms simultaneously while maintaining quality."
                      author="Ram Murmu"
                      date="Jun 06, 2025"
                      readTime="7 min read"
                      category="Tips"
                      image="/placeholder.svg?height=300&width=400"
                    />
                    <BlogPost
                      title="RunAsh 2.1 Release Notes"
                      excerpt="Explore the latest features and improvements in RunAsh AI 2.1, including enhanced chat moderation and new analytics."
                      author="Product Team"
                      date="Jun 04, 2025"
                      readTime="4 min read"
                      category="Product Updates"
                      image="/placeholder.svg?height=300&width=400"
                    />
                    <BlogPost
                      title="Building Your Streaming Brand with AI"
                      excerpt="How to leverage AI tools to create consistent branding and grow your streaming audience."
                      author="Community Team"
                      date="May  06, 2025"
                      readTime="6 min read"
                      category="Community"
                      image="/placeholder.svg?height=300&width=400"
                    />
                    <BlogPost
                      title="The Science Behind Real-Time Video Processing"
                      excerpt="A deep dive into the technical challenges and solutions for processing video streams in real-time."
                      author="Ram Murmu"
                      date="Feb 01, 2025"
                      readTime="10 min read"
                      category="AI Research"
                      image="/placeholder.svg?height=300&width=400"
                    />
                    <BlogPost
                      title="Community Spotlight: Top Streamers Using RunAsh"
                      excerpt="Meet some of the amazing content creators who are using RunAsh AI to elevate their streaming experience."
                      author="Community Team"
                      date="Jun 06, 2025"
                      readTime="8 min read"
                      category="Community"
                      image="/placeholder.svg?height=300&width=400"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tutorials" className="mt-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <BlogPost
                    title="Getting Started with AI Video Enhancement"
                    excerpt="Learn how to use RunAsh's AI video enhancement features to improve your stream quality automatically."
                    author="Vaibhav Murmu"
                    date="Jun 06, 2025"
                    readTime="5 min read"
                    category="Tutorial"
                    image="/placeholder.svg?height=300&width=400"
                  />
                  <BlogPost
                    title="Setting Up Multi-Platform Streaming"
                    excerpt="Step-by-step guide to configure streaming to multiple platforms simultaneously."
                    author="Tech Team"
                    date="Jun 06, 2025"
                    readTime="12 min read"
                    category="Tutorial"
                    image="/placeholder.svg?height=300&width=400"
                  />
                </div>
              </TabsContent>

              <TabsContent value="product" className="mt-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <BlogPost
                    title="RunAsh 2.1 Release Notes"
                    excerpt="Explore the latest features and improvements in RunAsh AI 2.1, including enhanced chat moderation and new analytics."
                    author="Product Team"
                    date="Jun 04, 2025"
                    readTime="4 min read"
                    category="Product Updates"
                    image="/placeholder.svg?height=300&width=400"
                  />
                </div>
              </TabsContent>

              <TabsContent value="ai" className="mt-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <BlogPost
                    title="The Future of AI-Powered Live Streaming"
                    excerpt="Explore how artificial intelligence is revolutionizing the live streaming industry."
                    author="Vaibhav Murmu"
                    date="Jun 06, 2025"
                    readTime="8 min read"
                    category="AI Research"
                    image="/placeholder.svg?height=300&width=400"
                    featured={true}
                  />
                  <BlogPost
                    title="The Science Behind Real-Time Video Processing"
                    excerpt="A deep dive into the technical challenges and solutions for processing video streams in real-time."
                    author="Vaibhav Murmu"
                    date="Jun 06, 2025"
                    readTime="10 min read"
                    category="AI Research"
                    image="/placeholder.svg?height=300&width=400"
                  />
                </div>
              </TabsContent>

              <TabsContent value="community" className="mt-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <BlogPost
                    title="Building Your Streaming Brand with AI"
                    excerpt="How to leverage AI tools to create consistent branding and grow your streaming audience."
                    author="Community Team"
                    date="Jun 06, 2025"
                    readTime="6 min read"
                    category="Community"
                    image="/placeholder.svg?height=300&width=400"
                  />
                  <BlogPost
                    title="Community Spotlight: Top Streamers Using RunAsh"
                    excerpt="Meet some of the amazing content creators who are using RunAsh AI to elevate their streaming experience."
                    author="Community Team"
                    date="Jun 06, 2025"
                    readTime="8 min read"
                    category="Community"
                    image="/placeholder.svg?height=300&width=400"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-16 rounded-xl border border-orange-200 bg-gradient-to-br from-orange-100 to-yellow-100 p-8 dark:border-orange-800/30 dark:from-orange-900/30 dark:to-yellow-900/30">
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-2xl font-bold text-orange-800 dark:text-orange-300">Stay Updated</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Subscribe to our newsletter for the latest updates, tutorials, and insights.
                </p>
              </div>
              <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <Input
                  placeholder="Enter your email"
                  className="border-orange-200 bg-white dark:border-orange-800/30 dark:bg-gray-900"
                />
                <Button className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700 dark:from-orange-500 dark:to-yellow-500 dark:hover:from-orange-600 dark:hover:to-yellow-600">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-orange-200/50 bg-white py-12 dark:border-orange-900/30 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500">
            <p>© {new Date().getFullYear()} RunAsh AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
