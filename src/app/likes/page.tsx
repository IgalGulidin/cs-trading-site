import type { Metadata } from "next";

export const metadata: Metadata = { title: "Likes" };

export default function LikesPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold">Likes</h1>
      <p className="text-zinc-400">Listings you swiped right on will show up here.</p>
    </>
  );
}
