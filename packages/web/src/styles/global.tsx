import { Global, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import React from 'react';

const GlobalStyle: React.FC = () => (
  <Global
    styles={css`
      ${emotionNormalize}
      html, body, #react-app {
        height: 100%;
      }
    `}
  />
);

export default GlobalStyle;
