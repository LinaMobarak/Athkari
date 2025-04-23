export function getTimeDiffInSeconds(nextPrayerTime: string): number {
    const [hours, minutes] = nextPrayerTime.split(":").map(Number);
    const now = new Date();
    const target = new Date();
  
    target.setHours(hours, minutes, 0, 0);

    console.log('target : ',target)
    // if (target < now) {
    //   target.setDate(target.getDate() + 1);
    // }
  
    const diffInMs = target.getTime() - now.getTime();
    console.log('diffInMs : ', Math.floor(diffInMs / 1000));
    
    return Math.floor(diffInMs / 1000);
  }
  