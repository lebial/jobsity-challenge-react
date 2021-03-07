import React from 'react';

import MonthSelector from './views/MonthSelector';
import Calendar from './views/Calendar';

function Remainders() {
  return (
    <div className="w-full h-full">
      <MonthSelector />
      <Calendar />
    </div>
  );
}

export default Remainders;
