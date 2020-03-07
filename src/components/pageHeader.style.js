import styled from 'styled-components';
import { palette } from 'styled-theme';
const ComponentTitleWrapper = styled.h1`
  font-size: 19px;
  font-weight: 500;
  background-color: ${palette('secondary', 0)};
  padding: 5px 0;
  min-height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  
  .headerSearch {
    width: 500px;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);

    @media only screen and (max-width: 767px) {
      width: 300px;
    }
  }
`;

export { ComponentTitleWrapper };
