import React from 'react';
import PropTypes from 'prop-types';

function Tag({ children }) {
  return (
    <button type="button" className="tag rounded-full py-1 px-3 bg-indigo-400 focus:outline-none text-xs">
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
};
