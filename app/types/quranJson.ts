export interface Ayah {
    sajda: boolean;
    numberInSurah?: number; // Optional if not present in all ayahs
    page?: number; // Optional if not present in all ayahs
    text?: string; // Optional if not present in all ayahs
}

export interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: "Meccan" | "Medinan";
    ayahs: Ayah[];
}

export interface Edition {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
}

export interface QuranData {
    surahs: Surah[];
    edition: Edition;
}

export interface FullQuran {
    code: number;
    status: string;
    data: QuranData;
}