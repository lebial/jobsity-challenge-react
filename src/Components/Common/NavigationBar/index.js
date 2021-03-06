import React from 'react';

function NavigationBar() {
  // Just a regular nav bar
  return (
    <nav className={`
        flex
        items-center
        w-screen
        bg-indigo-500
        text-white
        px-5
        font-bold
        h-16
      `}
    >
      <span>Remainders App</span>
    </nav>
  );
}

export default NavigationBar;
