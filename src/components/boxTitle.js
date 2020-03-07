import React from 'react';
import { BoxTitle, BoxSubTitle } from './boxTitle.style.js';

export default props => {
  return (
    <div>
      {props.title ? (
        <BoxTitle> {props.title} </BoxTitle>
      ) : (
        ''
      )}
      {props.subtitle ? (
        <BoxSubTitle> {props.subtitle} </BoxSubTitle>
      ) : (
        ''
      )}
    </div>
  );
};
