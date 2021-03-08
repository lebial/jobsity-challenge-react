import React from 'react';
import PropTypes from 'prop-types';

import CalendarBodyContainer from './styles';
import CalendarCell from '../CalendarCell';

function CalendarBody({ daysInMonth, currentMonthIndex }) {
  const renderCells = () => daysInMonth.map((day) => (
    <CalendarCell day={day} currentMonthIndex={currentMonthIndex} />
  ));

  return (
    <CalendarBodyContainer className=" lg:overflow-y-scroll lg:scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-gray-200">
      <div className="cal__body__header">
        <div className="header__item">
          Sunday
        </div>
        <div className="header__item">
          Monday
        </div>
        <div className="header__item">
          Tuesday
        </div>
        <div className="header__item">
          Wednesday
        </div>
        <div className="header__item">
          Thursday
        </div>
        <div className="header__item">
          Friday
        </div>
        <div className="header__item">
          Saturday
        </div>
      </div>
      <div className="cal__body__content">
        { renderCells()}
      </div>
    </CalendarBodyContainer>
  );
}

export default CalendarBody;

CalendarBody.propTypes = {
  daysInMonth: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentMonthIndex: PropTypes.number.isRequired,
};
