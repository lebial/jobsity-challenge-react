import getDaysInMonth, { createDateData } from 'Utils/dates';
import {
  SUCCESS,
  NOT_STARTED,
} from 'Utils/defaultReducerStatus';

import { CHANGE_CURRENT_MONTH, GET_INITIAL_DATA } from '../actions/calendarActions';

function getNewMonth(state, newDate) {
  const existingMonth = (state.visitedMonths || {})[`${newDate.month}-${newDate.year}`];
  if (existingMonth) return { selectedMonth: existingMonth };
  const { month, monthIndex, year } = createDateData(new Date(newDate.year, newDate.monthIndex));
  const daysInMonth = getDaysInMonth(monthIndex, year);
  const selectedMonth = {
    month,
    monthIndex,
    year,
    daysInMonth,
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
    default:
      return state;
  }
};
