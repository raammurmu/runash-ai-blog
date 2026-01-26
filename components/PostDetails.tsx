import { ReadingProgress } from "@/components/reading-progress"

const PostDetail = ({ 
  post, 
  allPosts, 
  onBack, 
  onPostClick 
}: { 
  post: BlogPostType; 
  allPosts: BlogPostType[]; 
  onBack: () => void;
  onPostClick: (post: BlogPostType) => void;
}) => {
  // Reset scroll when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* The Bar */}
      <ReadingProgress />
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Navigation */}
        <Button variant="ghost" onClick={onBack} className="mb-8 group">
          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          Back to Blog
        </Button>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
             <div className="flex items-center gap-2">
               <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                 {post.author[0]}
               </div>
               <span>{post.author}</span>
             </div>
             <span>•</span>
             <span>{post.date}</span>
             <span>•</span>
             <span>{post.readTime}</span>
          </div>
        </header>

        {/* Featured Image */}
        <img 
          src={post.image} 
          className="w-full rounded-3xl mb-12 shadow-2xl shadow-orange-500/10" 
        />

        {/* Content Body */}
        <article className="prose prose-lg dark:prose-invert max-w-none prose-orange">
          <p className="lead text-xl text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
          {/* Main content placeholder */}
          <div className="mt-8 space-y-6 text-gray-800 dark:text-gray-200">
            <p>At RunAsh AI, we believe that the convergence of low-latency networking and machine learning is the next frontier for creators...</p>
            <h2 className="text-2xl font-bold mt-12 mb-4">The Technical Breakdown</h2>
            <p>By offloading heavy video encoding tasks to our distributed AI nodes, streamers can achieve 4K quality with 30% less bandwidth...</p>
          </div>
        </article>

        {/* Related Section */}
        <RelatedPosts 
          currentPost={post} 
          allPosts={allPosts} 
          onPostClick={onPostClick} 
        />
      </div>
    </div>
  );
};
