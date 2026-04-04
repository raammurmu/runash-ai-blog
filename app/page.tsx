import { BlogPageClient } from "@/components/blog-page-client"
import { blogPosts } from "@/lib/blog-data"

export default function HomePage() {
  // Mobile layout inferred from existing design-system patterns because only desktop screenshot was provided.
  return <BlogPageClient posts={blogPosts} />
}
