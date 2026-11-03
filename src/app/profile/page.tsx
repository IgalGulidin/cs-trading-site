import type { Metadata } from "next";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold">Profile</h1>
      <p className="text-zinc-400">Steam login, your inventory and your listings will live here.</p>
    </>
  );
}
