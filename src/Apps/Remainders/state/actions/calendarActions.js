const CHANGE_CURRENT_MONTH = 'CHANGE_CURRENT_MONTH';
const GET_INITIAL_DATA = 'GET_INITAL_DATA';
const ADD_REMINDER = 'ADD_REMINDER';
const DELETE_REMINDER = 'DELETE_REMINDER';

function getInitialData(date) {
  return {
    type: GET_INITIAL_DATA,
    payload: date,
  };
}

function changeCurrentMonth(date) {
  return {
    type: CHANGE_CURRENT_MONTH,
    payload: date,
  };
}

function addReminder(reminder) {
  return {
    type: ADD_REMINDER,
    payload: reminder,
  };
}

function deleteReminder(payload) {
  return {
    type: DELETE_REMINDER,
    payload,
  };
}

export {
  GET_INITIAL_DATA,
  CHANGE_CURRENT_MONTH,
  ADD_REMINDER,
  DELETE_REMINDER,
  getInitialData,
  changeCurrentMonth,
  addReminder,
  deleteReminder,
};
