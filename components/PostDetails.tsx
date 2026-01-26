"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Link2, 
  Check 
} from "lucide-react"
import { BlogPost } from "@/lib/types" // Ensure this matches your type definition

// --- Sub-Component: Reading Progress Bar ---
const ReadingProgress = () => {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }
    window.addEventListener("scroll", updateScrollCompletion)
    return () => window.removeEventListener("scroll", updateScrollCompletion)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-[60] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-150 ease-out"
        style={{ width: `${completion}%` }}
      />
    </div>
  )
}

// --- Sub-Component: Share Sidebar ---
const ShareSidebar = ({ title }: { title: string }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-row xl:flex-col gap-3 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-orange-200 dark:border-orange-900/30 rounded-full shadow-lg">
      <Button variant="ghost" size="icon" className="rounded-full hover:text-orange-600">
        <Twitter className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full hover:text-orange-600">
        <Linkedin className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full hover:text-orange-600">
        <Facebook className="h-5 w-5" />
      </Button>
      <div className="w-px h-6 xl:w-6 xl:h-px bg-orange-200 dark:bg-orange-800/50 self-center" />
      <Button variant="ghost" size="icon" className="rounded-full" onClick={copyToClipboard}>
        {copied ? <Check className="h-5 w-5 text-green-500" /> : <Link2 className="h-5 w-5" />}
      </Button>
    </div>
  )
}

// --- Main PostDetail Component ---
export default function PostDetail({ 
  post, 
  allPosts, 
  onBack, 
  onPostClick 
}: { 
  post: BlogPost; 
  allPosts: BlogPost[]; 
  onBack: () => void;
  onPostClick: (post: BlogPost) => void;
}) {
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post]);

  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.title !== post.title)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white pb-20">
      <ReadingProgress />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative pt-12">
          
          {/* Floating Sidebar (Desktop) */}
          <div className="hidden xl:block absolute -left-20 top-64 h-full">
            <div className="sticky top-32">
              <ShareSidebar title={post.title} />
              <p className="mt-4 text-[10px] font-bold text-center text-gray-400 uppercase tracking-widest rotate-180 [writing-mode:vertical-lr]">
                Share Story
              </p>
            </div>
          </div>

          {/* Navigation */}
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="mb-8 group text-gray-500 hover:text-orange-600 p-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Insights
          </Button>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-bold rounded-full">
                {post.category}
              </span>
              <span className="text-gray-400 text-sm">{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-[1.1] tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between py-6 border-y border-orange-100 dark:border-orange-900/20">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {post.author[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{post.author}</p>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </div>
              
              {/* Mobile Share Bar */}
              <div className="xl:hidden">
                <ShareSidebar title={post.title} />
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-video mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10">
            <img 
              src={post.image || "/placeholder.svg"} 
              alt={post.title}
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Article Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none prose-orange 
            prose-headings:font-bold prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300">
            <p className="text-2xl font-medium text-gray-900 dark:text-white mb-8">
              {post.excerpt}
            </p>
            <p>
              The digital landscape is shifting. As we integrate more AI-driven workflows into live streaming, 
              the focus moves from simple broadcasting to intelligent engagement. At RunAsh AI, our latest research 
              indicates that creators using automated enhancement see a 40% increase in viewer retention.
            </p>
            <h2>Understanding the Pipeline</h2>
            <p>
              To achieve real-time latency, we utilize a distributed network of inference nodes. This allows for 
              complex video upscaling and noise reduction without adding load to the creator's local hardware.
            </p>
            <blockquote>
              "The future of content isn't just about high definition; it's about high intelligence."
            </blockquote>
          </article>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-24 pt-12 border-t border-orange-100 dark:border-orange-900/20">
              <h3 className="text-2xl font-bold mb-8">Keep Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => (
                  <div 
                    key={related.title} 
                    className="group cursor-pointer"
                    onClick={() => onPostClick(related)}
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-gray-100 dark:bg-gray-900">
                      <img 
                        src={related.image} 
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <h4 className="font-bold text-lg group-hover:text-orange-500 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">{related.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
  }
