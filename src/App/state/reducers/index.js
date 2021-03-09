import { combineReducers } from 'redux';

import CalendarReducer from 'Apps/Remainders/state/reducers';
import ModalReducer from 'Apps/Remainders/state/reducers/modalReducer';
import WeatherReducer from 'Apps/Remainders/state/reducers/weatherReducer';

const rootReducer = combineReducers({
  CalendarReducer,
  ModalReducer,
  WeatherReducer,
});

export default rootReducer;
