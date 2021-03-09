import React from 'react';
import PropTypes from 'prop-types';

function Tag({ children, customColor, ...rest }) {
  return (
    <button
      type="button"
      style={{ backgroundColor: customColor }}
      className="tag rounded-full py-1 px-3 focus:outline-none text-xs text-white"
      {...rest}
    >
      {children}
    </button>
  );
}

export default Tag;

Tag.defaultProps = {
  children: 'test',
};

Tag.propTypes = {
  children: PropTypes.element,
  customColor: PropTypes.string.isRequired,
};
