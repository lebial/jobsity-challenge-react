/* eslint-disable */
import React from 'react';

function SelectMock({
  options,
  value,
  onChange,
  ...rest
}) {
  const handleChange = (ev) => {
    onChange({day: ev.currentTarget.value});
  };
  return (
    <select
      data-testid="modalSelect"
      value={value}
      onChange={handleChange}
      {...rest}
    >
      {
        options.map(({ day }) => (
          <option key={day} value={day} data-testid="day-option">
            { day }
          </option>
        ))
      }
    </select>
  );
}

export default SelectMock;
