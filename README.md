# Vyx Labs Website

Minimal, high-credibility landing page for [vyxlabs.com](https://vyxlabs.com).

## Tech Stack

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Hosting**: GitHub Pages
- **Domain/DNS**: Cloudflare Registrar
- **Email**: Google Workspace (andrei@vyxlabs.com)
- **Contact Form**: Cloudflare Worker + Resend

## Project Structure

```
website/
├── public/              # Static assets
│   ├── vyx-logo.png
│   ├── vyx-minimalist-icon.png
│   ├── privacy.html
│   ├── terms.html
│   └── CNAME           # Custom domain for GitHub Pages
├── src/
│   ├── components/     # React components
│   │   ├── Hero.tsx
│   │   ├── WhatWeDo.tsx
│   │   ├── HowWeWork.tsx
│   │   ├── FocusAreas.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css       # Tailwind + custom styles
├── worker/             # Cloudflare Worker for contact form
│   ├── src/
│   │   └── index.ts
│   ├── wrangler.toml
│   ├── package.json
│   └── tsconfig.json
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── package.json
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### 1. GitHub Pages Setup

1. Push this repository to GitHub (e.g., `vyxlabs/vyxlabs.com`)

2. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: "GitHub Actions"

3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_CONTACT_WORKER_URL: ${{ secrets.CONTACT_WORKER_URL }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. Add the `CONTACT_WORKER_URL` secret in GitHub repository settings:
   - Settings → Secrets and variables → Actions
   - Add: `CONTACT_WORKER_URL` = your Cloudflare Worker URL

### 2. Cloudflare DNS Setup

Configure DNS records in Cloudflare dashboard:

```
Type    Name    Content              Proxy
A       @       185.199.108.153      DNS only
A       @       185.199.109.153      DNS only
A       @       185.199.110.153      DNS only
A       @       185.199.111.153      DNS only
CNAME   www     vyxlabs.github.io    DNS only
```

**Important**: Set proxy status to "DNS only" (grey cloud) for GitHub Pages compatibility.

### 3. Google Workspace MX Records

These should already be configured. Verify you have:

```
Type    Name    Content                     Priority
MX      @       aspmx.l.google.com          1
MX      @       alt1.aspmx.l.google.com     5
MX      @       alt2.aspmx.l.google.com     5
MX      @       alt3.aspmx.l.google.com     10
MX      @       alt4.aspmx.l.google.com     10
```

## Contact Form Setup

The contact form uses a Cloudflare Worker to relay form submissions to your Google Workspace email via Resend.

### Why Resend?

- Excellent deliverability with Google Workspace
- Free tier: 100 emails/day, 3,000/month
- Simple API, no SMTP configuration needed
- Works seamlessly with Cloudflare Workers

### Setup Steps

1. **Create a Resend account** at [resend.com](https://resend.com)

2. **Verify your domain** in Resend dashboard:
   - Add TXT and CNAME records as instructed by Resend
   - This allows sending from `contact@vyxlabs.com`

3. **Get your API key** from Resend dashboard

4. **Deploy the Cloudflare Worker**:

```bash
cd worker

# Install dependencies
npm install

# Login to Cloudflare
npx wrangler login

# Set secrets
npx wrangler secret put RESEND_API_KEY
# (paste your Resend API key)

npx wrangler secret put ALLOWED_ORIGIN
# (enter: https://vyxlabs.com)

# Deploy
npm run deploy
```

5. **Note your Worker URL** (shown after deploy, e.g., `https://vyxlabs-contact.your-subdomain.workers.dev`)

6. **Add to GitHub Secrets**:
   - Go to your GitHub repo → Settings → Secrets → Actions
   - Add: `CONTACT_WORKER_URL` = your Worker URL

### Custom Route (Optional)

To use `vyxlabs.com/api/contact` instead of the workers.dev subdomain:

1. In Cloudflare dashboard, go to Workers & Pages → your worker
2. Click "Add route"
3. Enter: `vyxlabs.com/api/contact*`
4. Select your zone (vyxlabs.com)

Then update `VITE_CONTACT_WORKER_URL` to `https://vyxlabs.com/api/contact`

### Testing the Worker

```bash
# Test locally
cd worker
npm run dev

# In another terminal
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

## Environment Variables

| Variable | Description | Where Set |
|----------|-------------|-----------|
| `VITE_CONTACT_WORKER_URL` | URL of the contact form worker | GitHub Secrets / .env |
| `RESEND_API_KEY` | Resend API key for email sending | Cloudflare Worker Secrets |
| `ALLOWED_ORIGIN` | Allowed CORS origin | Cloudflare Worker Secrets |

## Customization

### Accent Color

Edit `tailwind.config.js`:

```js
colors: {
  'vyx': {
    'accent': '#6366f1', // Change this
    // ...
  }
}
```

### Analytics

Uncomment the Plausible script in `index.html`:

```html
<script defer data-domain="vyxlabs.com" src="https://plausible.io/js/script.js"></script>
```

Or add your preferred analytics provider.

## DNS Verification Checklist

After setup, verify:

- [ ] `https://vyxlabs.com` loads the site
- [ ] `https://www.vyxlabs.com` redirects to apex domain
- [ ] Contact form submissions arrive at `andrei@vyxlabs.com`
- [ ] SSL certificate is valid (GitHub Pages handles this)
- [ ] MX records are correct (test by sending email to your @vyxlabs.com address)

## Troubleshooting

### Contact form not working

1. Check browser console for CORS errors
2. Verify `VITE_CONTACT_WORKER_URL` is set correctly
3. Check Worker logs: `cd worker && npx wrangler tail`
4. Ensure Resend domain is verified

### Site not loading on custom domain

1. Wait up to 24 hours for DNS propagation
2. Check GitHub Pages settings show domain as verified
3. Ensure CNAME file exists in `public/` folder
4. Verify DNS is set to "DNS only" (not proxied) in Cloudflare

### Build failures

1. Ensure Node.js v22+ is used
2. Check for TypeScript errors: `npm run build`
3. Verify all environment variables are set in GitHub Secrets

## License

© 2025 Vyx Labs Inc. All rights reserved.
