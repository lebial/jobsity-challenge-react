import { combineReducers } from 'redux';

import CalendarReducer from 'Apps/Remainders/state/reducers';
import ModalReducer from 'Apps/Remainders/state/reducers/modalReducer';

const rootReducer = combineReducers({ CalendarReducer, ModalReducer });

export default rootReducer;
