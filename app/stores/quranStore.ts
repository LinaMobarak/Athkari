// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface SurahInfo {
//     surahId: number;
//     surahName: string;
//     revelationType: string;
// }

// interface QuranStore {
//     lastRead: SurahInfo | null;
//     setLastRead: (surahInfo: SurahInfo) => void;
//     clearLastRead: () => void;
// }

// const useQuranStore = create<QuranStore>()(
//     persist(
//         (set) => ({
//             lastRead: null,

//             setLastRead: (surahInfo: SurahInfo) => set({ lastRead: surahInfo }),

//             clearLastRead: () => set({ lastRead: null }),
//         }),
//         {
//             name: 'quran-storage',
//             storage: AsyncStorage,
//         }
//     )
// );

// export default useQuranStore;