import useNamesOfAllahStore from '@/app/stores/namesOfAllah-store'


export const getHijriDateInArabic = async (date: Date) => {
    try {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
      const year = date.getFullYear();

      const Date = `${day}-${month}-${year}`;
      const response = await fetch(
        `https://api.aladhan.com/v1/gToH?date=${Date}`
      );
      const json = await response.json();
      const hijri = json.data.hijri;
      useNamesOfAllahStore.setState({hijriDate: (`${hijri.day} ${hijri.month.ar} ${hijri.year}`)});
    } catch (error) {
      console.error("Error fetching Hijri date in Arabic:", error);
    }
  };