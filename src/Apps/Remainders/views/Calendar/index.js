import React from 'react';

import withCalendarData from 'HOC/withCalendarData';
import CalendarBody from './CalendarBody';

function Calendar() {
  const CalendarBodyWithData = withCalendarData(CalendarBody, 'calendar');
  return (
    <section data-testid="calendarContainer" className="flex justify-center w-full h-full mt-8">
      <CalendarBodyWithData />
    </section>
  );
}

export default Calendar;
