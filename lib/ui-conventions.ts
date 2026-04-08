export const BLOG_UI_LAYOUT = {
  pageContainer: "container mx-auto max-w-5xl px-6 py-8",
  shellFrame: "mx-auto flex w-full max-w-[1560px]",
  shellHeaderInner: "mx-auto flex w-full max-w-[1420px] items-center justify-between px-3 py-2.5 sm:px-5 lg:px-7",
  shellMainPadding: "min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8 xl:px-10",
  shellContentWidth: "mx-auto w-full max-w-[900px] xl:max-w-[980px]",
} as const

export const BLOG_UI_SURFACES = {
  mutedCanvas: "bg-muted/30",
  emphasisButton: "bg-foreground text-background hover:bg-foreground/90",
} as const
