import { create } from 'zustand';

interface QuranStore {
  lastRead: number | null;
  bookmarks: Array<{ surahId: number; surahName: string; revelationType: string; text: string }>;
  setLastRead: (ayah: number) => void;
  addBookmark: (bookmark: { surahId: number; surahName: string; revelationType: string; text: string }) => void;
  removeBookmark: (surahId: number) => void;
}

const useQuranStore = create<QuranStore>((set) => ({
  lastRead: null,
  bookmarks: [],
  setLastRead: (ayah) => set({ lastRead: ayah }),
  addBookmark: (bookmark) =>
    set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),
  removeBookmark: (surahId) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.surahId !== surahId),
    })),
}));

export default useQuranStore;