/* eslint-disable */
import React from 'react';

function SelectAsyncMock({
  loadOptions,
  value,
  onChange,
  ...rest
}) {
  const option = {
    city: 'Guadalajara',
    country: 'Mexico',
    countryCode: 'MX',
    id: 78657,
    latitude: 20.676666666,
    longitude: -103.3475,
    name: 'Guadalajara',
    region: 'Jalisco',
    regionCode: 'JAL',
    type: 'CITY',
    wikiDataId: 'Q9022',
  };
  const handleChange = () => {
    onChange(option);
  };
  return (
    // eslint-disable-next-line
    <select
      data-testid="asyncSelect"
      value={value}
      onChange={handleChange}
      {...rest}
    >
      <option key={option.id} value={option.city} data-testid="cityOption">
        {`${option.city} ${option.regionCode} `}
      </option>
    </select>
  );
}

export default SelectAsyncMock;
