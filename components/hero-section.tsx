export function HeroSection() {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to RunAsh AI Blog</h1>
          <p className="text-lg opacity-90 mb-6">
            Discover the latest innovations in live streaming, AI platforms, e-commerce solutions, and cutting-edge
            technology. Join our community of developers, researchers, and innovators.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Live Streaming</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">AI Research</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">E-commerce</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">API Development</span>
          </div>
        </div>
      </div>
    </div>
  )
}
