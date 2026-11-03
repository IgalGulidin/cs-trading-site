import { MOCK_LISTINGS } from "@/lib/mock-data";
import { SITE_NAME } from "@/lib/config";

// The swipe feed. For now it just dumps the raw data as text —
// YOUR TASK: turn each listing into a proper card (see src/components/ListingCard.tsx).
export default function SwipePage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">{SITE_NAME}</h1>
      <div className="flex flex-col gap-4">
        {MOCK_LISTINGS.map((listing) => (
          <pre key={listing.id} className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs">
            {JSON.stringify(listing, null, 2)}
          </pre>
        ))}
      </div>
    </>
  );
}
