import React from 'react';
import HelperText from './NoApiKey.style';

export default ({ width = '100%', height = '40vh' }) => (
  <HelperText style={{ width, height }}>
    <h3>Please Enter Your API Key in the `src/settings/index.js`</h3>
  </HelperText>
);
