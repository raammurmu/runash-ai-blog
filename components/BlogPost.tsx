const BlogPost = ({
  post,
  onReadMore,
}: {
  post: BlogPostType
  onReadMore: (post: BlogPostType) => void
}) => {
  return (
    <Card className="overflow-hidden border-orange-200/50 dark:border-orange-900/30">
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReadMore(post)}
            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 p-0"
          >
            Read More <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
