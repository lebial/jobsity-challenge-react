import React from 'react';
import PropTypes from 'prop-types';

import { Tag } from 'Components/Common';
import CalendarCellContainer from './styles';

function CalendarCell({ day }) {
  return (
    <CalendarCellContainer>
      <div className="cell__header">
        { day.day }
        <p className="cell__header__weekday">{ day.weekDay }</p>
        <span className="cell__header__weather-icon" />
      </div>
      <div className="tags__container overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-gray-200">
        <Tag>work late</Tag>
        <Tag>work late</Tag>
        <Tag>work late</Tag>
        <Tag>work late</Tag>
        <Tag>work late</Tag>
      </div>
    </CalendarCellContainer>
  );
}

export default CalendarCell;

CalendarCell.propTypes = {
  day: PropTypes.shape({
    day: PropTypes.number,
    weekDay: PropTypes.string,
  }).isRequired,
};
