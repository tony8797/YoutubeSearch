import React from 'react';
import { LayoutContentWrapper } from './layoutWrapper.style';

export default props => (
  <LayoutContentWrapper
    {...props}
  >
    {props.children}
  </LayoutContentWrapper>
);
