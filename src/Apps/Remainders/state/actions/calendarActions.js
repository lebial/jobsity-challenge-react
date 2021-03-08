const CHANGE_CURRENT_MONTH = 'CHANGE_CURRENT_MONTH';
const GET_INITIAL_DATA = 'GET_INITAL_DATA';

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

export {
  GET_INITIAL_DATA,
  CHANGE_CURRENT_MONTH,
  getInitialData,
  changeCurrentMonth,
};
