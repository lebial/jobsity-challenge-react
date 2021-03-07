import React from 'react';
import PropTypes from 'prop-types';

import CalendarBodyContainer from './styles';

function CalendarBody({ daysInMonth }) {
  const renderCells = () => daysInMonth.map((day) => (<div className="cal__body__cell bg-white">{day.day}</div>));

  return (
    <CalendarBodyContainer>
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
          Wendsday
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
};
