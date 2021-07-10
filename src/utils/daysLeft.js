//returns days left in week after the input day
const daysLeft = (day) => {
  const days = [];
  for (let i = day + 1; i <= 7; i++) {
      days.push(i);
  }
  return days;
};

export default daysLeft;