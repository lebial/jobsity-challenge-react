import React from 'react';

import withCalendarData from 'HOC/withCalendarData';
import MonthSelector from './views/MonthSelector';
import Calendar from './views/Calendar';

function Reminders() {
  const MonthSelectorWithData = withCalendarData(MonthSelector, 'selector');
  return (
    <div className="w-full h-full ">
      <MonthSelectorWithData />
      <Calendar />
    </div>
  );
}

export default Reminders;
