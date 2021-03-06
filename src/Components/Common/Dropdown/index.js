import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function Dropdown({ options, onChange, defaultOption }) {
  const element = useRef();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleOutsideClick = (ev) => {
    if (!element.current.contains(ev.target)) {
      setOpen(false);
    }
  };

  const toggleDropdown = () => setOpen(!open);

  const handleOptionClick = (ev) => {
    const { name, value } = ev.currentTarget;
    ev.preventDefault();
    const selected = { innerText: name, value };
    setSelectedOption(selected);
    toggleDropdown();
    onChange(selected);
  };

  useEffect(() => {
    if (open) document.addEventListener('mousedown', handleOutsideClick);
    if (!open) document.removeEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  const optionClassName = 'focus:outline-none border-0 px-7 py-1 hover:bg-gray-300 w-full';

  const renderOptions = () => {
    if (!open) return null;

    const optionList = options.map(({ innerText, value }) => (
      <button
        key={value + innerText}
        data-testid="dropdownOption"
        type="button"
        className={`${optionClassName} ${selectedOption.value === value && 'bg-gray-300'}`}
        onClick={handleOptionClick}
        value={value}
        name={innerText}
      >
        { innerText }
      </button>
    ));

    return (
      <motion.div
        className={`
          flex flex-col items-center
          absolute top-9 left-1/2
          shadow-lg py-5 transform
          -translate-x-1/2 w-max
          max-h-48 overflow-y-scroll
          scrollbar-thin
          bg-white
          scrollbar-thumb-indigo-700 scrollbar-track-gray-200
        `}
        data-testid="dropdownBody"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        <button
          type="button"
          className={`${optionClassName} ${defaultOption.value === selectedOption.value && 'bg-gray-300'}`}
          onClick={handleOptionClick}
          value={defaultOption.value}
          name={defaultOption.innerText}
        >
          { defaultOption.innerText }
        </button>
        { optionList }
      </motion.div>
    );
  };

  return (
    <div ref={element} className="flex flex-col relative">
      <button
        className="focus:outline-none border-b border-indigo-800 flex items-center"
        data-testid="dropdownButton"
        type="button"
        onClick={toggleDropdown}
      >
        <p data-testid="dropdownValue">{ selectedOption.innerText }</p>
        {' '}
        <p className="font-bold ml-1">&#8595;</p>
      </button>
      { renderOptions()}
    </div>
  );
}

export default Dropdown;

Dropdown.defaultProps = {
  defaultOption: {
    innerText: 'Select an option',
    value: '0',
  },
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    innerText: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  defaultOption: PropTypes.shape({
    innerText: PropTypes.string,
    value: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};
