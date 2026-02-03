"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function BlogCardSkeleton({ viewMode = "grid" }: { viewMode?: "grid" | "list" }) {
  return (
    <Card className={cn(
      "overflow-hidden border-orange-100/50 animate-pulse",
      viewMode === "list" ? "flex flex-col md:flex-row h-auto md:h-48" : "flex flex-col h-full"
    )}>
      {/* Thumbnail Placeholder */}
      <div className={cn(
        "bg-orange-100/50 dark:bg-orange-950/20",
        viewMode === "list" ? "w-full md:w-56 h-48 md:h-full" : "h-52 w-full"
      )} />

      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="flex justify-between items-start">
          {/* Badge Placeholder */}
          <div className="h-6 w-20 bg-muted rounded-full" />
          {/* Share Icon Placeholder */}
          <div className="h-8 w-8 bg-muted rounded-full" />
        </div>

        <div className="space-y-2">
          {/* Title Placeholder */}
          <div className="h-5 w-full bg-muted rounded-md" />
          <div className="h-5 w-2/3 bg-muted rounded-md" />
        </div>

        {/* Excerpt Placeholder */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-muted/60 rounded-md" />
          <div className="h-3 w-full bg-muted/60 rounded-md" />
        </div>
        
        <CardFooter className="px-0 pt-4 mt-auto border-t border-orange-50 dark:border-orange-900/20 flex items-center justify-between">
          <div className="h-4 w-24 bg-muted rounded-md" />
          <div className="h-8 w-20 bg-muted rounded-full" />
        </CardFooter>
      </div>
    </Card>
  )
}
