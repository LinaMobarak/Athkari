
// types/quran.ts
export interface Ayah {
    number: number;
    text: string;
    numberInSurah: number;
    page: number;
}

export interface Surah {
    ayahs: Ayah[];
    number: number;
    name: string
    revelationType: string
}

export interface FullQuran {
    code: number;
    status: string;
    data: {
    surahs: Surah[];
    };
}
