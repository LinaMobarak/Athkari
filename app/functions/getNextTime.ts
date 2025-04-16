export function getTimeDiffInSeconds(nextPrayerTime: string): number {
    const [hours, minutes] = nextPrayerTime.split(":").map(Number);
    const now = new Date();
    const target = new Date();
  
    target.setHours(hours, minutes, 0, 0);
  
    // If the target time has already passed today, move it to tomorrow
    if (target < now) {
      target.setDate(target.getDate() + 1);
    }
  
    const diffInMs = target.getTime() - now.getTime();
    return Math.floor(diffInMs / 1000);
  }
  