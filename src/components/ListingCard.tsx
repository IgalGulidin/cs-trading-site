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
  return (
    <div className="rounded-2xl bg-zinc-900 p-4">
      {/* Start here! */}
      <p>{listing.items[0].name}</p>
    </div>
  );
}
