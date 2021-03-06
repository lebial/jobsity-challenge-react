import React from 'react';

import { Button, Dropdown } from 'Components/Common';

// Remove --------
const options = [
  { value: '1', innerText: 'Enero' },
  { value: '2', innerText: 'Febrero' },
  { value: '3', innerText: 'Marzo' },
  { value: '4', innerText: 'Abril' },
  { value: '5', innerText: 'Mayo' },
];

function MonthSelector() {
  const handleChange = (selected) => console.log(selected); // TO DO
  const handleClick = () => console.log('test');
  const classNames = 'p-2 text-xs md:text-base';
  return (
    <section className="flex justify-center items-center w-full mt-3" data-testid="monthSelectorContainer">
      <div className="h-full flex justify-center items-center">
        <Button onClick={handleClick} text="prev month" classNames={`mr-4 ${classNames}`} />
        <Dropdown onChange={handleChange} options={options} />
        <Button onClick={handleClick} text="next month" classNames={`ml-4 ${classNames}`} />
      </div>
    </section>
  );
}

export default MonthSelector;
