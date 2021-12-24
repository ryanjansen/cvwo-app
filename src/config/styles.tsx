import { Global } from '@emotion/react';
import React from 'react';
import fontStyles from './fontStyles';
import focusStyles from './focusStyles';

const globalStyles = fontStyles + focusStyles;

const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};

export default GlobalStyles;
