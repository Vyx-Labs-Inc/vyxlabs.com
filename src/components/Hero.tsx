export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fafafa 1px, transparent 1px),
            linear-gradient(to bottom, #fafafa 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-32">
        <div className="max-w-4xl">
          {/* Overline */}
          <div className="opacity-0 animate-fade-up mb-6">
            <span className="mono text-xs text-zinc-500 tracking-widest uppercase">
              Technology Studio
            </span>
          </div>

          {/* Main headline */}
          <h1 className="opacity-0 animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-8">
            We build
            <br />
            <span className="text-zinc-500">what's next.</span>
          </h1>

          {/* Subheadline */}
          <p className="opacity-0 animate-fade-up delay-200 text-lg sm:text-xl text-zinc-400 max-w-xl mb-12 leading-relaxed">
            A studio for software, systems, and infrastructure.
            First principles. Measured outcomes.
          </p>

          {/* CTAs */}
          <div className="opacity-0 animate-fade-up delay-300 flex flex-wrap gap-4">
            <a href="#work" className="btn btn-primary">
              View work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">
              Work with us
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-6 lg:left-8 opacity-0 animate-fade-in delay-500">
          <div className="flex items-center gap-3 text-zinc-500">
            <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
            <span className="mono text-xs tracking-wider">Scroll</span>
          </div>
        </div>

        {/* Status */}
        <div className="absolute bottom-12 right-6 lg:right-8 opacity-0 animate-fade-in delay-500">
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="mono text-xs">Available for projects</span>
          </div>
        </div>
      </div>
    </section>
  )
}
