import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

function withCalendarData(Component, option) {
  const InnerFunction = ({ calendarData, ...rest }) => {
    if (option === 'calendar') {
      const { daysInMonth, monthIndex, reminders } = calendarData.selectedMonth;
      return (
        <Component
          reminders={reminders}
          daysInMonth={daysInMonth}
          currentMonthIndex={monthIndex}
          {...rest}
        />
      );
    }

    if (option === 'selector') {
      const { monthIndex, month, year } = calendarData?.selectedMonth;
      const defaultOption = { value: (monthIndex || 0).toString(), innerText: month };
      return (<Component defaultOption={defaultOption} selectedYear={year} />);
    }

    return (<Component />);
  };

  InnerFunction.propTypes = {
    calendarData: PropTypes.shape({
      selectedMonth: PropTypes.shape({
        daysInMonth: PropTypes.shape([]),
        monthIndex: PropTypes.number,
        month: PropTypes.string,
        year: PropTypes.number,
        reminders: PropTypes.shape({}),
      }),
    }).isRequired,
  };

  return InnerFunction;
}

const mapStatetoProps = (state) => ({
  calendarData: state.CalendarReducer,
});

const composedWithCalendarData = compose(
  connect(mapStatetoProps, null),
  withCalendarData,
);

export default composedWithCalendarData;
