import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme } from 'material-ui/styles';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
/* Routes */
import App from './routes/App/App';
/* Global CSS */
import './index.css';

// Configure the app store
const store = configureStore({});

// Material UI Theme configuration
// You may override the default palette values by including a palette object as part of your theme.
// https://material-ui-next.com/customization/themes/#__next
const theme = createMuiTheme({});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// This lets the app load faster on subsequent visits in production, and gives it offline capabilities
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app
registerServiceWorker();
