import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DuaType} from '@/app/stores/duaStore'
import {ThekrType} from '@/app/stores/azkarStore'


export type favType = DuaType | ThekrType;

export type FavoStoreType = {
    favourites: favType[];
};

const useFavouriteStore = create<FavoStoreType>()(persist((set, get) => ({
    favourites: [],
}),{
    name: 'favo-storage',
    storage: createJSONStorage(() => AsyncStorage), 
}));

export default useFavouriteStore;