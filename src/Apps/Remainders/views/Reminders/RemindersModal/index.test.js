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
import ReminderModal from '.';

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

jest.mock('./api/cities', () => ({
  getCityByName: () => ([{
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
  }]),
}));

const initialState = {
  ModalReducer: {
    isOpen: true,
    modalType: 'Add',
    modalData: {},
  },
};

// eslint-disable-next-line
function ModalWrapper({store}) {
  return (
    <Provider store={store}>
      <div id="root">
        <ReminderModal />
      </div>
    </Provider>
  );
}

const setup = () => {
  const store = createStore(rootReducer, initialState);
  render(<ModalWrapper store={store} />);
  const heading = screen.getByRole('heading', { name: 'Add Reminder' });
  const submitButton = screen.getByRole('button', { name: 'Submit' });
  const dayInput = screen.getByTestId('dayPicker');
  const cityInput = screen.getByTestId('cityPicker');
  const reminderInput = screen.getByTestId('reminderInput');
  const timePicker = screen.getByTestId('timePicker');
  return {
    heading,
    submitButton,
    dayInput,
    reminderInput,
    cityInput,
    timePicker,
  };
};

afterEach(cleanup);

describe('Reminder Modal', () => {
  it('Renders Correctly', () => {
    const { heading } = setup();
    expect(heading).toBeInTheDocument();
  });

  it('has a submit button disabled if any value is empty', () => {
    const { submitButton, dayInput } = setup();
    userEvent.type(dayInput, '2');
    expect(submitButton).toBeDisabled();
  });

  it('is not able to enter more than 30 chars in reminder', () => {
    const { reminderInput } = setup();
    userEvent.type(reminderInput, 'a very long text for great testing');
    expect(reminderInput.placeholder).toBe('Max 30 chars');
    expect(reminderInput.value.length).not.toBeGreaterThan(30);
  });

  it('should have the ability to chose city', () => {
    const { cityInput } = setup();
    fireEvent.change(cityInput, {
      target: { value: 'Guadalajara' },
    });
    expect(cityInput.value).toBe('Guadalajara');
  });

  it('should have the submit button enabled once all data is filled', () => {
    const {
      cityInput,
      dayInput,
      timePicker,
      reminderInput,
      submitButton,
    } = setup();
    fireEvent.change(cityInput, {
      target: { value: 'Guadalajara' },
    });
    fireEvent.change(dayInput, {
      target: { value: 1 },
    });
    userEvent.type(timePicker, '11:00');
    userEvent.type(reminderInput, 'Buy Milk');
    expect(submitButton).not.toBeDisabled();
  });
});
