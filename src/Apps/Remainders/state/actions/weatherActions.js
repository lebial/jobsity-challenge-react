import getCurrentWeather from '../../views/Reminders/RemindersModal/api/weather';

const GET_WEATHER_DATA = 'GET_WEATHER_DATA';
const SET_WEATHER_LOADING = 'SET_WEATHER_LOADING';
const SET_WEATHER_ERROR = 'SET_WEATHER_ERROR';

function getWeatherDataSuccess(payload) {
  return {
    type: GET_WEATHER_DATA,
    payload,
  };
}

function errorResponse(payload) {
  return {
    type: SET_WEATHER_ERROR,
    payload,
  };
}

function setStatusLoading() {
  return {
    type: SET_WEATHER_LOADING,
  };
}

function getWeatherData(payload) {
  return async (dispatch) => {
    try {
      const { lat, lon, city } = payload;
      dispatch(setStatusLoading());
      const data = await getCurrentWeather({ lat, lon });
      dispatch(getWeatherDataSuccess({ ...data, city }));
    } catch (error) {
      dispatch(errorResponse(error));
    }
  };
}

export {
  GET_WEATHER_DATA,
  SET_WEATHER_LOADING,
  SET_WEATHER_ERROR,
  getWeatherData,
};
