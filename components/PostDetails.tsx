const PostDetail = ({ post, onBack }: { post: BlogPostType; onBack: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Button variant="ghost" onClick={onBack} className="mb-8 group">
        <ArrowRight className="mr-2 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Button>
      
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full aspect-video object-cover rounded-2xl mb-8 shadow-xl" 
      />
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">{post.category}</span>
        <div className="flex items-center gap-1"><User className="h-4 w-4"/> {post.author}</div>
        <div className="flex items-center gap-1"><Calendar className="h-4 w-4"/> {post.date}</div>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        {post.title}
      </h1>
      
      <div className="prose prose-orange dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {post.excerpt}
        </p>
        <div className="h-px bg-gray-200 dark:bg-gray-800 my-8" />
        <p>
          {/* In a real app, this would be rich text or MDX content */}
          This is where the main body of the article would go. Since we are using AI to power
          real-time video processing, the architecture involves low-latency edge computing...
        </p>
      </div>
    </div>
  )
}
