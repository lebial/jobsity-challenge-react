import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import CalendarBodyContainer from './styles';
import CalendarCell from '../CalendarCell';

function CalendarBody({ daysInMonth, currentMonthIndex, reminders }) {
  const weatherReducer = useSelector((state) => state.WeatherReducer);
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = (reminder, day) => {
    const { city, regionCode, countryCode } = reminder.city;
    const cityNameSelector = `${city} ${regionCode} ${countryCode}`;
    const weatherMonth = weatherReducer.cities[cityNameSelector];
    if (!weatherMonth) return null;
    const { month, year } = day;
    const [hours] = reminder.time.split(':');
    const dayHours = weatherMonth[`${month}-${year}`][day.day];
    const [weather] = _.get(dayHours, `${hours}`, []);
    return weather;
  };

  const renderCells = () => daysInMonth.map((day) => {
    if (day.notFromCurrentMonth) {
      return (
        <CalendarCell
          key={day.day + day.month}
          day={{ ...day, reminders: [] }}
          currentMonthIndex={currentMonthIndex}
        />
      );
    }

    let dayReminders = reminders[day.day];
    if (dayReminders) {
      dayReminders = Object.values(dayReminders).sort((a, b) => (
        a.time.localeCompare(b.time)
      ));
      dayReminders = dayReminders.map((reminder) => ({
        ...reminder,
        weather: getWeatherData(reminder, day),
      }));
    } else {
      dayReminders = [];
    }
    const dayWithReminders = { ...day, reminders: dayReminders };
    return (
      <CalendarCell
        key={day.day + day.month}
        day={dayWithReminders}
        currentMonthIndex={currentMonthIndex}
        weather={weatherData}
      />
    );
  });

  useEffect(() => {
    setWeatherData(weatherReducer);
  }, [weatherReducer]);

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
  reminders: PropTypes.shape({}).isRequired,
};
