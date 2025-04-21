import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import TheQuran from "@/assets/TheQuran.json";
import { I18nManager } from 'react-native';
import { useEffect } from "react";

export default function AyatPage() {
  const { id } = useLocalSearchParams();
  const surahId = parseInt(id as string);
  const surah = TheQuran.find((s) => s.surahNo === surahId);
  const ayat = surah?.arabic1.reduce((acc,cur,index)=>
     acc.concat(` ﴿${index}﴾ `).concat(cur)
);  
    const ayatWithLastIndex = ayat?.concat(` ﴿${surah?.arabic1.length}﴾ `)

  return (
    <View style={{ padding: 16 }} >
      <Text style={{ fontSize: 32, marginBottom: 12, fontFamily: "Uthmani",textAlign: "center" }}>
        {surah?.surahNameArabicLong}
      </Text>
      
            <FlatList 
                data={surah?.arabic1}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ index }) => (
                    <>
                        <Text style={{ fontSize: 24, fontFamily: 'Uthmani', textAlign:"justify", justifyContent: 'space-around' }}>{ayatWithLastIndex}</Text>
                        <Text style={{ textAlign: 'center' }}>({index + 1})</Text>
                    </>
                )}
            />
      {/* <Text style={{ fontSize: 24, fontFamily: 'Uthmani', textAlign:"justify", justifyContent: 'space-around' }}>{ayatWithLastIndex}</Text> */}
    </View>
  );
}
