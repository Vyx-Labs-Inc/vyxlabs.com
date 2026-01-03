import { useState, useEffect } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a]' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 relative">
              <img
                src="/vyx-minimalist-icon.png"
                alt="Vyx"
                className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight">Vyx Labs</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#work"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Work
            </a>
            <a
              href="#contact"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="btn btn-secondary text-xs px-4 py-2"
          >
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  )
}
