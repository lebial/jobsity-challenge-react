import React, { useState } from 'react';
import Modal from 'react-modal';
import { BlockPicker } from 'react-color';
import TimePicker from 'react-time-picker';
import { useSelector, useDispatch } from 'react-redux';

import { Input } from 'Components/Common';
import { toggleModal } from '../../../state/actions/modalActions';

Modal.setAppElement('#root');

function RemindersModal() {
  const modalData = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(toggleModal(false));
  const [inputsData, setInputsData] = useState({
    day: '',
    month: '',
    year: '',
  });

  const handleInputChange = (e) => {
    setInputsData({
      ...inputsData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  console.log(inputsData);
  const inputList = Object.keys(inputsData).map((key) => (
    <Input
      key={key}
      onChange={handleInputChange}
      placeHolder={key}
      labelText={key}
      name={key}
      value={inputsData[key]}
    />
  ));

  return (
    <Modal
      isOpen={modalData.isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.7)',
        },
        content: {
          backgroundColor: 'transparent',
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
      <div className="w-full lg:w-3/4 h-full bg-white">
        <div className="flex justify-center">
          <h2 className="text-lg lg:text-3xl font-bold mt-4">
            {modalData.modalType}
            {' '}
            Reminder
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly px-8 md:px-0 my-5">
          {inputList}
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly px-8 md:px-0 my-5">
          <div>
            <p>Pick a time</p>
            <TimePicker disableClock onChange={handleInputChange} value={inputsData.time} />
          </div>
          <div><BlockPicker /></div>
        </div>
      </div>
    </Modal>
  );
}

export default RemindersModal;
