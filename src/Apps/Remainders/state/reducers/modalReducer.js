import { createDateData } from 'Utils/dates';
import {
  RESET_MODAL,
  TOGGLE_MODAL,
  SAVE_REMINDER_TO_EDIT,
} from '../actions/modalActions';

const INITIAL_STATE = {
  isOpen: false,
  modalType: '',
  modalData: {},
  reminderToEdit: {},
  currentDateData: createDateData(new Date()),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isOpen: action.payload !== null ? action.payload.isOpen : !state.isOpen,
        modalData: action.payload.data,
        modalType: action.payload.modalType,
      };
    case SAVE_REMINDER_TO_EDIT:
      return {
        ...state,
        reminderToEdit: action.payload,
      };
    case RESET_MODAL:
      return INITIAL_STATE;
    default:
      return state;
  }
};
