export function getLocalTime(timestamp, timezone) {
    const date = new Date((timestamp + timezone) * 1000); 
    const temp = date.getHours();
    const previousHour = temp === 0 ? 23 : temp - 1;
    const formattedTime = `${previousHour < 10 ? '0' : ''}${previousHour}:${date.getMinutes()}`;

    // console.log(formattedTime);
 
    return formattedTime;
  }

export const formatReadableDate = (inputDate) =>
  new Date(inputDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });



