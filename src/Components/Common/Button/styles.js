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
`;

export default StyledButton;
