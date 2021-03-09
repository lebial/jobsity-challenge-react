import React from 'react';

import withCalendarData from 'HOC/withCalendarData';
import MonthSelector from './views/MonthSelector';
import Calendar from './views/Calendar';
import RemindersModal from './views/Reminders/RemindersModal';

function Reminders() {
  const MonthSelectorWithData = withCalendarData(MonthSelector, 'selector');
  return (
    <div className="w-full h-full ">
      <RemindersModal />
      <MonthSelectorWithData />
      <Calendar />
    </div>
  );
}

export default Reminders;
