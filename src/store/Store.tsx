import type { DateType, Timeline, User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  resetUser: () => void;
  userTimelines: Timeline[];
  setUserTimelines: (timeline: any) => void;
  dates: DateType[];
  datesLoaded: boolean;
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
      resetUser: () => {
        localStorage.removeItem("mail-draft");
        set({
          currentUser: null,
          userTimelines: [],
          dates: [],
          datesLoaded: false,
          notifications: [],
          savedIdeas: [],
          mails: [],
        });
      },
      userTimelines: [],
      setUserTimelines: (userTimelines) => set({ userTimelines }),
      dates: [],
      datesLoaded: false,
      setDates: (dates) => set({ dates, datesLoaded: true }),
      notifications: [],
      setNotifications: (notifications) => set({ notifications }),
      savedIdeas: [],
      setSavedIdeas: (savedIdeas) => set({ savedIdeas }),
      mails: [],
      setMails: (mails) => set({ mails }),
    }),

    {
      name: "momentstore",
      version: 1,
      // Private data stays out of localStorage (which also turns Dates into
      // strings); it is reloaded from Firestore on every visit.
      partialize: (state) => ({ currentUser: state.currentUser }),
      migrate: (old: any) => ({ currentUser: old?.currentUser ?? null }),
    },
  ),
);
