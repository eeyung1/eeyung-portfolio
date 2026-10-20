# Emmanuel Eyung — Portfolio

A responsive Next.js portfolio for product engineering, Go/Python backend work and AI integrations. Production domain: https://eeyung.vercel.app.

## Local development

Use Node.js 22 or newer. Run `npm ci`, then `npm run dev`.

Validation: `npm run lint`, `npm test`, `npm run typecheck`, `npm run build`. GitHub Actions runs the same gates for pull requests and main. No database or secrets are required.

## Implemented

- [x] Responsive editorial homepage using Emmanuel's existing portrait.
- [x] Light/dark theme, mobile navigation, skip link and reduced-motion support.
- [x] Filterable project catalogue and six dedicated case-study routes.
- [x] About, capabilities, services and working-process sections.
- [x] Live GitHub repository feed through a server endpoint, with timeout, caching and explicit failure/empty states.
- [x] Project enquiry builder that opens a prefilled email draft; copy-email action and fallback.
- [x] Page metadata, generated social image, structured data, sitemap and robots policy.
- [x] Pull-request CI for lint, activity endpoint regressions, TypeScript and production build.

## Updating content

`lib/portfolio.ts` is the version-controlled content source for projects, services, profile links and contact details. Add a project there to generate its case-study route and sitemap entry. Update homepage narrative in `app/page.tsx`; layout and theme tokens are in `app/globals.css`.

This release is interactive and reads current public GitHub activity. It does **not** include a browser-based CMS or admin login. Editorial changes go through GitHub, code review and deployment. The reference archive's database, credentials, analytics and admin implementation were not imported.

The enquiry builder uses `mailto:`. Visitors review and send the message in their own email application; the website does not receive, persist or claim to have sent it. No email provider is needed. The activity API is fixed to public repositories for `eeyung1`; it exposes no token or private repository data. GitHub rate limits may temporarily make that section unavailable without affecting the portfolio.

## Content and evidence

The existing portfolio and project READMEs informed the copy. Case studies distinguish deployed work, prototypes and outstanding acceptance. No invented testimonials, client logos, revenue, user counts or performance metrics are included. Project graphics are original editorial illustrations, not screenshots of deployed products.

Reference analysis: the supplied portfolio uses Next.js with database-backed publishing, project/research/writing pages, theme-aware typography, motion and admin content management. This implementation adapts its strong hierarchy and project storytelling into Emmanuel's own visual identity and documented work, without copying the other person's biography or empty publication sections.

## Deployment

The existing Vercel Git integration can build this standard Next.js application. Merge the feature PR only after reviewing its checks and preview. No schema migrations or environment changes are required. Change `profile.site` if the canonical domain changes.

Pending acceptance: review content, verify the Vercel preview on phone and laptop, test navigation/filter/theme/email handoff and check real GitHub responses. Browser/device and production verification must be recorded separately from a successful build.
