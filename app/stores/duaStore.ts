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
                
            },
            {
                id: 3,
                title: 'دعاء الرزق',
                description: "اللهم ارزقني رزقًا حلالًا طيبًا مباركًا فيه."
            },
            {
                id: 4,
                title: 'دعاء تفريج الهم',
                description: "اللهم اجعل لي من كل هم فرجًا ومن كل ضيق مخرجًا ومن كل بلاء عافية.",
            },
            {
                id: 5,
                title: 'دعاء الشفاء',
                description: "اللهم رب الناس، أذهب البأس، اشفِ أنت الشافي، لا شفاء إلا شفاؤك.",
            },
            {
                id: 6,
                title: 'دعاء التوفيق',
                description: "اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً.",
            },
            {
                id: 7,
                title: 'دعاء الاستخارة',
                description: "اللهم إني أستخيرك بعلمك، وأستقدرك بقدرتك، وأسألك من فضلك العظيم.",
            },
            {
                id: 8,
                title: 'دعاء رضا الله',
                description: "اللهم إني أسألك رضاك والجنة، وأعوذ بك من سخطك والنار.",
            },
            {
                id: 9,
                title: 'دعاء الخروج من المنزل',
                description: "بسم الله، توكلت على الله، ولا حول ولا قوة إلا بالله.",
            },
            {
                id: 10,
                title: 'دعاء دخول المنزل',
                description: "اللهم إني أسألك خير المولج وخير المخرج، بسم الله ولجنا وبسم الله خرجنا.",
            },
            
        ],
}),{
    name: 'dua-storage',
    storage: createJSONStorage(() => AsyncStorage), 
}))