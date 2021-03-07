function createDateData(date) {
  return ({
    weekDay: date.toLocaleDateString('en-us', { weekday: 'long' }),
    day: date.getDate(),
    dayIndex: date.getDay(),
    month: date.toLocaleDateString('en-us', { month: 'long' }),
    monthIndex: date.getMonth(),
    year: date.getFullYear(),
  });
}

function processDays(date, dayObject, action = null) {
  const dayToProcess = { ...dayObject };
  const proccesedDays = [];
  // We will decide if we are calculating remaining days for current month
  // for previous month and next month days
  if (action === 'prev' || action === 'next') {
    for (
      let i = action === 'prev' ? dayToProcess.dayIndex : 0;
      action === 'prev' ? i > 0 : i < dayToProcess.dayIndex;
      action === 'prev' ? i -= 1 : i += 1
    ) {
      const dateData = createDateData(date);
      if (action === 'prev') {
        proccesedDays.unshift(dateData);
        date.setDate(date.getDate() - 1);
      } else {
        proccesedDays.push(dateData);
        date.setDate(date.getDate() + 1);
      }
    }
    return proccesedDays;
  }
  // If we are not calculating the prev and next month days
  // We'll get current month days
  while (date.getMonth().toString() === dayToProcess.monthIndex.toString()) {
    const dateData = createDateData(date);
    proccesedDays.push(dateData);
    date.setDate(date.getDate() + 1);
  }
  return proccesedDays;
}

function fillRemainingDays(daysInMonth) {
  const { 0: firstDay, [daysInMonth.length - 1]: lastDay } = daysInMonth;
  const prevMonthDate = new Date(firstDay.year, firstDay.monthIndex, 0);
  const nextMonthDate = new Date(lastDay.year, lastDay.monthIndex + 1, 1);
  let prevDays = [];
  let nextDays = [];
  if (firstDay.dayIndex) prevDays = processDays(prevMonthDate, firstDay, 'prev');
  if (lastDay.dayIndex < 6) nextDays = processDays(nextMonthDate, lastDay, 'next');
  return [...prevDays, ...daysInMonth, ...nextDays];
}

function getDaysInMonth(month, year = null) {
  let currentYear = null;
  const monthIndex = month - 1;
  if (!year) currentYear = new Date().getFullYear();
  if (year) currentYear = year.ToString();
  const date = new Date(currentYear, monthIndex, 1);
  const daysInMonth = processDays(date, {
    monthIndex: date.getMonth(),
  });
  return fillRemainingDays(daysInMonth);
}

export default getDaysInMonth;
