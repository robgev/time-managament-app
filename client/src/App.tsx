import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import Login from 'pages/Login';
import Signup from 'pages/Signup';
import theme from 'utils/theme';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Signup} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
