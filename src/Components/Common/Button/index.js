import React from 'react';
import PropTypes from 'prop-types';

import StyledButton from './styles';

function Button(props) {
  const {
    secondary,
    danger,
    onClick,
    text,
    classNames,
    name,
  } = props;
  return (
    <StyledButton
      secondary={secondary}
      danger={danger}
      onClick={onClick}
      className={classNames}
      name={name}
    >
      { text }
    </StyledButton>
  );
}

export default Button;

Button.defaultProps = {
  secondary: false,
  danger: false,
  text: '',
  classNames: '',
  name: '',
};

Button.propTypes = {
  secondary: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  name: PropTypes.string,
  classNames: PropTypes.string,
};
