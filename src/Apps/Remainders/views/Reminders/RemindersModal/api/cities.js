import axios from 'axios';

const geoDbUrl = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities?hateoasMode=false&offset=0&limit=7&namePrefix=';

async function getCityByName(name) {
  try {
    const response = await axios({
      url: `${geoDbUrl}${name}`,
    });
    const { data } = response.data;
    return data;
  } catch (error) {
    return [error];
  }
}

export default getCityByName;
