"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, CircleAlert, FileText, MessageCircle } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { useUIStore } from "@/store/ui";
import type { NotificationItem } from "@/lib/mock-data";

function NotificationIcon({ type }: { type: NotificationItem["type"] }) {
  if (type === "deadline") return <CircleAlert className="mt-0.5 size-4 text-saffron" />;
  if (type === "whatsapp_document") return <MessageCircle className="mt-0.5 size-4 text-peacock-teal" />;
  if (type === "regulatory_alert") return <Bell className="mt-0.5 size-4 text-turmeric-gold" />;
  return <FileText className="mt-0.5 size-4 text-indigo-night" />;
}

export function AppShell({
  user,
  notifications,
  children,
}: {
  user: { name?: string | null; email?: string | null; image?: string | null };
  notifications: NotificationItem[];
  children: React.ReactNode;
}) {
  const notificationDrawerOpen = useUIStore((state) => state.notificationDrawerOpen);
  const setNotificationDrawerOpen = useUIStore((state) => state.setNotificationDrawerOpen);
  const setUnreadNotifications = useUIStore((state) => state.setUnreadNotifications);

  return (
    <div className="min-h-screen bg-off-white">
      <div className="mx-auto flex max-w-[1440px]">
        <Sidebar />
        <div className="min-h-screen min-w-0 flex-1">
          <TopBar user={user} />
          <main id="main-content" className="px-4 pb-20 pt-5 md:px-6 lg:pb-8">
            {children}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {notificationDrawerOpen ? (
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-indigo-night/40 px-3 py-6 xl:hidden"
            onClick={() => setNotificationDrawerOpen(false)}
          >
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto h-full w-full max-w-[360px] overflow-auto rounded-md border border-zinc-200 bg-off-white p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-heading-3 uppercase tracking-[0.08em]">Notifications</h2>
                <button
                  className="rounded-md border border-zinc-200 px-2 py-1 text-[10px]"
                  onClick={() => setUnreadNotifications(0)}
                >
                  Mark all read
                </button>
              </div>
              <div className="space-y-2">
                {notifications.map((item) => (
                  <article key={item.id} className="rounded-md border border-zinc-200 bg-warm-paper p-3">
                    <div className="flex gap-2">
                      <NotificationIcon type={item.type} />
                      <div>
                        <h3 className="text-[12px] font-semibold">{item.title}</h3>
                        <p className="text-[10px] text-muted-ash">{item.message}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <BottomNav />
      <CommandPalette />
    </div>
  );
}

