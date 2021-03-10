import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { calculateDateToDisplay } from 'Utils/dates';
import monthOptions from 'Utils/calendarConstants';
import { Button, Dropdown } from 'Components/Common';
import { changeCurrentMonth } from '../../state/actions/calendarActions';

function MonthSelector({ defaultOption, selectedYear }) {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState(defaultOption);

  const handleChange = (selected) => dispatch(changeCurrentMonth({
    year: selectedYear,
    monthIndex: selected.value,
    month: selected.innerText,
  }));

  const handleClick = (e) => {
    const { value: monthIndex } = defaultOption;
    const { name } = e.currentTarget;
    e.preventDefault();
    let newMonthIndex;
    if (name === 'prevMonth') newMonthIndex = +monthIndex - 1;
    if (name === 'nextMonth') newMonthIndex = +monthIndex + 1;
    return dispatch(changeCurrentMonth(calculateDateToDisplay({
      year: selectedYear,
      monthIndex: newMonthIndex,
    })));
  };

  useEffect(() => {
    setSelectedMonth(defaultOption);
  }, [defaultOption]);

  const classNames = 'p-2 text-xs md:text-base';

  return (
    <section className="flex justify-center items-center w-full mt-3" data-testid="monthSelectorContainer">
      <div className="h-full flex justify-center items-center">
        <Button
          onClick={handleClick}
          text="&#129044;"
          name="prevMonth"
          classNames={`mr-4 ${classNames}`}
        />
        <Dropdown
          onChange={handleChange}
          options={monthOptions}
          selectedOption={selectedMonth}
          noDefaultOptionButton
        />
        <p className="ml-2">{selectedYear}</p>
        <Button
          onClick={handleClick}
          text="&#129046;"
          name="nextMonth"
          classNames={`ml-4 ${classNames}`}
        />
      </div>
    </section>
  );
}

export default MonthSelector;

MonthSelector.propTypes = {
  defaultOption: PropTypes.shape({
    value: PropTypes.string,
  }).isRequired,
  selectedYear: PropTypes.number.isRequired,
};
