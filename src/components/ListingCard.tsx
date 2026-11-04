import type { Listing } from "@/types/item";

// 🎯 YOUR TASK — build the trade card.
//
// Goal: replace the raw JSON on the Swipe page with good-looking cards.
//
// Steps:
//  1. Show the FIRST item big: image, name, wear badge (e.g. "FT"), float value.
//  2. If item.statTrak  → show an orange "StatTrak™" badge.
//     If item.souvenir  → show a yellow "Souvenir" badge.
//  3. If listing.items.length > 1 → it's a bundle: show the other items as small
//     thumbnails underneath (hint: listing.items.slice(1).map(...)).
//  4. Show the owner (name + completed trades) and "Looking for: ...".
//  5. Bonus: show the total value of the bundle
//     (hint: listing.items.reduce((sum, item) => sum + item.priceUsd, 0)).
//  6. In src/app/page.tsx, swap the <pre> for <ListingCard listing={listing} />.
//
// Tips:
//  - For images use `import Image from "next/image"` with width/height props.
//  - WEAR_NAMES in "@/types/item" turns "FT" into "Field-Tested".
//  - Price formatting: item.priceUsd.toLocaleString("en-US", { style: "currency", currency: "USD" })
//  - Design for a phone first — check it in Chrome DevTools' device mode (Ctrl+Shift+M).

type Props = {
  listing: Listing;
};

export function ListingCard({ listing }: Props) {
  const item = listing.items[0];
  const ownerName = listing.owner.name;
  const completedTrades = listing.owner.completedTrades;
  const lookingFor = listing.lookingFor;

  return (
    <div className="rounded-2xl bg-zinc-900 p-4">
      <p className="mb-2 text-sm text-zinc-400">
        {ownerName} · {completedTrades} trades
      </p>
      <img src={item.imageUrl} alt={item.name} className="w-full rounded-lg" />
      <div className="mt-2 flex gap-2">
        {item.statTrak && (
          <span className="rounded bg-orange-500/20 px-2 py-0.5 text-xs text-orange-400">
            StatTrak™
          </span>
        )}
        {item.souvenir && (
          <span className="rounded bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-400">
            Souvenir
          </span>
        )}
      </div>
      <p className="mt-2 font-bold">{item.name}</p>
      <p className="mt-1 text-sm text-zinc-400">
        {item.wear} - {item.float}
      </p>
      <p className="mt-3 text-sm">
        <span className="text-zinc-400">Looking for:</span> {lookingFor}
      </p>
    </div>
  );
}
