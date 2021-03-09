import styled, { css } from 'styled-components';

import {
  primaryColor,
  secondaryColor,
  dangerColor,
  boxShadow,
} from 'Utils/globalStyles';

function getColorOnProps({ secondary, danger }) {
  if (secondary) return secondaryColor;
  if (danger) return dangerColor;
  return primaryColor;
}

const StyledButton = styled.button`
  ${({ secondary, danger }) => css`
    background-color: ${getColorOnProps({ secondary, danger })};
  `}
  ${({ customColor }) => customColor && css`
    background-color: ${customColor};
  `}
  border-radius: 7px;
  color: white;
  outline: none;
  transition: all .4s ease;
  font-weight: bold;
  &:hover {
    transform: translateY(-2px);
    ${css`${boxShadow}`}
  }
  &:active {
    transform: translateY(-1px);
  }
  &:disabled {
    cursor: 'not-allowed';
    background-color: lightgray;
  }
`;

export default StyledButton;
