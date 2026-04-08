export const BLOG_UI_LAYOUT = {
  pageContainer: "container mx-auto max-w-5xl px-6 py-8",
  shellFrame: "mx-auto w-full max-w-[1420px] px-4 sm:px-5 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8 lg:px-6 xl:grid-cols-[320px_minmax(0,1fr)]",
  shellHeaderInner: "mx-auto flex w-full max-w-[1420px] items-center justify-between px-3 py-2.5 sm:px-5 lg:px-7",
  shellMainPadding: "min-w-0 w-full py-5 sm:py-6 lg:py-8",
  shellContentWidth: "mx-auto w-full max-w-[920px] lg:max-w-[980px]",
} as const

export const BLOG_UI_SURFACES = {
  mutedCanvas: "bg-muted/30",
  emphasisButton: "bg-foreground text-background hover:bg-foreground/90",
} as const
