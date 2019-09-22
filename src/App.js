import React from 'react';
import { Global, css } from '@emotion/core';
import ColorPicker from './ColorPicker/ColorPicker';
import reset from './styles/reset';

const App = () => {
  return (
    <div>
      <Global
        styles={css`
          ${reset}
        `}
      />
      <ColorPicker />
    </div>
  );
};

export default App;
