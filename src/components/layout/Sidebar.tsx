"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  CheckSquare,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/utils/cn";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Compliance", href: "/dashboard/compliance", icon: CheckSquare },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "Messages", href: "/dashboard/messages", icon: MessageCircle },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[250px] border-r border-zinc-200 bg-warm-paper px-3 py-4 lg:flex lg:flex-col">
      <div className="mb-6 rounded-md border border-zinc-200 bg-off-white p-3">
        <p className="text-[8px] uppercase tracking-[0.12em] text-muted-ash">Firm</p>
        <button className="mt-1 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-left text-[12px] font-semibold">
          Shri & Co. Chartered Accountants
        </button>
      </div>

      <nav aria-label="Primary" className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-11 items-center gap-2 rounded-md px-3 text-[12px] font-medium transition-colors",
                active ? "bg-indigo-night text-off-white" : "text-ink-black hover:bg-zinc-100",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 border-t border-zinc-200 pt-4">
        <button className="flex min-h-11 w-full items-center gap-2 rounded-md px-3 text-left text-[12px] font-medium hover:bg-zinc-100">
          <HelpCircle className="size-4" />
          Help
        </button>
        <button className="flex min-h-11 w-full items-center gap-2 rounded-md px-3 text-left text-[12px] font-medium hover:bg-zinc-100">
          <Settings className="size-4" />
          Keyboard Shortcuts
        </button>
      </div>
    </aside>
  );
}

