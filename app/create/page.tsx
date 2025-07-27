"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Video, Eye, Edit } from "lucide-react"

const categories = [
  "Live Streaming",
  "Live Shopping",
  "API Platform",
  "Documentation",
  "Payment Systems",
  "Chat Platform",
  "Grocery Store",
  "AI Platform",
  "AI Research",
]

const gradients = [
  "bg-gradient-to-r from-orange-400 to-yellow-400",
  "bg-gradient-to-r from-blue-400 to-purple-400",
  "bg-gradient-to-r from-green-400 to-blue-400",
  "bg-gradient-to-r from-pink-400 to-red-400",
  "bg-gradient-to-r from-purple-400 to-pink-400",
]

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [selectedGradient, setSelectedGradient] = useState(gradients[0])
  const [emoji, setEmoji] = useState("🚀")
  const [isPreview, setIsPreview] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = () => {
    // Handle post creation
    console.log({
      title,
      excerpt,
      content,
      category,
      gradient: selectedGradient,
      emoji,
      tags,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
            <p className="text-muted-foreground">Share your insights with the RunAsh AI community</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
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
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isPreview ? (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Title</label>
                        <Input
                          placeholder="Enter your post title..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Excerpt</label>
                        <Textarea
                          placeholder="Brief description of your post..."
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Content</label>
                        <Textarea
                          placeholder="Write your post content here..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={15}
                          className="font-mono"
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Video className="h-4 w-4 mr-2" />
                          Upload Video
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6">
                      {/* Preview Card */}
                      <div className="border rounded-lg overflow-hidden">
                        <div className={`h-32 ${selectedGradient} flex items-center justify-center`}>
                          <div className="text-4xl">{emoji}</div>
                        </div>
                        <div className="p-4">
                          <Badge variant="secondary" className="mb-2">
                            {category || "Category"}
                          </Badge>
                          <h3 className="font-semibold text-lg mb-2">{title || "Your Post Title"}</h3>
                          <p className="text-sm text-muted-foreground">
                            {excerpt || "Your post excerpt will appear here..."}
                          </p>
                        </div>
                      </div>

                      {/* Content Preview */}
                      <div className="prose dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap">{content || "Your content will appear here..."}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Emoji</label>
                    <Input
                      placeholder="🚀"
                      value={emoji}
                      onChange={(e) => setEmoji(e.target.value)}
                      className="text-center text-2xl"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Gradient</label>
                    <div className="grid grid-cols-2 gap-2">
                      {gradients.map((gradient, index) => (
                        <button
                          key={index}
                          className={`h-12 rounded-md ${gradient} ${
                            selectedGradient === gradient ? "ring-2 ring-offset-2 ring-orange-500" : ""
                          }`}
                          onClick={() => setSelectedGradient(gradient)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tags</label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                      />
                      <Button onClick={handleAddTag} size="sm">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Button onClick={handleSubmit} className="w-full" size="lg">
                  Publish Post
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Save Draft
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
