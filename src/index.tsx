import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './config/theme';
import GlobalStyles from './config/styles';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import { fetchCategories } from './redux/categoriesSlice';

import 'focus-visible/dist/focus-visible';

store.dispatch(fetchCategories);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
