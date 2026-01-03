export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-vyx-border/50">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-vyx-muted">
            © {currentYear} Vyx Labs Inc.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="/privacy.html"
              className="text-vyx-muted hover:text-vyx-text transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms.html"
              className="text-vyx-muted hover:text-vyx-text transition-colors"
            >
              Terms
            </a>
            <a
              href="mailto:andrei@vyxlabs.com"
              className="text-vyx-muted hover:text-vyx-text transition-colors"
            >
              andrei@vyxlabs.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
