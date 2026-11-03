import type { Listing } from "@/types/item";

// Fake listings so we can build the UI before we have a database.
// Images are coloured placeholders for now; real ones will come from Steam.
const img = (label: string) =>
  `https://placehold.co/360x270/1f2937/e5e7eb/png?text=${encodeURIComponent(label)}`;

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "l1",
    owner: { steamId: "76561198000000001", name: "redline_enjoyer", avatarUrl: img("R"), completedTrades: 42 },
    items: [
      { id: "a1", name: "AK-47 | Redline", imageUrl: img("AK-47 Redline"), wear: "FT", float: 0.2134, statTrak: true, souvenir: false, priceUsd: 48.5 },
    ],
    lookingFor: "M4A1-S skins around $50",
    createdAt: "2026-11-01T12:00:00Z",
  },
  {
    id: "l2",
    owner: { steamId: "76561198000000002", name: "awp_main", avatarUrl: img("A"), completedTrades: 7 },
    items: [
      { id: "b1", name: "AWP | Asiimov", imageUrl: img("AWP Asiimov"), wear: "BS", float: 0.8421, statTrak: false, souvenir: false, priceUsd: 95 },
      { id: "b2", name: "Glock-18 | Fade", imageUrl: img("Glock Fade"), wear: "FN", float: 0.0213, statTrak: false, souvenir: false, priceUsd: 1450 },
      { id: "b3", name: "USP-S | Kill Confirmed", imageUrl: img("USP Kill Confirmed"), wear: "MW", float: 0.1102, statTrak: true, souvenir: false, priceUsd: 120 },
    ],
    lookingFor: "Any knife",
    createdAt: "2026-11-02T09:30:00Z",
  },
  {
    id: "l3",
    owner: { steamId: "76561198000000003", name: "major_collector", avatarUrl: img("M"), completedTrades: 130 },
    items: [
      { id: "c1", name: "AWP | Dragon Lore", imageUrl: img("AWP Dragon Lore"), wear: "MW", float: 0.0912, statTrak: false, souvenir: true, priceUsd: 18000 },
    ],
    lookingFor: "Offers only, high-tier",
    createdAt: "2026-11-03T08:15:00Z",
  },
];
