const TOGGLE_MODAL = 'TOGGLE_MODAL ';
const RESET_MODAL = 'RESET_MODAL';
const SAVE_REMINDER_TO_EDIT = 'SAVE_REMINDER_TO_EDIT';

function toggleModal(data) {
  return {
    type: TOGGLE_MODAL,
    payload: data,
  };
}

function resetModal() {
  return {
    type: RESET_MODAL,
  };
}

function saveReminderToEdit(payload) {
  return {
    type: SAVE_REMINDER_TO_EDIT,
    payload,
  };
}

export {
  TOGGLE_MODAL,
  RESET_MODAL,
  SAVE_REMINDER_TO_EDIT,
  toggleModal,
  resetModal,
  saveReminderToEdit,
};
