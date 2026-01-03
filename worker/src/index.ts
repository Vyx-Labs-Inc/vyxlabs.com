/**
 * Cloudflare Worker for Vyx Labs Contact Form
 *
 * This worker receives contact form submissions and sends emails via Resend.
 * Resend is used because it has excellent deliverability with Google Workspace
 * and a generous free tier (100 emails/day, 3000/month).
 *
 * Required secrets (set via `wrangler secret put`):
 * - RESEND_API_KEY: Your Resend API key
 * - ALLOWED_ORIGIN: The allowed origin (e.g., https://vyxlabs.com)
 */

interface Env {
  RESEND_API_KEY: string
  ALLOWED_ORIGIN: string
  TO_EMAIL: string
  FROM_EMAIL: string
}

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

// CORS headers
function corsHeaders(origin: string, allowedOrigin: string): HeadersInit {
  const isAllowed = origin === allowedOrigin || allowedOrigin === '*'
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitize input to prevent injection
function sanitize(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || ''
    const headers = corsHeaders(origin, env.ALLOWED_ORIGIN || '*')

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }

    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...headers, 'Content-Type': 'application/json' } }
      )
    }

    try {
      const data: ContactFormData = await request.json()

      // Validate required fields
      if (!data.name || !data.email || !data.message) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
        )
      }

      // Validate email format
      if (!isValidEmail(data.email)) {
        return new Response(
          JSON.stringify({ error: 'Invalid email format' }),
          { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
        )
      }

      // Rate limiting check (basic - can be enhanced with KV or Durable Objects)
      // For now, we rely on Resend's rate limiting

      // Sanitize inputs
      const name = sanitize(data.name)
      const email = sanitize(data.email)
      const company = data.company ? sanitize(data.company) : 'Not provided'
      const message = sanitize(data.message)

      // Construct email body
      const emailBody = `
New contact form submission from vyxlabs.com

Name: ${name}
Email: ${email}
Company: ${company}

Message:
${message}

---
Submitted at: ${new Date().toISOString()}
      `.trim()

      // Send email via Resend
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Vyx Labs Contact <${env.FROM_EMAIL}>`,
          to: [env.TO_EMAIL],
          reply_to: email,
          subject: `Contact: ${name}${data.company ? ` (${company})` : ''}`,
          text: emailBody,
        }),
      })

      if (!resendResponse.ok) {
        const errorText = await resendResponse.text()
        console.error('Resend API error:', errorText)
        throw new Error('Failed to send email')
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Message sent successfully' }),
        { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } }
      )

    } catch (error) {
      console.error('Error processing contact form:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to process request' }),
        { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } }
      )
    }
  },
}
