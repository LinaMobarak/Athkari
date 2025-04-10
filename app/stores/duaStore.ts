import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage';

export type DuaType ={
    id: number | string 
    title: string;
    description: string;

}

export type DuaStoreType = {
    dua: DuaType[];
};

export const useDuaStore = create<DuaStoreType>()(persist((set, get) => ({

    dua: [
            {   
                id: 1,
                title: "دعاء دخول الجنة ",
                description: "اللَّهمَّ إنِّي أسألُكَ الجنَّةَ وما قرَّبَ إليها من قَولٍ أو عملٍ، وأعوذُ بِكَ منَ النَّارِ وما قرَّبَ إليها من قولٍ أو عملٍ، وأسألُكَ أن تجعلَ كلَّ قَضاءٍ قضيتَهُ لي خيرًا",
                
            },
            {
                id: 2,
                title: "دعاء السفر",
                description: "اللهم إنا نسألك في سفرنا هذا البر والتقوى ومن العمل ما ترضى اللهم هون علينا سفرنا هذا واطو عنا بعده اللهم أنت الصاحب في السفر والخليفة في الأهل اللهم إني أعوذ بك من وعثاء السفر وكآبة المنقلب وسوء المنظر في الأهل والمال آيبون تائبون عابدون ولربنا حامدون",
                
            }
            
        ],
}),{
    name: 'dua-storage',
    storage: createJSONStorage(() => AsyncStorage), 
}))