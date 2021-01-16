import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import App from './App';
import store from './store/store';
import GlobalStyles from './theme/globalStyles';
import Theme, { Colors } from './theme/theme';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={{ ...Theme, ...Colors }}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </Provider>,

  document.getElementById('root')
);
