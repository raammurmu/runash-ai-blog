"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, MoreHorizontal, Edit, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  createdAt: string
  likes: number
  replies: Comment[]
  isEdited?: boolean
}

interface PostCommentsProps {
  postId: string
}

export function PostComments({ postId }: PostCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [editingComment, setEditingComment] = useState<string | null>(null)

  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "alexchen",
      },
      content:
        "Great insights on live streaming technology! The real-time processing capabilities you mentioned are game-changing.",
      createdAt: "2 hours ago",
      likes: 12,
      replies: [
        {
          id: "1-1",
          author: {
            name: "Sarah Kim",
            avatar: "/placeholder.svg?height=40&width=40",
            username: "sarahkim",
          },
          content: "Absolutely agree! The latency improvements are incredible.",
          createdAt: "1 hour ago",
          likes: 5,
          replies: [],
        },
      ],
    },
    {
      id: "2",
      author: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "mikej",
      },
      content: "Would love to see more technical details about the implementation. Any chance of a follow-up post?",
      createdAt: "4 hours ago",
      likes: 8,
      replies: [],
      isEdited: true,
    },
  ])

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "currentuser",
      },
      content: newComment,
      createdAt: "just now",
      likes: 0,
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
    setIsPreview(false)
  }

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <Card className={`${isReply ? "ml-12" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">@{comment.author.username}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
              {comment.isEdited && (
                <Badge variant="outline" className="text-xs">
                  edited
                </Badge>
              )}
            </div>

            <p className="text-sm">{comment.content}</p>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                <Heart className="h-3 w-3 mr-1" />
                {comment.likes}
              </Button>

              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                <MessageCircle className="h-3 w-3 mr-1" />
                Reply
              </Button>

              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>

              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6 mt-12">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

      {/* Comment Form */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant={!isPreview ? "default" : "outline"} size="sm" onClick={() => setIsPreview(false)}>
                <Edit className="h-4 w-4 mr-2" />
                Write
              </Button>
              <Button variant={isPreview ? "default" : "outline"} size="sm" onClick={() => setIsPreview(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>

            {!isPreview ? (
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <div className="min-h-[100px] p-3 border rounded-md bg-muted/50">
                {newComment || <span className="text-muted-foreground">Nothing to preview</span>}
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                Post Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <CommentItem comment={comment} />
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
