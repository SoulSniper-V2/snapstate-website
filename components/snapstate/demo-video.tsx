export function DemoVideo() {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-16 sm:py-24 z-10">
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
          See it in action
        </h2>
        <p className="text-white/50 text-lg md:text-xl max-w-2xl">
          Instantly capture your layout and restore it anywhere, anytime.
        </p>
      </div>

      <div className="relative rounded-2xl md:rounded-[32px] overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_100px_rgba(91,140,255,0.1)] backdrop-blur-xl p-2 md:p-4">
        {/* Subtle inner glow for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20 pointer-events-none" />
        
        <div className="relative rounded-xl md:rounded-[24px] overflow-hidden bg-black border border-white/10 shadow-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover opacity-90"
          >
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}
