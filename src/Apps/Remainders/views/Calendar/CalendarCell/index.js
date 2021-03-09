import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Tag } from 'Components/Common';
import { ReactComponent as DeleteIcon } from 'Assets/trashIcon.svg';
import CalendarCellContainer from './styles';
import { toggleModal } from '../../../state/actions/modalActions';
import { deleteReminder, deleteDayReminders } from '../../../state/actions/calendarActions';

function CalendarCell({ day }) {
  const dispatch = useDispatch();
  const openModal = () => {
    if (day.notFromCurrentMonth) return null;
    return dispatch(toggleModal({
      isOpen: true,
      data: { reminderData: day },
      modalType: 'Add',
    }));
  };

  const toggleEditModal = (reminderData) => dispatch(toggleModal({
    isOpen: true,
    modalType: 'Edit',
    data: {
      reminderData,
      dayData: day,
    },
  }));

  const handleSingleDelete = (reminderData) => dispatch(deleteReminder({
    day: day.day,
    time: reminderData.time,
    month: day.month,
    year: day.year,
    monthIndex: day.monthIndex,
  }));

  const handleDeleteAll = (e) => {
    e.stopPropagation();
    dispatch(deleteDayReminders(day));
  };

  const renderTags = () => day.reminders.map((reminder) => (
    <Tag
      key={reminder.time}
      onClick={(e) => {
        e.stopPropagation();
        toggleEditModal(reminder);
      }}
      customColor={reminder.color}
    >
      <span className="">
        <button
          type="button"
          className="mr-2 focus:outline-none shadow-md bg-white text-black rounded-full h-4 w-4"
          onClick={(e) => {
            e.stopPropagation();
            handleSingleDelete(reminder);
          }}
        >
          X
        </button>
      </span>
      {reminder.weather && (
        <span>
          <img
            className="inline mr-1 w-7 h-7"
            alt="weather"
            src={`https://openweathermap.org/img/w/${reminder.weather.icon}.png`}
          />
        </span>
      )}
      <span>{reminder.reminder}</span>
      {' '}
      <span>{reminder.time}</span>
    </Tag>
  ));

  const renderDeleteAllButton = () => {
    if (day.reminders.length) {
      return (
        <button type="button" className="mt-0.5" onClick={handleDeleteAll}>
          <DeleteIcon
            className="h-4 w-4 fill-current text-pink-500"
          />
        </button>
      );
    }
    return null;
  };

  return (
    <CalendarCellContainer
      isWeekend={day.isWeekend()}
      notFromCurrentMonth={day.notFromCurrentMonth}
      onClick={openModal}
    >
      <div className="cell__header">
        { day.day }
        <p className="cell__header__weekday">{ day.weekDay }</p>
        <span className="cell__header__icon">
          {renderDeleteAllButton()}
        </span>
      </div>
      <div className="tags__container overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-gray-200">
        {renderTags()}
      </div>
    </CalendarCellContainer>
  );
}

export default CalendarCell;

CalendarCell.propTypes = {
  day: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.string,
    year: PropTypes.number,
    weekDay: PropTypes.string,
    monthIndex: PropTypes.number,
    isWeekend: PropTypes.func,
    notFromCurrentMonth: PropTypes.bool,
    reminders: PropTypes.shape([]),
  }).isRequired,
};
