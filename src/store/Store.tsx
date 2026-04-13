import type { DateType, Timeline, User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  userTimelines: Timeline[];
  setUserTimelines: (timeline: any) => void;
  dates: DateType[];
  setDates: (dates: any) => void;
  notifications: [];
  setNotifications: (notification: any) => void;
  savedIdeas: any;
  setSavedIdeas: (ideas: any) => void;
  mails: any;
  setMails: (mails: any) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (currentUser) => set({ currentUser }),
      userTimelines: [],
      setUserTimelines: (userTimelines) => set({ userTimelines }),
      dates: [],
      setDates: (dates) => set({ dates }),
      notifications: [],
      setNotifications: (notifications) => set({ notifications }),
      savedIdeas: [],
      setSavedIdeas: (savedIdeas) => set({ savedIdeas }),
      mails: [],
      setMails: (mails) => set({ mails }),
    }),

    { name: "momentstore" },
  ),
);
