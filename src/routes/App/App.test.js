import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createMuiTheme } from 'material-ui/styles';
import configureStore from '../../store/configureStore';
import App from './App';

// Configure the app store
const store = configureStore({});
const theme = createMuiTheme({});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
