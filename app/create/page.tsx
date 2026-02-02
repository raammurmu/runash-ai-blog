"use client"

import { useMemo, useRef, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Eye, Edit, Loader2 } from "lucide-react"
import { blogPosts, authors, getAllCategories } from "@/lib/blog-data"
 
import { getCoverDataUrl } from "@/lib/cover-generator"
import { getGradientOptions } from "@/lib/gradients"


import { toast } from "sonner"

export default function CreatePostPage() {
  const categories = useMemo(() => getAllCategories().map((category) => category.name), [])
 
  const gradients = useMemo(() => getGradientOptions(), [])

  const gradients = useMemo(
    () => Array.from(new Set(blogPosts.map((post) => post.gradient))).filter(Boolean),
    [],
  )

  const currentAuthor = authors[0]
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [selectedGradient, setSelectedGradient] = useState(gradients[0] ?? "bg-gradient-to-r from-orange-400 to-yellow-400")
  const [emoji, setEmoji] = useState("🚀")
  const [isPreview, setIsPreview] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
 
  const [status, setStatus] = useState<"published" | "draft">("published")



  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Upload failed")
      }
      const data = await response.json()
      setCoverImage(data.url)
      toast.success("Image uploaded")
    } catch (error) {
      toast.error("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

 
  const handleSubmit = async (nextStatus: "published" | "draft") => {

  const handleSubmit = async () => {

    if (!currentAuthor) {
      toast.error("No author profile available.")
      return
    }
    if (!title || !excerpt || !content || !category) {
      toast.error("Please fill in title, excerpt, content, and category.")
      return
    }
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          category,
          gradient: selectedGradient,
          emoji,
          tags,
 
          image: coverImage ?? getCoverDataUrl(title, category),
          status: nextStatus,

          image: coverImage,

          author: currentAuthor,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create post")
      }

      const created = await response.json()
 
      toast.success(nextStatus === "draft" ? "Draft saved" : "Post created")

      toast.success("Post created")

      setTitle("")
      setExcerpt("")
      setContent("")
      setCategory("")
      setTags([])
      setCoverImage(null)
      setEmoji("🚀")
      setSelectedGradient(gradients[0] ?? "bg-gradient-to-r from-orange-400 to-yellow-400")
      setIsPreview(false)
 
      if (nextStatus === "published") {
        window.location.href = `/post/${created.slug}`
      }

      window.location.href = `/post/${created.slug}`

    } catch (error) {
      toast.error("Unable to publish post right now.")
    } finally {
      setIsSubmitting(false)
    }
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

                      <div className="flex flex-col gap-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0]
                            if (file) {
                              handleUpload(file)
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          className="bg-transparent justify-start"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ImageIcon className="h-4 w-4 mr-2" />}
                          {coverImage ? "Replace cover image" : "Upload cover image"}
                        </Button>
 
                      {coverImage && (
                        <div className="overflow-hidden rounded-xl border">
                          <img src={coverImage} alt="Cover preview" className="h-40 w-full object-cover" />
                        </div>
                      )}
                      {!coverImage && title && category && (
                        <div className="overflow-hidden rounded-xl border">
                          <img src={getCoverDataUrl(title, category)} alt="Generated cover" className="h-40 w-full object-cover" />
                        </div>
                      )}

                        {coverImage && (
                          <div className="overflow-hidden rounded-xl border">
                            <img src={coverImage} alt="Cover preview" className="h-40 w-full object-cover" />
                          </div>
                        )}
 
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
                          <Badge variant="outline" className="mb-2 ml-2">
                            {status === "draft" ? "Draft" : "Published"}
                          </Badge>
                          <h3 className="font-semibold text-lg mb-2">{title || "Your Post Title"}</h3>
                          <p className="text-sm text-muted-foreground">
                            {excerpt || "Your post excerpt will appear here..."}
                          </p>
                        </div>
                      </div>
 
                      {(coverImage || (title && category)) && (
                        <div className="overflow-hidden rounded-xl border">
                          <img
                            src={coverImage ?? getCoverDataUrl(title, category)}
                            alt="Cover preview"
                            className="h-48 w-full object-cover"
                          />

                      {coverImage && (
                        <div className="overflow-hidden rounded-xl border">
                          <img src={coverImage} alt="Cover preview" className="h-48 w-full object-cover" />

                        </div>
                      )}

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
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <Select value={status} onValueChange={(value) => setStatus(value as "published" | "draft")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tags</label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddTag()
                          }
                        }}
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
 
                <Button onClick={() => handleSubmit(status)} className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : status === "draft" ? "Save Draft" : "Publish Post"}

                <Button onClick={handleSubmit} className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish Post"}

                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsPreview(true)}>
                  Preview Draft
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
