import { useState, type FormEvent } from 'react'

interface FormData {
  name: string
  email: string
  company: string
  message: string
  honeypot: string // spam mitigation
}

interface FormStatus {
  type: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '',
  })

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot) {
      setStatus({ type: 'success', message: 'Thank you for your message.' })
      return
    }

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    setStatus({ type: 'submitting' })

    try {
      // Replace with your Cloudflare Worker URL after deployment
      const WORKER_URL = import.meta.env.VITE_CONTACT_WORKER_URL || '/api/contact'

      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you for your message. We\'ll be in touch.' })
        setFormData({ name: '', email: '', company: '', message: '', honeypot: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please email us directly at andrei@vyxlabs.com'
      })
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 border-t border-vyx-border/50 scroll-mt-16">
      <div className="section-container">
        <h2 className="section-heading">Contact</h2>

        <div className="max-w-xl">
          <p className="text-vyx-muted mb-8">
            If you're working on something where rigorous systems thinking might help,
            or if you'd like to explore collaboration, reach out.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot field - hidden from users, visible to bots */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              className="absolute opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-vyx-text mb-2">
                Name <span className="text-vyx-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-vyx-text mb-2">
                Email <span className="text-vyx-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-vyx-text mb-2">
                Company <span className="text-vyx-muted">(optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="input-field"
                placeholder="Your company"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-vyx-text mb-2">
                Message <span className="text-vyx-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="input-field resize-none"
                placeholder="What are you working on?"
                required
              />
            </div>

            {status.message && (
              <div className={`text-sm ${status.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={status.type === 'submitting'}
              className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.type === 'submitting' ? 'Sending...' : 'Send message'}
            </button>
          </form>

          <p className="mt-6 text-sm text-vyx-muted">
            Or email directly:{' '}
            <a
              href="mailto:andrei@vyxlabs.com"
              className="text-vyx-accent hover:text-vyx-accent/80 transition-colors"
            >
              andrei@vyxlabs.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
