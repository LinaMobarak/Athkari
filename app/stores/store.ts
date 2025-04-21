import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DuaType} from '@/app/stores/duaStore'
import {ThekrType} from '@/app/stores/azkarStore'


export type favType = DuaType | ThekrType;

export type FavoStoreType = {
    favourites: favType[];
    timing: number
   
};

const useFavouriteStore = create<FavoStoreType>()(persist((set, get) => ({
    timing: 0,
    favourites: [],
   
}),{
    name: 'favo-storage',
    storage: createJSONStorage(() => AsyncStorage), 
}));

export default useFavouriteStore;