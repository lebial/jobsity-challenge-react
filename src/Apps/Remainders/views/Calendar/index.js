import React, { useState, useEffect } from 'react';

import getDaysInMonth from 'Utils/dates';
import CalendarBody from '../CalendarBody';

function Calendar() {
  const [daysInMonth, setDaysInMonth] = useState([]);
  useEffect(() => {
    setDaysInMonth(getDaysInMonth('3'));
  }, []);
  return (
    <section data-testid="calendarContainer" className="flex justify-center w-full h-full mt-8">
      <CalendarBody daysInMonth={daysInMonth} />
    </section>
  );
}

export default Calendar;
