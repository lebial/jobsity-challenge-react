import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AsyncSelect from 'react-select/async';
import { BlockPicker } from 'react-color';
import TimePicker from 'react-time-picker';
import { useSelector, useDispatch } from 'react-redux';

import withCalendarData from 'HOC/withCalendarData';
import isSomeValueEmpty from 'Utils/remindersValidator';
import { primaryColor } from 'Utils/globalStyles';
import { reminderIsInWeatherRange } from 'Utils/dates';
import { Input, Button } from 'Components/Common';
import MonthSelector from '../../MonthSelector';

import { resetModal } from '../../../state/actions/modalActions';
import { addReminder, deleteReminder } from '../../../state/actions/calendarActions';
import { getWeatherData } from '../../../state/actions/weatherActions';
import getCityByName from './api/cities';

Modal.setAppElement('#root');

function RemindersModal() {
  const modalReducer = useSelector((state) => state.ModalReducer);
  const calendarReducer = useSelector((state) => state.CalendarReducer);
  const { selectedMonth } = calendarReducer;
  const { modalData, currentDateData } = modalReducer;
  const { reminderData } = modalData;
  const dispatch = useDispatch();
  const closeModal = () => dispatch(resetModal());
  const [showColorPicker, setShowColorPicker] = useState(false);
  const toggleColorPicker = () => setShowColorPicker(!showColorPicker);

  const [inputsData, setInputsData] = useState({
    day: '',
    time: '',
    color: primaryColor,
    reminder: '',
  });

  const validateValues = () => isSomeValueEmpty(Object.values({ ...inputsData }));

  const handleInputChangeByName = (e, name = null) => {
    setInputsData({
      ...inputsData,
      [name || e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleCityChange = (value) => setInputsData({
    ...inputsData,
    city: value,
  });

  const handleTimeChange = (time) => setInputsData({
    ...inputsData,
    time,
  });

  const handleColorChange = (color) => setInputsData({
    ...inputsData,
    color: color.hex,
  });

  const handleSubmit = () => {
    if (modalReducer.modalType === 'Edit') {
      const newReminderData = {
        day: reminderData.day,
        time: reminderData.time,
        month: modalData.dayData.month,
        year: modalData.dayData.year,
        monthIndex: modalData.dayData.monthIndex,
      };
      dispatch(deleteReminder(newReminderData));
    }

    if (reminderIsInWeatherRange({
      day: inputsData.day,
      time: inputsData.time,
      month: selectedMonth.month,
      year: selectedMonth.year,
      monthIndex: selectedMonth.monthIndex,
    }, currentDateData)) {
      const { latitude: lat, longitude: lon } = inputsData.city;
      const cityName = `${inputsData.city.city} ${inputsData.city.regionCode} ${inputsData.city.countryCode}`;
      dispatch(getWeatherData({ lat, lon, city: cityName }));
    }

    dispatch(addReminder({
      ...inputsData,
    }));
    setShowColorPicker(false);
    dispatch(resetModal());
  };

  const renderColorPicker = () => {
    if (showColorPicker) {
      return (
        <div className="absolute top-12 -left-3">
          <button
            className="absolute z-50 left-3 focus:outline-none bg-transparent text-white font-bold"
            type="button"
            onClick={toggleColorPicker}
          >
            x
          </button>
          <BlockPicker color={inputsData.color} onChangeComplete={handleColorChange} />
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    setInputsData({
      day: reminderData?.day || '',
      time: reminderData?.time || '',
      color: reminderData?.color || primaryColor,
      reminder: reminderData?.reminder || '',
      city: reminderData?.city || '',
    });
  }, [modalReducer.modalType, modalData]);

  const MonthSelectorWithData = withCalendarData(MonthSelector, 'selector');
  return (
    <Modal
      isOpen={modalReducer.isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.7)',
        },
        content: {
          backgroundColor: 'transparent',
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
      <div className="relative w-full lg:w-3/4 h-full bg-white overflow-y-scroll scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-indigo-700">
        <div className="absolute top-3 left-3">
          <button
            className="absolute z-50 left-3 focus:outline-none bg-transparent text-black font-bold text-2xl"
            type="button"
            onClick={closeModal}
          >
            x
          </button>
        </div>
        <div className="flex justify-center">
          <h2 className="text-lg lg:text-3xl font-bold mt-4">
            {modalReducer.modalType}
            {' '}
            Reminder
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly px-8 md:px-0 my-5">
          <div>
            <Input
              onChange={handleInputChangeByName}
              placeholder="Day"
              labelText="Day"
              name="day"
              value={inputsData.day}
            />
          </div>
          <div>
            <MonthSelectorWithData />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly px-8 md:px-0 my-5 items-center">
          <div className="mb-3 w-full md:w-1/5">
            <p className="ml-1">City</p>
            <AsyncSelect
              DefaultOptions
              getOptionLabel={(e) => `${e.city} ${e.regionCode} ${e.countryCode}`}
              getOptionValue={(e) => e.id}
              cacheOptions
              value={inputsData.city || null}
              loadOptions={getCityByName}
              onChange={handleCityChange}
            />
          </div>
          <div className=" mb-3">
            <p>Pick time</p>
            <TimePicker disableClock onChange={handleTimeChange} value={inputsData.time} />
          </div>
          <div className="relative mb-3">
            <Button
              onClick={toggleColorPicker}
              customColor={inputsData.color}
              classNames=" px-4 py-2"
              text="choose a color"
            />
            {renderColorPicker()}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly px-8 md:px-0 my-5 items-center">
          <div className="mb-3">
            <Input
              onChange={handleInputChangeByName}
              placeholder="Reminder"
              labelText="Reminder"
              name="reminder"
              maxLength="30"
              value={inputsData.reminder}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly px-8 md:px-0 my-5 items-center">
          <div className="mb-3">
            <Button
              onClick={handleSubmit}
              classNames="px-4 py-2"
              text="Submit"
              secondary
              disabled={validateValues()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default RemindersModal;
