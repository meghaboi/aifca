"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, FileText, LayoutDashboard, MessageCircle, Users } from "lucide-react";
import { cn } from "@/utils/cn";

const tabs = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/compliance", label: "Compliance", icon: CheckSquare },
  { href: "/dashboard/documents", label: "Docs", icon: FileText },
  { href: "/dashboard/messages", label: "Messages", icon: MessageCircle },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Bottom navigation" className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-off-white lg:hidden">
      <div className="grid grid-cols-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "inline-flex min-h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium",
                active ? "text-saffron" : "text-muted-ash",
              )}
            >
              <Icon className="size-4" />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

