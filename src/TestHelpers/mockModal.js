/* eslint-disable */
import React from 'react';

function ModalMock({ isOpen, children }) {
  return (
    <div id="root" data-testid="modalWrapper">
      { isOpen && children }
    </div>
  );
}

export default ModalMock;
