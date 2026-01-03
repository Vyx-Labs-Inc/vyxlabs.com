export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-vyx-darker via-transparent to-vyx-darker pointer-events-none" />

      {/* Subtle accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-vyx-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative section-container py-24 lg:py-32">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo */}
          <div className="mb-12">
            <img
              src="/vyx-minimalist-icon.png"
              alt="Vyx Labs"
              className="h-16 w-auto opacity-90"
            />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight text-balance mb-6">
            Vyx Labs builds software and systems that transform inputs into reliable outputs across complex domains.
          </h1>

          {/* Supporting line */}
          <p className="text-lg sm:text-xl text-vyx-muted max-w-2xl mb-12 text-balance">
            Working in high-dimensional spaces where structure, measurement, and direction matter.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="btn-primary">
              Contact
            </a>
            <a href="#projects" className="btn-secondary">
              Projects
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-vyx-border to-transparent" />
      </div>
    </section>
  )
}
