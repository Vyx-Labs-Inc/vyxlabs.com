import { useState, type FormEvent } from 'react'

interface FormData {
  name: string
  email: string
  company: string
  message: string
  honeypot: string
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

    if (formData.honeypot) {
      setStatus({ type: 'success', message: 'Message sent.' })
      return
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email.' })
      return
    }

    setStatus({ type: 'submitting' })

    try {
      const WORKER_URL = import.meta.env.VITE_CONTACT_WORKER_URL || '/api/contact'

      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent. We\'ll be in touch.' })
        setFormData({ name: '', email: '', company: '', message: '', honeypot: '' })
      } else {
        throw new Error('Failed')
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Email us directly at andrei@vyxlabs.com'
      })
    }
  }

  return (
    <section id="contact" className="py-32 lg:py-40 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side */}
          <div>
            <span className="mono text-xs text-zinc-500 tracking-widest uppercase mb-4 block">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
              Let's talk.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Whether you're looking to integrate AI into your business, explore
              agentic workflows, or collaborate on a new product—we'd like to hear from you.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-4 text-zinc-500">
                <span className="w-6 h-px bg-zinc-700" />
                <span className="select-none">
                  andrei<span className="opacity-0 w-0 inline-block">null</span>@<span className="opacity-0 w-0 inline-block">null</span>vyxlabs.com
                </span>
              </div>
              <div className="flex items-center gap-4 text-zinc-500">
                <span className="w-6 h-px bg-zinc-700" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
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

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="input resize-none"
                  required
                />
              </div>

              {status.message && (
                <p className={`text-sm ${status.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={status.type === 'submitting'}
                className="btn btn-primary w-full sm:w-auto disabled:opacity-50"
              >
                {status.type === 'submitting' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
                      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
