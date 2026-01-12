# Lukas & Maria — Wedding Invitation Website

## Tech
- Next.js 14 (App Router)
- TailwindCSS
- Framer Motion
- Day.js
- RSVP via EmailJS

## Setup

1) Install:

```bash
npm install
```

2) Env:
- Copy `env.example` to `.env.local`
- Fill in:
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

3) Convert & optimize images (uses files from `photos/`):

```bash
npm run prepare:images
```

4) Run:

```bash
npm run dev
```


