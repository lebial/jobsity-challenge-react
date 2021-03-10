import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';

import Dropdown from '.';

const options = [
  { innerText: 'test', value: '1' },
  { innerText: 'test2', value: '2' },
  { innerText: 'test3', value: '3' },
];
const defaultOption = { innerText: 'default', value: '0' };

const Wrapper = () => {
  const [selectedValue, setSelectedValue] = useState({});
  return (
    <Dropdown
      options={options}
      defaultOption={defaultOption}
      onChange={setSelectedValue}
      selectedOption={selectedValue}
      noDefaultOptionButton
    />
  );
};

beforeEach(() => {
  render(<Wrapper />);
});

afterEach(cleanup);

describe('Button', () => {
  it('should render correctly', () => {
    const button = screen.getByTestId('dropdownButton');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('dropdownValue')).toHaveTextContent('');
  });

  it('should change value when clicked', async () => {
    const dropdown = screen.getByTestId('dropdownButton');
    userEvent.click(dropdown);
    await waitFor(() => screen.getByTestId('dropdownBody'));
    const option = screen.getByRole('button', { name: /test2/i });
    userEvent.click(option);
    expect(screen.getByTestId('dropdownValue')).toHaveTextContent('test2');
  });
});
