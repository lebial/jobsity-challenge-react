import styled from 'styled-components';

import { boxShadow, navColor, screens } from 'Utils/globalStyles';

const CalendarCellContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 110px;
  background-color: ${(props) => props.isWeekend ? 'lightgray' : 'white'};
  font-weight: ${(props) => props.notFromCurrentMonth ? 'normal' : 'bold'};
  transition: all ease .3s;
  position: relative;
  display: flex;
  flex-direction: column;
  ${boxShadow}
  & .cell__header {
    width: 100%;
    background-color: ${navColor};
    color: white;
    margin-bottom: 5px;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  & .tags__container {
    width: 100%;
    max-height: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .tag {
      margin-bottom: 5px;
    }
  }
  @media(min-width: ${screens.lg}) {
    box-shadow: none;
    &:hover {
      ${boxShadow}
    }
    & .cell__header {
      color: #666;
      background-color: transparent;
      &__weekday {
        visibility: hidden;
      }
      &__weather-icon {
        visibility: hidden;
      }
    }
  }
`;

export default CalendarCellContainer;
