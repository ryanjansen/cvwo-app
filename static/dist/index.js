import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import React from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import App from "./components/App.js";
import {BrowserRouter} from "../_snowpack/pkg/react-router-dom.js";
import {ChakraProvider} from "../_snowpack/pkg/@chakra-ui/react.js";
import theme from "./config/theme.js";
import GlobalStyles from "./config/styles.js";
import {Provider as ReduxProvider} from "../_snowpack/pkg/react-redux.js";
import store from "./redux/store.js";
import {fetchCategories} from "./redux/categoriesSlice.js";
import "../_snowpack/pkg/focus-visible/dist/focus-visible.js";
store.dispatch(fetchCategories);
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(ChakraProvider, {
  theme
}, /* @__PURE__ */ React.createElement(BrowserRouter, null, /* @__PURE__ */ React.createElement(GlobalStyles, null), /* @__PURE__ */ React.createElement(ReduxProvider, {
  store
}, /* @__PURE__ */ React.createElement(App, null))))), document.getElementById("root"));
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
