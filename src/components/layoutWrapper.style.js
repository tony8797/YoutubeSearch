import styled from 'styled-components';

const LayoutContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    /* padding: 50px 20px; */
  }

  @media (max-width: 580px) {
    /* padding: 15px; */
  }
`;

export { LayoutContentWrapper };
