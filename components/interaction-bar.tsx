"use client"

import { ArticleInteractions } from "@/components/article-interactions"

/**
 * @deprecated Use ArticleInteractions directly to avoid UI drift.
 */
export const InteractionBar = () => {
  return <ArticleInteractions initialReadTime="0" />
}
