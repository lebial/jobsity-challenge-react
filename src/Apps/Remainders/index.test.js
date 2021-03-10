import React from 'react';
import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from 'App/state/reducers';
import Reminders from '.';

jest.mock('react-modal', () => {
  // eslint-disable-next-line
  const ModalMock = require('TestHelpers/mockModal');
  return ModalMock.default;
});

jest.mock('react-select', () => {
  // eslint-disable-next-line
  const ReactSelectMock = require('TestHelpers/mockSelect');
  return ReactSelectMock.default;
});

jest.mock('react-select/async', () => {
  // eslint-disable-next-line
  const ReactAsyncSelectMock = require('TestHelpers/mockAsyncSelect');
  return ReactAsyncSelectMock.default;
});

jest.mock('react-time-picker', () => {
  // eslint-disable-next-line
  const TimePicker = require('TestHelpers/mockThirdPartyPicker');
  return TimePicker.default;
});

// eslint-disable-next-line
function RemindersWrapper({store}) {
  return (
    <Provider store={store}>
      <div id="root">
        <Reminders />
      </div>
    </Provider>
  );
}

const setup = () => {
  const store = createStore(rootReducer);
  render(<RemindersWrapper store={store} />);
};

afterEach(cleanup);

describe('Reminder App', () => {
  it('should be able to add a reminder', async () => {
    setup();
    const calendarCells = screen.getAllByTestId('calendarCell');
    userEvent.click(calendarCells[0]);

    await screen.findByTestId('modalWrapper');

    const cityInput = screen.getByTestId('cityPicker');
    const dayInput = screen.getByTestId('dayPicker');
    const timePicker = screen.getByTestId('timePicker');
    const reminderInput = screen.getByTestId('reminderInput');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(cityInput, {
      target: { value: 'Guadalajara' },
    });
    fireEvent.change(dayInput, {
      target: { value: 1 },
    });
    userEvent.type(timePicker, '11:00');
    userEvent.type(reminderInput, 'Buy Milk');
    userEvent.click(submitButton);
    const reminder = await screen.findByTestId('reminderTag');
    expect(reminder).toBeInTheDocument();
    expect(reminder).toHaveTextContent('Buy Milk');
  });
});
