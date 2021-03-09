import axios from 'axios';

const geoDbUrl = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities?hateoasMode=false&offset=0&limit=7&namePrefix=';

async function getCityByName(name) {
  try {
    const response = await axios({
      url: `${geoDbUrl}${name}`,
    });
    const { data } = response.data;
    // const options = data.map((city) => ({
    //   value: JSON.stringify({
    //     city: `${city.name} ${city.countryCode}`,
    //     lat: city.latitude,
    //     lon: city.longitude,
    //   }),
    //   label: `${city.city} ${city.countryCode}`,
    // }));
    return data;
  } catch (error) {
    return [error];
  }
}

export default getCityByName;
