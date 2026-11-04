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

Next.js 16 (App Router, `src/` dir, Cache Components on) · React 19 · TypeScript · Tailwind v4.
Planned: Framer Motion (swipe), Supabase Postgres + realtime, Drizzle or Prisma, Zod,
Upstash Redis, Cloudflare Turnstile, Vercel hosting.

## Project layout

- `src/app/` — pages: `/` swipe feed, `/likes`, `/matches`, `/profile`; `layout.tsx` = dark mobile shell + bottom nav
- `src/components/` — `BottomNav.tsx`, `ListingCard.tsx` (written by the user)
- `src/types/item.ts` — `Item`, `Listing`, `Wear`, `WEAR_NAMES` (shared types)
- `src/lib/mock-data.ts` — 3 fake listings (one is a 3-item bundle) until we have a database
- `src/lib/config.ts` — `SITE_NAME` (placeholder name "SkinSwipe")
- `next.config.ts` — security headers + allowed image hosts (Steam CDN, placehold.co)

## Roadmap

1. ✅ Setup: Next.js + TS + Tailwind, mobile layout, security headers
2. Steam login (OpenID) — let the user implement parts of it, it's educational
3. Inventory import + caching
4. Create-listing form (bundles)
5. Swipe feed (Framer Motion) + feed ranking
6. Likes, matches, offers, notifications
7. Trade verification + reputation
8. Hardening (rate limits, Turnstile, account checks, CSP) → launch

## Current status (update this as we go)

- Working on: **`ListingCard.tsx`** (user's task). Done: owner line, image, StatTrak/Souvenir
  labels, name, wear + float, "Looking for".
- Pending feedback from last review: show wear/float only when `item.wear` exists (`&&`),
  use `·` instead of `-`.
- **Next mini-challenge: bundles** — show `listing.items.slice(1).map(...)` as small
  thumbnails (`h-16 w-16`, `key={extra.id}`) + "+N items" text.
- After the card: Claude builds the swipe gesture (Framer Motion), then Steam login.

## Notes

- `npm audit` shows moderate issues in ESLint dev tooling only — do NOT run `npm audit fix --force`.
- The `<img>` lint warning is accepted for now; switch to `next/image` later.
- Windows machine (also continuing on a laptop via GitHub: github.com/IgalGulidin/cs-trading-site).
