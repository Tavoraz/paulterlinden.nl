# Paul ter Linden Relaunch

Headless website rebuild for `paulterlinden.nl` using Next.js + Sanity.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4
- Sanity CMS (`next-sanity`)
- Vercel deployment target
- Contact API with SMTP (Nodemailer)

## Routes

- `/` Home
- `/wat` Services (anchors: `#bestuursadvies`, `#teambegeleiding`, `#coaching`)
- `/voor-wie`
- `/hoe`
- `/paul-ai`
- `/zelfdiagnose`
- `/paul`
- `/contact`
- `/inzicht`
- `/privacy`
- `/cookiebeleid`
- `/en` (reserved, `noindex`)
- `/studio` Sanity Studio

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy env template:

```bash
cp .env.example .env.local
```

3. Start frontend:

```bash
npm run dev
```

4. Optional: run Sanity Studio separately:

```bash
npm run sanity
```

## Content architecture

Sanity document types:

- `siteSettings`
- `homePage`
- `servicesPage`
- `audiencesPage`
- `approachPage`
- `aboutPage`
- `contactPage`
- `insightPage`
- `seoSettings`
- `redirectRule`

The frontend has typed Sanity queries and typed loaders with local fallback content so the site still renders when CMS env vars are not configured.

## SEO and migration

Configured 301 redirects in `next.config.ts`:

- `/advies/*` -> `/wat#bestuursadvies`
- `/coaching/*` -> `/wat#coaching`
- `/begeleiding/*` -> `/wat#teambegeleiding`
- `/aanpak/*` -> `/hoe`
- `/over-paul/*` -> `/paul`
- `/contact/*` -> `/contact`
- `/engels/*` -> `/en`

Also included:

- `src/app/sitemap.ts`
- `src/app/robots.ts`

## Form handling

`POST /api/contact`

Payload:

- `name`
- `email`
- `organization?`
- `role?`
- `message`
- `consent`
- `honeypot`
- `locale`

Behavior:

- Zod validation
- Honeypot spam check
- SMTP send via Nodemailer
- Structured JSON success/error response

`POST /api/paul-ai`

- Ingebouwde kennismodus op basis van website-inhoud
- Optioneel live AI-model via OpenAI-compatibele API
- Ondersteunt model-fallback via `PAUL_AI_MODEL` (komma-gescheiden), bijvoorbeeld:
  `xiaomi/mimo-v2-flash,deepseek/deepseek-v3.2,qwen/qwen3.5-27b`

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run sanity
```
