import type { Listing } from "@/types/item";

// 📘 REFERENCE VERSION — finished by Claude so you can see the patterns.
// Each section has a comment saying WHICH concept it uses. Reuse these patterns
// in future components!

type Props = {
  listing: Listing;
};

// Helper function: turns 1450 into "$1,450.00".
// Small reusable logic → its own function, outside the component.
function formatUsd(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function ListingCard({ listing }: Props) {
  // VARIABLES — pull out what we need so the JSX below stays readable.
  const item = listing.items[0]; // first item = the big one
  const extraItems = listing.items.slice(1); // everything EXCEPT the first (new array)
  const isBundle = listing.items.length > 1; // a boolean: true or false

  // .reduce — walks over the array and "adds up" into one value.
  // sum starts at 0, then for each item: sum = sum + item.priceUsd
  const totalValue = listing.items.reduce((sum, i) => sum + i.priceUsd, 0);

  return (
    <div className="rounded-2xl bg-zinc-900 p-4">
      {/* Owner line */}
      <p className="mb-2 text-sm text-zinc-400">
        {listing.owner.name} · {listing.owner.completedTrades} trades
      </p>

      {/* Main image */}
      <img src={item.imageUrl} alt={item.name} className="w-full rounded-lg" />

      {/* CONDITIONAL RENDERING with && — "if true, show this" */}
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

      {/* The && wraps the WHOLE <p> — so the entire line disappears for stickers/cases.
          ⚠️ We check `!== null` for float instead of plain &&, because a float of 0
          is "falsy" and React would literally print "0" on the screen! */}
      {item.wear && (
        <p className="mt-1 text-sm text-zinc-400">
          {item.wear}
          {item.float !== null && <> · {item.float.toFixed(4)}</>}
        </p>
      )}

      {/* BUNDLES — .map turns an array of DATA into an array of JSX.
          Every element from .map needs a unique `key` so React can track it. */}
      {isBundle && (
        <div className="mt-3 flex items-center gap-2">
          {extraItems.map((extra) => (
            <img
              key={extra.id}
              src={extra.imageUrl}
              alt={extra.name}
              title={extra.name} // shows the name on hover
              className="h-16 w-16 rounded-lg bg-zinc-800 object-contain"
            />
          ))}
          <span className="text-sm text-zinc-400">+{extraItems.length} items</span>
        </div>
      )}

      {/* Total value: for a bundle we say "Total", for a single item just the price.
          `condition ? A : B` is the TERNARY — an if/else that works inside JSX. */}
      <p className="mt-3 text-sm">
        <span className="text-zinc-400">{isBundle ? "Total value:" : "Value:"}</span>{" "}
        <span className="font-semibold text-green-400">{formatUsd(totalValue)}</span>
      </p>

      <p className="mt-1 text-sm">
        <span className="text-zinc-400">Looking for:</span> {listing.lookingFor}
      </p>
    </div>
  );
}
