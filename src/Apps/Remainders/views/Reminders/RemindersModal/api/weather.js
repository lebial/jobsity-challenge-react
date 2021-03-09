import axios from 'axios';

async function getCurrentWeather({ lat, lon }) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=eee38a1e5b91b32d51fba50608a5a8c4&exclude=minutely,daily,current`;
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
