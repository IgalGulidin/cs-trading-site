"use client"; // runs in the browser: it reads the current URL to highlight the active tab

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Swipe", icon: "🔥" },
  { href: "/likes", label: "Likes", icon: "⭐" },
  { href: "/matches", label: "Matches", icon: "🤝" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    // pb-[env(safe-area-inset-bottom)] keeps the bar above the iPhone home indicator
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-zinc-950/90 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <ul className="mx-auto flex max-w-md justify-around">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 py-2 text-xs transition-colors ${
                  active ? "text-orange-400" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span className="text-xl" aria-hidden>
                  {tab.icon}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
