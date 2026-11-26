@AGENTS.md

# SkinSwipe — CS2 swipe-to-trade site

A free, non-profit, community-made CS2 skin trading site with a Tinder-style swipe UI.
The owner is building it **to learn to code** — they are a beginner.

## How we work (IMPORTANT)

**Learning mode "C":**
- Claude does the boring setup / plumbing (config, auth wiring, database setup, security).
- The user writes the interesting parts (UI components, core logic) as **guided tasks**:
  give small steps + hints + short examples, NOT the full solution.
- When the user says "review", read their code, run `npm run lint` and `npx tsc --noEmit`,
  then give friendly feedback: what's good first, then small fixes, then the next mini-challenge.
- Explain concepts simply (they asked to practice the basics: variables, `if`, arrays, `.map`, JSX).
- Don't rewrite the user's files without asking — suggest the change and let them type it.
- User found guided tasks slow — keep steps small; offer a finished, commented reference version
  when they're stuck or ask for it ("finish it so I can learn").

## Product decisions (already made — don't re-ask)

- **Web only**, mobile-first (phone experience like csgoempire / csgoroll). No native app.
- **Swipe right** → saved to **Likes**. If the other user also liked one of your listings → **Match**
  (notification + trade room). From Likes you can also **send an offer** (pick your items).
  Optional "Super Like" = send an offer directly.
- **Listings** contain 1–N items (solo items AND bundles, max ~6) + a "looking for" text.
- Cards show: image, name, wear (FN/MW/FT/WW/BS), float, StatTrak™ / Souvenir as small
  coloured labels (user prefers labels over coloured borders). Later: stickers, pattern, price.
- **Item-for-item only. No cash, no payments.** The site **never holds items** (no trade bots):
  trades happen peer-to-peer via Steam trade offers; the site verifies completion by
  comparing inventories.
- Budget: up to ~$50/month for hosting.

## Security / anti-scam / anti-bot (top priority)

- Login only via **Steam OpenID**. **Never ask for a Steam API key** — show a banner saying so.
- Account requirements: not limited, minimum account age, owns CS2, public inventory,
  no trade/VAC bans (`GetPlayerBans`).
- Rate limits (Upstash Redis) on swipes/offers/listings; Cloudflare + Turnstile on sign-up & offers.
- Show SteamID64, account age, completed trades prominently (anti-impersonation).
- Locked trade summary ("the Steam offer must contain EXACTLY these items/floats").
- Filter/warn on external links in chat. Reputation only from verified trades. Reports.
- Validate all input with Zod; HTTP-only secure cookies; CSRF; CSP; Supabase RLS; secrets in `.env` only.

## Stack

Next.js **16.4.6** (App Router, `src/` dir, Cache Components on) · React 19 · TypeScript · Tailwind v4 ·
**`motion` v14** (formerly Framer Motion — import from `"motion/react"`).
Planned: Supabase Postgres + realtime, Drizzle or Prisma, Zod,
Upstash Redis, Cloudflare Turnstile, Vercel hosting.

## Project layout

- `src/app/` — pages: `/` swipe feed, `/likes`, `/matches`, `/profile`; `layout.tsx` = dark mobile shell + bottom nav
- `src/app/page.tsx` — Server Component; passes `MOCK_LISTINGS` to `<SwipeDeck>`
- `src/components/BottomNav.tsx` — bottom navigation
- `src/components/ListingCard.tsx` — the card (user + Claude). Commented **reference version** —
  point back to it in future tasks.
- `src/components/SwipeDeck.tsx` — `"use client"` swipe stack (Claude; arrow keys written by the user)
- `src/types/item.ts` — `Item`, `Listing`, `Wear`, `WEAR_NAMES` (shared types)
- `src/lib/mock-data.ts` — 3 fake listings (one is a 3-item bundle) until we have a database
- `src/lib/config.ts` — `SITE_NAME` (placeholder name "SkinSwipe")
- `next.config.ts` — security headers + allowed image hosts (Steam CDN, placehold.co)

## Roadmap

1. ✅ Setup: Next.js + TS + Tailwind, mobile layout, security headers
2. **← NEXT:** Steam login (OpenID) — let the user implement parts of it, it's educational
3. Inventory import + caching
4. Create-listing form (bundles)
5. Swipe feed — ✅ card + swipe gesture done (on mock data); feed ranking still to do
6. Likes, matches, offers, notifications
7. Trade verification + reputation
8. Hardening (rate limits, Turnstile, account checks, CSP) → launch

## Current status (update this as we go)

Last session ended 2026-11-26. Everything committed and pushed to `main`. Lint = only the
accepted `<img>` warnings; `tsc` clean; `next build` passes.

- ✅ **ListingCard** — image, owner, StatTrak™/Souvenir labels, wear · float (only if `wear`),
  bundle thumbnails + "+N items", total value.
- ✅ **SwipeDeck** — drag/fling, ✕/♥ buttons, or ← / → keys; tilt + LIKE/NOPE stamps; next card
  peeks behind; "No more listings" + Start over. Likes live only in React state (`likedIds`) —
  **not saved yet** (needs login + database).
- ✅ Next.js upgraded 16.4.4 → 16.4.6 (security advisories). `npm audit --omit=dev` = 0 vulnerabilities.
- **Next session: start Steam login (OpenID).** Claude does the plumbing (callback verification,
  session cookie, security); give the user small guided parts.

### What the user has learned (reinforce these)
- JSX, `&&`, ternary, `.map` + `key`, `.slice`, `.reduce`, `!== null` vs falsy `0`,
  `useState`, `useEffect` + cleanup, `"use client"`.
- **Rules of Hooks** (top level only, before any early `return`) — they got this wrong once.
- **Stale closures**: `useEffect(..., [])` remembers first-render values.
- Matching `{ }` braces — suggest VS Code bracket highlighting + Shift+Alt+F to format.
- **Git merges**: conflicts often need **both** sides; never hand-edit `package-lock.json`
  (take one side, then `npm install`). They stopped and asked instead of guessing — encourage that.
- Remember to save files (Ctrl+S) before asking for a review.

## Notes

- Works on **two Windows machines** (desktop + laptop) via GitHub: github.com/IgalGulidin/cs-trading-site.
  **When starting on the other machine:** `git pull` → `npm install` (deps changed: `motion`, Next 16.4.6).
- PowerShell may block `npm` ("running scripts is disabled on this system"). Fix once per machine:
  `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` (or use `npm.cmd`).
- If `tsc` says `Cannot find name 'LayoutProps'`, the generated types are missing:
  run `npx next typegen` (or `npm run dev` once).
- Python is not installed on the main machine — don't rely on it for scripts.
- Do NOT run `npm audit fix --force`.
- The `<img>` lint warning is accepted for now; switch to `next/image` later.
- `next build` / `next dev` may stop once with a Next.js security-upgrade reminder
  (`experimental.agentUpgrade: "security"` in `next.config.ts`); retrying continues.
