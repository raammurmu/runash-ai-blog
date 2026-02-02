export const gradientLibrary = [
  "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400",
  "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
  "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-400",
  "bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500",
  "bg-gradient-to-br from-rose-500 via-orange-500 to-amber-400",
  "bg-gradient-to-br from-zinc-900 via-slate-900 to-neutral-800",
]

export function getGradientOptions() {
  return [...gradientLibrary]
}

export function getRandomGradient() {
  return gradientLibrary[Math.floor(Math.random() * gradientLibrary.length)]
}
