import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';


interface QuranStore {
  lastRead: number | null;
  bookmarks: Array<{ idd: string; surahName: string; revelationType: string; text: string }>;
  setLastRead: (ayah: number) => void;
  addBookmark: (bookmark: { idd: string;  surahName: string; revelationType: string; text: string }) => Promise<void>;
  removeBookmark: (text: string) => Promise<void>;
  loadBookmarks: () => Promise<void>;
}

const useQuranStore = create<QuranStore>()(persist((set , get) => ({
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

  removeBookmark: async (text) => {
    set((state) => {
      const updatedBookmarks = state.bookmarks.filter((b) => b.text !== text);
      AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks)); // Update AsyncStorage
      return { bookmarks: updatedBookmarks };
    });
    console.log('Removing bookmark for Surah ID:', text);
  },

  loadBookmarks: async () => {
    const storedBookmarks = await AsyncStorage.getItem('bookmarks');
    if (storedBookmarks) {
      set({ bookmarks: JSON.parse(storedBookmarks) });
    }
  },
}),{

  name:'quran-storage', 
  storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage as the storage engine
}));

export default useQuranStore;