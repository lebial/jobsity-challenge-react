/* eslint-disable */
import React from 'react';

function MockDatePicker({ onChange, value }) {
  const handleChange = (e) => {
    onChange(e.currentTarget.value);
  }
  return (
    <input type="text" onChange={handleChange} value={value} data-testid="timePicker"/>
  );
}

export default MockDatePicker;
