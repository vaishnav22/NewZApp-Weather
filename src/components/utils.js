export function getLocalTime(timestamp, timezone) {
    const date = new Date((timestamp + timezone) * 1000); 
    const temp = date.getHours();
    const previousHour = temp === 0 ? 23 : temp - 1;
    const formattedTime = `${previousHour < 10 ? '0' : ''}${previousHour}:${date.getMinutes()}`;

    // console.log(formattedTime);
 
    return formattedTime;
  }