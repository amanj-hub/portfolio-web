# Aman Kumar — developer portfolio

A polished one-page portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons. It uses a dark-first **Signal Stack** visual language: an editorial layout, restrained mint accents, and code-built product visuals instead of heavy stock assets.

## Project structure

```text
app/
  api/contact/route.ts     # safe, provider-ready contact endpoint
  globals.css              # design tokens, responsive system, and motion rules
  icon.svg                 # favicon
  layout.tsx               # metadata, JSON-LD, global shell
  manifest.ts              # web-app metadata
  opengraph-image.tsx      # generated Open Graph image
  page.tsx                 # composition of the home page
  robots.ts / sitemap.ts   # search engine routes
components/
  about.tsx                # individual, reusable portfolio sections
  achievements.tsx
  back-to-top.tsx
  contact.tsx / contact-form.tsx
  education.tsx
  experience.tsx
  featured-project.tsx
  github-activity.tsx
  hero.tsx
  project-visual.tsx
  projects.tsx
  scroll-progress.tsx
  site-footer.tsx / site-header.tsx
  skills.tsx / stats.tsx
  ui/reveal.tsx / ui/section-heading.tsx
config/site.ts             # all primary personal, project, and timeline content
.env.example               # optional contact-service settings
```

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Before a production handoff, run:

```bash
npm run typecheck
npm run lint
npm run build
```

## Replace placeholder content

`config/site.ts` is the primary editing surface. Update these first:

- `siteConfig`: name, initials, role, email, website, social URLs, navigation, and résumé path.
- `about`, `stats`, and `skillGroups`: biography, learning status, metrics, and technologies.
- `projects` and `featuredProject`: project copy, stack, images/visual style, and destination URLs.
- `experiences`, `achievements`, `education`, and `repositoryHighlights`: your professional record.

The résumé buttons point to `/resume.pdf`. Put your real PDF at `public/resume.pdf` before deployment. The included project visuals are built in CSS, so the page does not require any image asset; swap `ProjectVisual` for optimized local `next/image` assets if you later want photography or project screenshots.

## Connect the contact form

The form is fully client-validated and has accessible inline errors plus a success state. Its endpoint is deliberately isolated in `app/api/contact/route.ts`.

1. Copy `.env.example` to `.env.local`.
2. Add either a `FORMSPREE_ENDPOINT` or Resend variables.
3. In `app/api/contact/route.ts`, replace the clearly marked provider adapter block with your delivery call. Keep API keys server-side.
4. Restart the development server and submit a test message.

Until a provider is connected, the endpoint validates a message and returns an explicit setup notice—it never pretends to send email.

## Add a project

Add an object to the exported `projects` array in `config/site.ts`. Each entry needs a name, description, problem statement, stack, URLs, `visual` (`orbit`, `ledger`, or `pulse`), and `accent`. The Projects section automatically renders it. For a fourth visual direction, add its markup in `components/project-visual.tsx` and a matching style block in `app/globals.css`.

## Deploy on Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import it at [Vercel](https://vercel.com/new).
3. Vercel detects Next.js; keep the default build command (`npm run build`) and output settings.
4. Add any contact-service environment variables in **Project Settings → Environment Variables**.
5. Update `siteConfig.url` to your production domain, add `public/resume.pdf`, and deploy.

Vercel will serve `sitemap.xml`, `robots.txt`, the manifest, favicon, generated Open Graph image, and the contact endpoint automatically.
