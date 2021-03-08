import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { toggleModal } from '../../../state/actions/modalActions';

// import { Tag } from 'Components/Common';
import CalendarCellContainer from './styles';

function CalendarCell({ day }) {
  const dispatch = useDispatch();
  const openModal = () => dispatch(toggleModal(true));
  return (
    <CalendarCellContainer
      isWeekend={day.isWeekend()}
      notFromCurrentMonth={day.notFromCurrentMonth}
      onClick={openModal}
    >
      <div className="cell__header">
        { day.day }
        <p className="cell__header__weekday">{ day.weekDay }</p>
        <span className="cell__header__weather-icon" />
      </div>
      <div className="tags__container overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-gray-200">
        {/* <Tag>work late</Tag>
        <Tag>work late</Tag> */}
      </div>
    </CalendarCellContainer>
  );
}

export default CalendarCell;

CalendarCell.propTypes = {
  day: PropTypes.shape({
    day: PropTypes.number,
    weekDay: PropTypes.string,
    isWeekend: PropTypes.func,
    notFromCurrentMonth: PropTypes.bool,
  }).isRequired,
};
