import { create } from 'zustand';

interface Bookmark {
  surahId: number;
  text: string;
  surahName: string;
  revelationType: string;
}

interface QuranStore {
  lastRead: Bookmark | null;
  bookmarks: Bookmark[];
  setLastRead: (data: Bookmark) => void;
  addBookmark: (data: Bookmark) => void;
  removeBookmark: (surahId: number) => void;
}

const useQuranStore = create<QuranStore>((set) => ({
  lastRead: null, // Initial state for the last read bookmark
  bookmarks: [], // List of bookmarks
  setLastRead: (data: Bookmark) => {
    set({ lastRead: data }); // Update the lastRead state
    console.log('Last read updated:', data); // Log the update for debugging
  },
  addBookmark: (data: Bookmark) => {
    set((state) => ({
      bookmarks: [...state.bookmarks, data], // Add new bookmark to the list
    }));
    console.log('Bookmark added:', data);
  },
  removeBookmark: (surahId: number) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.surahId !== surahId), // Remove bookmark by surahId
    }));
    console.log('Bookmark removed for Surah ID:', surahId);
  },
}));

export default useQuranStore;