import axios from 'axios';

async function getCurrentWeather({ lat, lon }) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&exclude=minutely,daily,current`;
  try {
    const response = await axios({
      url,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export default getCurrentWeather;
