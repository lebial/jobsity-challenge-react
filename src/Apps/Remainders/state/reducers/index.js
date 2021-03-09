import getDaysInMonth, { createDateData } from 'Utils/dates';
import {
  SUCCESS,
  NOT_STARTED,
} from 'Utils/defaultReducerStatus';

import {
  CHANGE_CURRENT_MONTH,
  GET_INITIAL_DATA,
  ADD_REMINDER,
  DELETE_REMINDER,
  DELETE_DAY_REMINDERS,
} from '../actions/calendarActions';

function getNewMonth(state, newDate) {
  // If the month that we try to access already exists, will not recreate it
  const existingMonth = state.visitedMonths[`${newDate.month}-${newDate.year}`];
  if (existingMonth) return { selectedMonth: existingMonth };
  // otherwise will track a new month
  const { month, monthIndex, year } = createDateData(new Date(newDate.year, newDate.monthIndex));
  const daysInMonth = getDaysInMonth(monthIndex, year);
  const selectedMonth = {
    month,
    monthIndex,
    year,
    daysInMonth,
    selector: `${month}-${year}`,
    reminders: {},
  };
  return {
    selectedMonth,
    visitedMonths: {
      ...state.visitedMonths,
      [`${month}-${year}`]: {
        ...selectedMonth,
      },
    },
  };
}

function removeSingleReminder(state, reminderData) {
  const {
    day,
    time,
    month,
    year,
    monthIndex,
  } = reminderData;
  if (state.selectedMonth.monthIndex === monthIndex) {
    const { [time]: removed, ...restReminders } = state.selectedMonth.reminders[`${day}`];
    return {
      ...state,
      selectedMonth: {
        ...state.selectedMonth,
        reminders: {
          ...state.selectedMonth.reminders,
          [day]: restReminders,
        },
      },
    };
  }

  const selector = `${month}-${year}`;
  const { [time]: gone, ...restReminders } = state.visitedMonths[selector].reminders[`${day}`];
  return {
    ...state,
    visitedMonths: {
      ...state.visitedMonths,
      [selector]: {
        ...state.visitedMonths[selector],
        reminders: {
          ...state.visitedMonths[selector].reminders,
          [day]: restReminders,
        },
      },
    },
  };
}

function removeAllreminders(state, dayToRemove) {
  const {
    day,
    month,
    year,
    monthIndex,
  } = dayToRemove;
  if (state.selectedMonth.monthIndex === monthIndex) {
    return {
      ...state,
      selectedMonth: {
        ...state.selectedMonth,
        reminders: {
          ...state.selectedMonth.reminders,
          [day]: {},
        },
      },
    };
  }
  const monthSelector = `${month}-${year}`;
  return {
    ...state,
    visitedMonths: {
      ...state.visitedMonths,
      [monthSelector]: {
        ...state.visitedMonths[monthSelector],
        reminders: {
          ...state.visitedMonths[monthSelector].reminders,
          [day]: {},
        },
      },
    },
  };
}

const INITIAL_STATE = getNewMonth({
  selectedMonth: {
    daysInMonth: [],
  },
  visitedMonths: {},
  status: NOT_STARTED,
  error: null,
}, {
  ...createDateData(new Date()),
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INITIAL_DATA:
    case CHANGE_CURRENT_MONTH:
      return {
        ...state,
        ...getNewMonth(state, action.payload),
        status: SUCCESS,
      };
    case ADD_REMINDER:
      return {
        ...state,
        selectedMonth: {
          ...state.selectedMonth,
          reminders: {
            ...state.selectedMonth.reminders,
            [action.payload.day]: {
              ...state.selectedMonth.reminders[action.payload.day],
              [action.payload.time]: action.payload,
            },
          },
        },
        visitedMonths: {
          ...state.visitedMonths,
          [state.selectedMonth.selector]: {
            ...state.selectedMonth,
            reminders: {
              ...state.selectedMonth.reminders,
              [action.payload.day]: {
                ...state.selectedMonth.reminders[action.payload.day],
                [action.payload.time]: action.payload,
              },
            },
          },
        },
      };
    case DELETE_REMINDER:
      return removeSingleReminder(state, action.payload);
    case DELETE_DAY_REMINDERS:
      return removeAllreminders(state, action.payload);
    default:
      return state;
  }
};
