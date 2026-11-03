// The core data types of the whole site.
// Both the frontend and (later) the backend import these — that's the
// big win of keeping everything in one project.

/** Exterior / wear tiers, based on the item's float value. */
export type Wear = "FN" | "MW" | "FT" | "WW" | "BS";

export const WEAR_NAMES: Record<Wear, string> = {
  FN: "Factory New",
  MW: "Minimal Wear",
  FT: "Field-Tested",
  WW: "Well-Worn",
  BS: "Battle-Scarred",
};

/** A single CS2 item from a Steam inventory. */
export interface Item {
  id: string; // Steam asset id
  name: string; // e.g. "AK-47 | Redline"
  imageUrl: string;
  wear: Wear | null; // null for items without wear (stickers, cases, agents...)
  float: number | null; // 0.0 – 1.0
  statTrak: boolean;
  souvenir: boolean;
  priceUsd: number; // estimated market price
}

/** A trade listing — the thing shown on a swipe card. 1 item = solo, 2+ = bundle. */
export interface Listing {
  id: string;
  owner: {
    steamId: string; // SteamID64 — can't be faked, unlike a display name
    name: string;
    avatarUrl: string;
    completedTrades: number;
  };
  items: Item[];
  lookingFor: string; // free text for now, e.g. "Any knife" or "~$200 in rifles"
  createdAt: string; // ISO date
}
