import { MOCK_LISTINGS } from "@/lib/mock-data";
import { SITE_NAME } from "@/lib/config";
import { SwipeDeck } from "@/components/SwipeDeck";

// The swipe feed. This page is a Server Component (later it will load listings
// from the database); it hands the data to SwipeDeck, which runs in the browser.
export default function SwipePage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">{SITE_NAME}</h1>
      <SwipeDeck listings={MOCK_LISTINGS} />
    </>
  );
}
