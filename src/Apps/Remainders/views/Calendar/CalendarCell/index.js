import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Tag } from 'Components/Common';
import CalendarCellContainer from './styles';
import { toggleModal } from '../../../state/actions/modalActions';

function CalendarCell({ day }) {
  const dispatch = useDispatch();
  const weatherReducer = useSelector((state) => state.WeatherReducer);
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

  const getWeatherData = (reminder) => {
    const { city, regionCode, countryCode } = reminder.city;
    const cityNameSelector = `${city} ${regionCode} ${countryCode}`;
    const weatherMonth = weatherReducer.cities[cityNameSelector];
    if (!weatherMonth) return null;
    const { month, year } = day;
    const [hours] = reminder.time.split(':');
    debugger;
    const dayHours = weatherMonth[`${month}-${year}`][day.day];
    const [weatherData] = dayHours[hours];
    return weatherData;
  };

  const renderTags = () => day.reminders.map((reminder) => {
    const weatherData = getWeatherData(reminder);
    console.log(weatherData);
    return (
      <Tag
        onClick={(e) => {
          e.stopPropagation();
          toggleEditModal(reminder);
        }}
        customColor={reminder.color}
      >
        <span>{reminder.reminder}</span>
        {' '}
        <span>{reminder.time}</span>
      </Tag>
    );
  });

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
    isWeekend: PropTypes.func,
    notFromCurrentMonth: PropTypes.bool,
    reminders: PropTypes.shape([]),
  }).isRequired,
};
