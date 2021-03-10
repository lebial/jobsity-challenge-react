import monthOptions from 'Utils/calendarConstants';

function getMonthName(monthIndex) {
  if (monthIndex === -1) return 'December';
  if (monthIndex === 12) return 'January';
  return monthOptions.find((m) => m.value === monthIndex.toString()).innerText;
}

function calculateDateToDisplay(data) {
  // for handling change between years
  if (data.monthIndex === -1) {
    return {
      year: data.year - 1,
      monthIndex: 11,
      month: getMonthName(data.monthIndex),
    };
  }
  if (data.monthIndex === 12) {
    return {
      year: data.year + 1,
      monthIndex: 0,
      month: getMonthName(data.monthIndex),
    };
  }
  return {
    ...data,
    month: getMonthName(data.monthIndex),
  };
}

function createDateData(date) {
  return ({
    weekDay: date.toLocaleDateString('en-us', { weekday: 'long' }),
    day: date.getDate(),
    dayIndex: date.getDay(),
    month: date.toLocaleDateString('en-us', { month: 'long' }),
    monthIndex: date.getMonth(),
    year: date.getFullYear(),
    isWeekend: function checkWeekend() {
      return this.dayIndex === 0 || this.dayIndex === 6;
    },
  });
}

function processDays(date, dayObject, action = null) {
  const dayToProcess = { ...dayObject };
  const proccesedDays = [];
  // We will decide if we are calculating remaining days for current month
  // for previous month and next month days
  if (action === 'prev' || action === 'next') {
    for (
      let i = dayToProcess.dayIndex;
      action === 'prev' ? i > 0 : i < 6;
      action === 'prev' ? i -= 1 : i += 1
    ) {
      const dateData = createDateData(date);
      if (dateData.monthIndex !== dayToProcess.monthIndex) {
        dateData.notFromCurrentMonth = true;
      }
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
  const monthIndex = month;
  if (!year) currentYear = new Date().getFullYear();
  if (year) currentYear = year.toString();
  const date = new Date(currentYear, monthIndex, 1);
  const daysInMonth = processDays(date, {
    monthIndex: date.getMonth(),
  });
  return fillRemainingDays(daysInMonth);
}

function validateSameDay(reminder, currentDate) {
  if (
    reminder.day === currentDate.day
    && reminder.monthIndex === currentDate.monthIndex
    && reminder.year === currentDate.year
  ) return true;
  return false;
}

function validateNextTwoDays(reminder, currentDate) {
  if (
    (+reminder.day === +currentDate.day + 1 || +reminder.day === +currentDate.day + 2)
    && reminder.monthIndex === currentDate.monthIndex
    && reminder.year === currentDate.year
  ) return true;
  return false;
}

function reminderIsInWeatherRange(reminder, currentDate) {
  if (validateSameDay(reminder, currentDate)) return true;
  if (validateNextTwoDays(reminder, currentDate)) return true;
  return false;
}

export {
  getDaysInMonth as default,
  createDateData,
  calculateDateToDisplay,
  reminderIsInWeatherRange,
};
