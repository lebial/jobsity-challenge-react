import React from 'react';

import MonthSelector from './views/MonthSelector';
import Calendar from './views/Calendar';

function Remainders() {
  return (
    <main className="w-screen h-screen">
      <MonthSelector />
      <Calendar />
    </main>
  );
}

export default Remainders;
