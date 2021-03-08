import styled from 'styled-components';

import { navColor, boxShadow, screens } from 'Utils/globalStyles';

const CalendarContainer = styled.div`
  width: 90%;
  margin-bottom: 1rem;
  ${boxShadow}
  & .cal__body__header {
    display: flex;
    width: 100%;
    height: 2rem;
    background-color: ${navColor};
    text-align: center;
    color: white;
    & .header__item {
      border-right: 3px solid darkgray;
      flex: 1;
      &:last-of-type {
        border-right: none;
      }
    }
  }

  & .cal__body__content {
    width: 100%;
    height: 100%;
    max-height: auto;
    background-color: darkgray;
    display: grid;
    grid-gap: 3px;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 1fr;
  }
  
  @media(max-width: ${screens.lg}) {
    & .cal__body__header {
      display: none;
    }
    & .cal__body__content {
      height: auto;
      grid-template-columns: repeat(3, 1fr);
      background-color: white;
      grid-gap: 10px;
    }
  }

  @media(max-width: ${screens.sm}) {
    & .cal__body__content {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default CalendarContainer;
