import { create } from "zustand";

export type ToastTone = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  tone: ToastTone;
  title: string;
  message?: string;
}

interface UIState {
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  notificationDrawerOpen: boolean;
  activeModule: string;
  unreadNotifications: number;
  toasts: ToastItem[];
  setSidebarOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setNotificationDrawerOpen: (open: boolean) => void;
  setActiveModule: (module: string) => void;
  setUnreadNotifications: (count: number) => void;
  addToast: (toast: Omit<ToastItem, "id">) => string;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  commandPaletteOpen: false,
  notificationDrawerOpen: false,
  activeModule: "dashboard",
  unreadNotifications: 4,
  toasts: [],
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),
  setNotificationDrawerOpen: (notificationDrawerOpen) => set({ notificationDrawerOpen }),
  setActiveModule: (activeModule) => set({ activeModule }),
  setUnreadNotifications: (unreadNotifications) => set({ unreadNotifications }),
  addToast: (toast) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    return id;
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

