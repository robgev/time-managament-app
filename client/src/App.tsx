import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import AuthorizedRoute from 'components/AuthorizedRoute';

import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Tasks from 'pages/Tasks';
import Profile from 'pages/Profile';
import theme from 'utils/theme';
import UserProvider from 'contexts/Users';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Signup} />
            <AuthorizedRoute path="/profile" component={Profile} />
            <AuthorizedRoute exact path="/" component={Tasks} />
          </Switch>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
