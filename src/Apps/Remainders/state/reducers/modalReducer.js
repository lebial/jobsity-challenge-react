import { TOGGLE_MODAL } from '../actions/modalActions';

const INITIAL_STATE = {
  isOpen: false,
  modalType: 'Add',
  modalData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isOpen: action.payload !== null ? action.payload : !state.isOpen,
      };
    default:
      return state;
  }
};
