const TOGGLE_MODAL = 'TOGGLE_MODAL ';

function toggleModal(toggle = null) {
  return {
    type: TOGGLE_MODAL,
    payload: toggle,
  };
}

export {
  TOGGLE_MODAL,
  toggleModal,
};
