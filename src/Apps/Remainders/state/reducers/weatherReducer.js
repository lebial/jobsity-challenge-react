import _ from 'lodash';
import {
  ERROR,
  SUCCESS,
  NOT_STARTED,
  LOADING,
} from 'Utils/defaultReducerStatus';

import { createDateData } from 'Utils/dates';

import {
  GET_WEATHER_DATA,
  SET_WEATHER_LOADING,
  SET_WEATHER_ERROR,
} from '../actions/weatherActions';

const INITIAL_STATE = {
  cities: {},
  status: NOT_STARTED,
  error: null,
};

function processWeatherData(weatherData) {
  return weatherData.hourly.reduce((acc, value) => {
    const date = new Date(value.dt * 1000);
    const { day, month, year } = createDateData(date);
    const hour = `0${date.getHours()}`.slice(-2);
    const monthSelector = `${month}-${year}`;
    acc[monthSelector] = {
      ...acc[monthSelector],
      [day]: {
        ..._.get(acc, `${monthSelector}.${day}`, {}),
        [hour]: value.weather,
      },
    };
    return acc;
  }, {});
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_WEATHER_DATA:
      return {
        ...state,
        cities: {
          ...state.cities,
          [action.payload.city]: processWeatherData(action.payload),
        },
        status: SUCCESS,
      };
    case SET_WEATHER_LOADING:
      return {
        ...state,
        status: LOADING,
      };
    case SET_WEATHER_ERROR:
      return {
        ...state,
        status: ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};
