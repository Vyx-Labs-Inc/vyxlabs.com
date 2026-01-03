export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left */}
          <div className="flex items-center gap-3">
            <img
              src="/vyx-minimalist-icon.png"
              alt="Vyx"
              className="w-6 h-6 opacity-60"
            />
            <span className="text-sm text-zinc-500">
              © {currentYear} Vyx Labs Inc.
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-8 text-sm">
            <a
              href="/privacy.html"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms.html"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#contact"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
