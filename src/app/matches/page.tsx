import type { Metadata } from "next";

export const metadata: Metadata = { title: "Matches" };

export default function MatchesPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold">Matches</h1>
      <p className="text-zinc-400">Mutual likes and trade offers will show up here.</p>
    </>
  );
}
