import {Global} from "../../_snowpack/pkg/@emotion/react.js";
import React from "../../_snowpack/pkg/react.js";
import fontStyles from "./fontStyles.js";
import focusStyles from "./focusStyles.js";
const globalStyles = fontStyles + focusStyles;
const GlobalStyles = () => {
  return /* @__PURE__ */ React.createElement(Global, {
    styles: globalStyles
  });
};
export default GlobalStyles;
