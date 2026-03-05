"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import { signOut } from "next-auth/react";
import { useUIStore } from "@/store/ui";

interface TopBarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function TopBar({ user }: TopBarProps) {
  const unreadNotifications = useUIStore((state) => state.unreadNotifications);
  const setCommandPaletteOpen = useUIStore((state) => state.setCommandPaletteOpen);
  const setNotificationDrawerOpen = useUIStore((state) => state.setNotificationDrawerOpen);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-off-white/90 backdrop-blur-sm">
      <div className="flex min-h-16 items-center gap-3 px-4 md:px-6">
        <div className="font-display text-heading-2 font-bold text-indigo-night lg:hidden">AIFCA</div>

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex min-h-11 flex-1 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-[12px] text-muted-ash"
        >
          <Search className="size-4" />
          <span className="truncate">Search clients, tasks, deadlines...</span>
          <span className="ml-auto rounded-sm border border-zinc-200 px-1.5 py-0.5 text-[10px] text-muted-ash">?K</span>
        </button>

        <button
          onClick={() => setNotificationDrawerOpen(true)}
          className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-zinc-200 bg-white"
          aria-label="Open notifications"
        >
          <Bell className="size-4" />
          {unreadNotifications > 0 ? (
            <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-pill bg-saffron px-1 text-[8px] font-bold text-ink-black">
              {unreadNotifications}
            </span>
          ) : null}
        </button>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3"
            aria-label="User menu"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-indigo-night text-[10px] font-semibold text-off-white">
              {user.name?.split(" ").map((part) => part[0]).join("").slice(0, 2) || "CA"}
            </span>
            <span className="hidden text-[12px] font-semibold md:block">{user.name ?? "AIFCA User"}</span>
            <ChevronDown className="size-4" />
          </button>

          {menuOpen ? (
            <div className="absolute right-0 mt-2 w-44 rounded-md border border-zinc-200 bg-white p-1 shadow-lg">
              <button className="flex min-h-10 w-full items-center rounded px-2 text-left text-[12px] hover:bg-zinc-100">Profile</button>
              <button className="flex min-h-10 w-full items-center rounded px-2 text-left text-[12px] hover:bg-zinc-100">Settings</button>
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="flex min-h-10 w-full items-center rounded px-2 text-left text-[12px] text-saffron hover:bg-zinc-100"
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

