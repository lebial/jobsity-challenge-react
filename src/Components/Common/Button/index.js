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
  } = props;
  return (
    <StyledButton
      secondary={secondary}
      danger={danger}
      onClick={onClick}
      className={classNames}
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
};

Button.propTypes = {
  secondary: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  classNames: PropTypes.string,
};
