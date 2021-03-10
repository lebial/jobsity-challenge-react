import React from 'react';
import PropTypes from 'prop-types';

function Input({
  onChange,
  type,
  labelText,
  ...rest
}) {
  return (
    <div className="flex-1">
      <span>{labelText}</span>
      <input
        className="w-full border-b-2 border-indigo-700"
        type={type}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

export default Input;

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};
