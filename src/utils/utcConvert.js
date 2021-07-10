
//converts days and hour to utc 0
const utcConvert = (days, hour) => {
  let newDays = [];
  let newHour = hour;
  const localOffset = (new Date().getTimezoneOffset() / 60) * -1;

  newHour -= localOffset;

  if (newHour >= 24) {
    newHour -= 24;
    newDays = days.map((day) => {
      if (day + 1 === 8) return 1;
      return day + 1;
    });
    return { days: newDays, hour: newHour };
  }

  if (newHour < 0) {
    newHour += 24;
    newDays = days.map((day) => {
      if (day - 1 === 0) return 7;
      return day - 1;
    });
    return { days: newDays, hour: newHour };
  }

  return { days: [...days], hour: newHour };
};

export default utcConvert;
