import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface QuranStore {
  lastRead: number | null;
  bookmarks: Array<{ surahId: number; surahName: string; revelationType: string; text: string }>;
  setLastRead: (ayah: number) => void;
  addBookmark: (bookmark: { surahId: number; surahName: string; revelationType: string; text: string }) => Promise<void>;
  removeBookmark: (surahId: number) => Promise<void>;
  loadBookmarks: () => Promise<void>;
}

const useQuranStore = create<QuranStore>((set) => ({
  lastRead: null,
  bookmarks: [], // Initialize with an empty array

  setLastRead: (ayah) => set({ lastRead: ayah }),

  addBookmark: async (bookmark) => {
    set((state) => {
      const updatedBookmarks = [...state.bookmarks, bookmark];
      AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks)); // Save to AsyncStorage
      return { bookmarks: updatedBookmarks };
    });
    console.log('Adding bookmark:', bookmark);
  },

  removeBookmark: async (surahId) => {
    set((state) => {
      const updatedBookmarks = state.bookmarks.filter((b) => b.surahId !== surahId);
      AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks)); // Update AsyncStorage
      return { bookmarks: updatedBookmarks };
    });
    console.log('Removing bookmark for Surah ID:', surahId);
  },

  loadBookmarks: async () => {
    const storedBookmarks = await AsyncStorage.getItem('bookmarks');
    if (storedBookmarks) {
      set({ bookmarks: JSON.parse(storedBookmarks) });
    }
  },
}));

export default useQuranStore;