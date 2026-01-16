"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Calendar, Clock, Search, User, Loader2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sub-component for individual blog cards
const BlogCard = ({
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  image,
  featured = false,
}: any) => {
  return (
    <Card className="group overflow-hidden border-orange-200/50 dark:border-orange-900/30 hover:shadow-xl transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider rounded">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 text-[12px] text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-orange-500" />
            {date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-orange-500" />
            {readTime}
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {excerpt}
        </p>
        <Button
          variant="link"
          className="p-0 h-auto text-orange-600 dark:text-orange-400 font-semibold hover:no-underline group/btn"
        >
          Read More 
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default function BlogPage() {
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [isLoading, setIsLoading] = useState(false)

  // Mock function for loading more posts
  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisiblePosts((prev) => prev + 3)
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-orange-500/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[50%] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
              <span className="text-xl font-black tracking-tighter italic">RUNASH AI</span>
            </div>
            <ThemeToggle />
          </div>

          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight italic uppercase italic">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">Pulse</span> of AI
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Your daily dose of AI research, product updates, and streaming tutorials.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search for articles..." 
                className="pl-12 h-14 rounded-full border-orange-200 dark:border-orange-900/50 bg-white/80 dark:bg-gray-900/80 shadow-lg focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section with Orange/Blue Gradient Image */}
      <section className="container mx-auto max-w-6xl px-4 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 group">
          {/* Abstract Image Layer */}
          <div className="absolute inset-0 opacity-60">
             <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 via-blue-900/40 to-black" />
             <img 
               src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000" // Abstract Blue/Orange 
               className="w-full h-full object-cover"
               alt="Abstract AI"
             />
          </div>
          
          <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end min-h-[500px] text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase">Featured</span>
              <span className="text-sm font-medium">June 06, 2025</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
              The Science Behind Real-Time <br/><span className="text-orange-400">Video Processing</span>
            </h2>
            <p className="text-gray-200 text-lg mb-8 max-w-2xl">
              Discover how RunAsh uses neural networks to upscale live video in under 12ms of latency.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
               <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 h-12 rounded-full font-bold transition-all transform hover:scale-105">
                 Read Full Article <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
               <div className="flex items-center gap-3 pl-4">
                  <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-orange-500 overflow-hidden">
                    <img src="https://github.com/shadcn.png" alt="author" />
                  </div>
                  <span className="font-medium">Vaibhav Murmu</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="container mx-auto max-w-6xl px-4 pb-24">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-8 overflow-x-auto">
            <TabsList className="bg-transparent gap-2">
              {["all", "tutorials", "product", "research"].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="capitalize rounded-full px-6 data-[state=active]:bg-orange-600 data-[state=active]:text-white border border-gray-200 dark:border-gray-800"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Mapping mock data - limited by visiblePosts state */}
              {[...Array(9)].slice(0, visiblePosts).map((_, i) => (
                <BlogCard
                  key={i}
                  title={i % 2 === 0 ? "Getting Started with AI Enhancement" : "Multi-Platform Streaming Tips"}
                  excerpt="How to leverage AI tools to create consistent branding and grow your streaming audience."
                  author="Ram Murmu"
                  date="Jun 06, 2025"
                  readTime="5 min read"
                  category={i % 2 === 0 ? "Tutorial" : "Strategy"}
                  image={`https://picsum.photos/seed/${i+40}/800/450`}
                />
              ))}
            </div>

            {/* Load More Button */}
            {visiblePosts < 9 && (
              <div className="flex justify-center mt-12">
                <Button 
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  variant="outline"
                  className="px-10 h-14 rounded-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold dark:hover:bg-orange-950"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More Articles"
                  )}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer (Simplified) */}
      <footer className="border-t border-gray-200 dark:border-gray-900 py-12 px-4 text-center">
        <p className="text-sm text-gray-500">© 2026 RunAsh AI • Powered by Innovation</p>
      </footer>
    </div>
  )
        }
